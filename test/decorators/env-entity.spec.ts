import { EnvEntity, EnvProp } from '../../src/decorators'

it('Object should be define without any error', () => {
  @EnvEntity()
  class AClass {}

  const aObject = new AClass()

  expect(aObject).toBeDefined()
})

it('Properties should have correct env value', () => {
  process.env['FOO'] = 'FOO_VALUE'
  process.env['BAR'] = 'BAR_VALUE'
  @EnvEntity()
  class AClass {
    @EnvProp('FOO')
    foo: string

    @EnvProp('BAR')
    bar: string
  }

  const aObject = new AClass()

  expect(aObject.foo).toStrictEqual('FOO_VALUE')
  expect(aObject.bar).toStrictEqual('BAR_VALUE')
})

it('Base path object shoudl have correct value', () => {
  const value = 'VALUE'
  process.env['FOO_BAR'] = value
  @EnvEntity('FOO_')
  class AClass {
    @EnvProp('BAR')
    foorBar: string
  }

  const aObject = new AClass()

  expect(aObject.foorBar).toStrictEqual(value)
})
