import 'reflect-metadata'
import { Type } from '../types/type'

export const getEnvObject = <T>(metaType: Type<T>): T => {
  return new metaType()
}
