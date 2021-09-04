import { exec, ExecOptions } from '@actions/exec'
import { setFailed } from '@actions/core'
import * as path from 'path'

export async function runVueTscCli(
  workingDir: string
): Promise<{ output: string; error: string }> {
  let cliOutput = ''
  let cliError = ''

  const options: ExecOptions = {}
  options.listeners = {
    stdout: (data: Buffer) => {
      cliOutput += data.toString()
    },
    stderr: (data: Buffer) => {
      cliError += data.toString()
    }
  }

  const execPath = path.join(workingDir, 'node_modules/vue-tsc/bin/vue-tsc.js')
  try {
    await exec(`${execPath} --pretty false --noEmit`, [], options)
  } catch (error) {
    setFailed(error.message)
  }

  process.exitCode = 0

  return {
    output: cliOutput,
    error: cliError
  }
}
