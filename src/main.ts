import * as fs from 'fs'
import * as path from 'path'
import { info, setFailed, setOutput, summary } from '@actions/core'
import { exec } from '@actions/exec'
import { existsVueTsc } from './existsVueTsc'
import { runVueTscCli } from './runVueTscCli'

async function run(): Promise<void> {
  try {
    const workingDir = process.cwd()
    info(`working directory: ${workingDir}`)

    const tsconfigPath = path.join(workingDir, 'tsconfig.json')

    if (!fs.existsSync(tsconfigPath)) {
      throw new Error(`could not find tsconfig.json at: ${tsconfigPath}`)
    }

    if (!existsVueTsc(workingDir)) {
      throw new Error('could not find vue-tsc in package.json')
    }

    const existsYarnLock = fs.existsSync(path.resolve(workingDir, 'yarn.lock'))
    const existsPackageLock = fs.existsSync(
      path.resolve(workingDir, 'package-lock.json')
    )

    let installScript = `npm install --production=false`
    if (existsYarnLock) {
      installScript = `yarn --frozen-lockfile`
    } else if (existsPackageLock) {
      installScript = `npm ci`
    }

    await exec(installScript)

    const { output, summaryErrors } = await runVueTscCli(workingDir)
    info(`output: ${output}`)
    info(`summaryErrors: ${summaryErrors}`)

    await summary
      .addHeading('Vue TSC Actions Results')
      // .addCodeBlock(generateTestResults(), "js")
      .addTable([[{ data: 'result', header: true }], summaryErrors])
      // .addLink('View staging deployment!', 'https://github.com')
      .write()

    if (output) {
      throw new Error(
        'error after vue-tsc run. Please see the above log for details.'
      )
    }

    setOutput('time', new Date().toTimeString())
  } catch (error) {
    setFailed(error.message)
  }
}

run()
