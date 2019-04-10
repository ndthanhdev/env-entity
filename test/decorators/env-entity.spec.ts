import { EnvEntity, EnvProp } from '../../src/decorators'

it('Object should be define without any error', () => {
  @EnvEntity()
  class Env {}

  const o = new Env()

  expect(o).toBeDefined()
})

it('Properties should have correct env values', () => {
  const num = 123
  const str = 'Lorem Ipsum'
  const date = new Date('2019-01-01')
  const arr = [num, str, date.toString()]
  // const obj = {
  //   num,
  //   str,
  //   date,
  //   arr,
  // }

  process.env['NUM'] = JSON.stringify(num)
  process.env['STR'] = str
  process.env['DATE'] = date.toString()
  process.env['ARR'] = JSON.stringify(arr)
  // process.env['OBJ'] = JSON.stringify(obj)
  @EnvEntity()
  class Env {
    @EnvProp('NUM')
    num: number

    @EnvProp('STR')
    str: string

    @EnvProp('DATE')
    date: Date

    @EnvProp('ARR')
    arr: []

    // @EnvProp('OBJ')
    // obj: any

  }

  const env = new Env()

  expect(env.num).toStrictEqual(num)
  expect(env.str).toStrictEqual(str)
  expect(env.date).toStrictEqual(date)
  expect(env.arr).toStrictEqual(arr)
  // expect(env.obj).toStrictEqual(obj)
})

it('Base path object should have correct value', () => {
  const value = 'VALUE'
  process.env['FOO_BAR'] = value
  @EnvEntity('FOO_')
  class Env {
    @EnvProp('BAR')
    fooBar: string
  }

  const o = new Env()

  expect(o.fooBar).toStrictEqual(value)
})
