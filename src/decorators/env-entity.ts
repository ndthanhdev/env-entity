import 'reflect-metadata'
import { ENV_PROPERTY_METADATA } from '../utils/constants'

export const EnvEntity = function classDecorator<
  T extends { new (...args: any[]): any }
>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args)
      const properties = Reflect.getMetadata(
        ENV_PROPERTY_METADATA,
        this
      ) as string[]
      properties &&
        properties.map(prop => {
          this[prop] =
            process.env[Reflect.getMetadata(ENV_PROPERTY_METADATA, this, prop)]
        })
    }
  }
}
