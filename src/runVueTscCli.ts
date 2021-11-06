import * as path from 'path'
import { ExecOptions, exec } from '@actions/exec'
import { setFailed } from '@actions/core'

export async function runVueTscCli(
  workingDir: string
): Promise<{ output: string; error: string }> {
  let cliOutput = ''
  let cliError = ''
  console.log('🍺')
  console.log('cliOutput')
  console.log(cliOutput)
  console.log('cliError')
  console.log(cliError)

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
