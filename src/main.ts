import {info, setFailed, setOutput} from '@actions/core'

async function run(): Promise<void> {
  try {
    const workingDir = process.cwd()
    info(`working directory: ${workingDir}`)
    setOutput('time', new Date().toTimeString())
  } catch (error) {
    setFailed(error.message)
  }
}

run()
