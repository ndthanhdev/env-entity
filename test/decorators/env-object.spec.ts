import { EnvObject, EnvProp } from '../../src/decorators'

it('Properties should have env value', () => {
  const fooPath = 'FOO'
  const barPath = 'BAR'
  @EnvObject
  class AClass {
    @EnvProp(fooPath)
    foo: string

    @EnvProp(barPath)
    bar: string
  }

  const aObject = new AClass()

  expect(aObject.foo).toStrictEqual(<string>process.env[fooPath])
})

it('Object should be define without error', () => {
  @EnvObject()
  class AClass {}

  const aObject = new AClass()

  expect(aObject).toBeDefined()
})
