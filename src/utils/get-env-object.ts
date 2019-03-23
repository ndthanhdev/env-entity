import 'reflect-metadata';
import { Type } from '../interfaces/type';

export const getEnvObject = <T>(metaType: Type<T>): T => {
    return new metaType();
}