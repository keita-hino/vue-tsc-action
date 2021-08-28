import {info, setFailed, setOutput} from '@actions/core'
import {exec} from '@actions/exec'

async function run(): Promise<void> {
  try {
    const workingDir = process.cwd()
    const nodeModulesPath = await exec('npm root -g')

    info(`working directory: ${workingDir}`)

    // TODO:npmかyarnかのチェックを入れる
    await exec('npm install -g vue-tsc@0.0.25')
    await exec('npm ci')
    await exec(`${nodeModulesPath}/vue-tsc/vue-tsc.js --pretty false --noEmit`)
    info('実行終わり')
    setOutput('time', new Date().toTimeString())
  } catch (error) {
    setFailed(error.message)
  }
}

run()
