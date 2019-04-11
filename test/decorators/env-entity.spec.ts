import { EnvEntity, Prop } from '../../src/decorators'
import { ValueIsNotAnArray, ValueIsNotANumber } from '../../src/exceptions'

let num: number
let str: string
let date: Date
let arr: Array<any>

beforeEach(() => {
  num = 123
  str = 'Lorem Ipsum'
  date = new Date('2019-01-01')
  arr = [num, str, date.toString()]

  process.env['NUM'] = JSON.stringify(num)
  process.env['STR'] = str
  process.env['DATE'] = date.toString()
  process.env['ARR'] = JSON.stringify(arr)
})

it('object should be define without any error', () => {
  @EnvEntity()
  class Env {}

  const o = new Env()

  expect(o).toBeDefined()
})

it('base path object should have correct value', () => {
  const value = 'VALUE'
  process.env['FOO_BAR'] = value
  @EnvEntity('FOO_')
  class Env {
    @Prop('BAR')
    fooBar: string
  }

  const o = new Env()

  expect(o.fooBar).toStrictEqual(value)
})

it('properties should have correct env values', () => {
  @EnvEntity()
  class Env {
    @Prop('NUM')
    num: number

    @Prop('STR')
    str: string

    @Prop('DATE')
    date: Date

    @Prop('ARR')
    arr: []
  }

  const env = new Env()

  expect(env.num).toStrictEqual(num)
  expect(env.str).toStrictEqual(str)
  expect(env.date).toStrictEqual(date)
  expect(env.arr).toStrictEqual(arr)
})

it('throw NaN', () => {
  process.env['NUM'] = 'this is not a number'
  @EnvEntity()
  class Env {
    @Prop('NUM')
    num: number
  }
  expect(() => new Env()).toThrowError(new ValueIsNotANumber())
})

it('throw ValueIsNotAnArray', () => {
  process.env['ARR'] = '"this is not an array"'
  @EnvEntity()
  class Env {
    @Prop('ARR')
    arr: []
  }
  expect(() => new Env()).toThrowError(new ValueIsNotAnArray())
})
