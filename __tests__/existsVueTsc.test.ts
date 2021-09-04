import { existsVueTsc } from '../src/existsVueTsc'
import { describe, expect, test } from '@jest/globals'

const fixturePath = './__tests__/fixture'

describe('existsVueTsc', () => {
  test('return true when package.json contains vue-tsc', () => {
    const result = existsVueTsc(fixturePath)

    expect(result).toBe(true)
  })
})
