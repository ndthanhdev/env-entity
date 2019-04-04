import 'reflect-metadata'
import { ENV_PROPERTY_METADATA } from '../utils/constants'

export const EnvProp = (envPath: string): PropertyDecorator => {
  return (target, propertykey) => {
    Reflect.defineMetadata(ENV_PROPERTY_METADATA, envPath, target, propertykey)
    const metadata = Reflect.getMetadata(
      ENV_PROPERTY_METADATA,
      target
    ) as String[]
    if (!metadata) {
      Reflect.defineMetadata(ENV_PROPERTY_METADATA, [propertykey], target)
    } else {
      Reflect.defineMetadata(
        ENV_PROPERTY_METADATA,
        [propertykey, ...metadata],
        target
      )
    }
  }
}
