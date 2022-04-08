import * as core from '@actions/core'
import * as cp from 'child_process'
import * as context from './context'

export async function execRemoteSSHCommands(
  inputs: context.Inputs
): Promise<void> {
  for (const command in inputs.commands) {
    core.info('exec command:' + command)
    const sshpassCommand =
      'sshpass -p ' +
      inputs.password +
      ' ssh -o StrictHostKeyChecking=no ' +
      inputs.username +
      '@' +
      inputs.ipaddr +
      " '" +
      command +
      "'"
    await execRemoteSSHCommand(sshpassCommand)
  }
}

/**
 *
 * @param sshcommand 执行远程命令
 */
export async function execRemoteSSHCommand(sshcommand: string): Promise<void> {
  const sshpassCommandResult = await (cp.execSync(sshcommand) || '').toString()
  core.info('result ' + sshpassCommandResult)
}
