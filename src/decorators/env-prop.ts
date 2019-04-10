import 'reflect-metadata'
import { ENV_ENTITY } from '../utils/constants'
import { PropType, PropMetadata, EntityMetadata } from '../types'

function getPropType(target: any, key: string | symbol): PropType {
  return Reflect.getMetadata('design:type', target, key)
}

function setEntityMetadata(target: any, metadata: EntityMetadata) {
  Reflect.defineMetadata(ENV_ENTITY, metadata, target)
}

function setOrExtendEntityMetadata(
  target: any,
  metadata: PropMetadata
) {
  const existedMetadata = Reflect.getMetadata(ENV_ENTITY, target) as
    | EntityMetadata
    | undefined

  if (!existedMetadata) {
    // ENV_PROPERTY_METADATA doesn't exist on proKey so define metadata for propKey
    setEntityMetadata(target, {
      props: [
        metadata,
      ],
    })
  } else {
    // ENV_PROPERTY_METADATA exists so extend available metadata
    setEntityMetadata(target, {
      ...existedMetadata,
      props: [
        ...existedMetadata.props,
        metadata,
      ],
    })
  }
}

function generatePropMetadata(
  target: any,
  propKey: string | symbol,
  path: string
): PropMetadata {
  return {
    propKey,
    path,
    type: getPropType(target, propKey),
  }
}

export const EnvProp = (envPath: string): PropertyDecorator => {
  return (target, propKey) => {
    const propMetadata = generatePropMetadata(target, propKey, envPath)
    setOrExtendEntityMetadata(target, propMetadata)
  }
}
