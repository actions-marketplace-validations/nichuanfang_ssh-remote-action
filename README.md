ssh-remote-action
允许用户通过配合远端服务器的ip地址和账号密码，将批量配置的脚本发送到服务器端执行，从而实现对服务器上业务的管理
如安装工具，启停服务等

使用样例,结合scp-remote-action完成一个springcloud项目部署:

    - name: stop and backup service
      uses: huaweicloud/ssh-remote-action@v1.2
      with:
        ipaddr: "182.92.156.203"
        username: "root"
        password: ${{ secrets.CCE_PASSWORD }}
        commands: |
          systemctl stop demoapp.service
          mkdir -p /opt/backup/demoapp/\$currentDate
          mv /usr/local/demoapp.jar /opt/backup/demoapp/\$currentDate/
          
- name: deploy service
  uses: huaweicloud/scp-remote-action@v1.1
  with:
    ipaddr: "192.168.130.159"
    username: "service"
    password: ${{ secrets.CCE_PASSWORD }}
    operation_type: upload
    operation_list: |
      file target/demoapp.jar /usr/local/
      file bin/demoapp.service /etc/systemd/system/
      file bin/start-demoapp.sh /usr/local/
      file bin/stop-demoapp.sh /usr/local/

  - name: reload and start service
      uses: huaweicloud/ssh-remote-action@v1.2
      with:
        ipaddr: "182.92.156.203"
        username: "root"
        password: ${{ secrets.CCE_PASSWORD }}
        commands: |
          chmod 755 /usr/local/start-demoapp.sh && chmod 755 /usr/local/stop-demoapp.sh
          systemctl daemon-reload
          systemctl start demoapp.service