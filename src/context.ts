import * as core from '@actions/core'

export interface Inputs {
  ipaddr: string
  port: string
  username: string
  password: string
  commands: string[]
}
//检测IP正则表达式
export const IPREGX = /^((\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))(\.|$)){4}$/

//高危命令列表，持续完善
export const dangerCommandSet: string[] = [
  'poweroff',
  'reboot',
  'rm',
  'mkfs',
  'file',
  'dd',
  'shutdown',
  '){:|:&};:',
  '^foo^bar'
]

export function getInputs(): Inputs {
  return {
    ipaddr: core.getInput('ipaddr', {required: true}),
    port: core.getInput('port', {required: false}),
    username: core.getInput('username', {required: true}),
    password: core.getInput('password', {required: true}),
    commands: core.getMultilineInput('commands', {required: true})
  }
}
