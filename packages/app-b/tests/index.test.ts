import { describe, it, expect } from 'vitest'
import { greet } from '../src/index'

describe('app-b: greet()', () => {
  it('greets the passed name', () => {
    expect(greet('Juan')).toBe('Hello, Juan!')
  })
})
