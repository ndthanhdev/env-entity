import { PropType } from './prop-type'

export interface PropMetadata {
  propKey: string | symbol
  path: string
  type: PropType
}
