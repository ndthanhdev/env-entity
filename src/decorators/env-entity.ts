import 'reflect-metadata'
import { ENV_ENTITY } from '../utils/constants'
import { EntityMetadata, PropMetadata, PropType } from '../types'
import { ValueIsNotAnArray } from '../exceptions';
import { ValueIsNotANumber } from '../exceptions/not-a-number';

function getEntityMetadata(target: any) {
  return Reflect.getMetadata(ENV_ENTITY, target) as EntityMetadata | undefined
}

function parseNumberOrThrow(input: string) {
  const output = Number(input)
  if (Number.isNaN(output)) throw new ValueIsNotANumber()
  return output
}

function parseArrayOrThrow(input: string) {
  const output = JSON.parse(input)
  if (!(output instanceof Array)) throw new ValueIsNotAnArray()
  return output
}

function castStringToPropType(input: string | undefined, type: PropType) {
  if (input) {
    switch (type) {
      case Number:
        return parseNumberOrThrow(input)
      case Date:
        return new Date(input)
      case Array:
        return parseArrayOrThrow(input)
      case String:
      default:
        return input
    }
  }
}

function setProp(target: any, metadata: PropMetadata, basePath: string) {
  target[metadata.propKey] = castStringToPropType(
    process.env[`${basePath}${metadata.path}`],
    metadata.type
  )
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
