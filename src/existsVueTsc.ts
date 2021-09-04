import fs from 'fs'
import { join } from 'path'

const findPackageJson = (path: string): string => {
  return fs.readFileSync(join(path, 'package.json')).toString()
}

export const existsVueTsc = (path: string): boolean => {
  const packageJson = JSON.parse(findPackageJson(path))

  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies
  }

  return dependencies.hasOwnProperty('vue-tsc')
}
