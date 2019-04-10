import 'reflect-metadata'
import { ENV_ENTITY } from '../utils/constants'
import { EntityMetadata, PropMetadata, PropType } from '../types'

function getEntityMetadata(target: any) {
  return Reflect.getMetadata(ENV_ENTITY, target) as EntityMetadata | undefined
}

function castStringToPropType(input: string|undefined, type: PropType) {
  if (input) {
    console.log(input);
    console.log(type);
    switch (type) {
      case Number:
        return +input
      case Date:
        return new Date(input)
      case Array:
        return [].concat(JSON.parse(input))
      case String:
        return input
      case Object:
      default:
        return JSON.parse(input)
    }
  }
}

function setProp(target: any, metadata: PropMetadata, basePath: string) {
  target[metadata.propKey] = castStringToPropType(process.env[`${basePath}${metadata.path}`], metadata.type)
}

export const EnvEntity = (basePath: string = '') =>
  function classDecorator<T extends { new (...args: any[]): any }>(
    constructor: T
  ) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args)
        const metadata = getEntityMetadata(this)
        metadata &&
          metadata.props &&
          metadata.props.map(propMetadata =>
            setProp(this, propMetadata, basePath)
          )
      }
    }
  }
