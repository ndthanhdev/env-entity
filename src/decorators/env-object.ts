import 'reflect-metadata';
import { ENV_PROPERTY_METADATA } from '../utils/constants';

export const EnvObject = function classDecorator<T extends { new(...args: any[]): any }>(constructor: T) {
    return class extends constructor {
        constructor(...args: any[]) {
            super(...args);
            const properties = <string[]>Reflect.getMetadata(ENV_PROPERTY_METADATA, this);
            properties && properties.map(prop => {
                this[prop] = process.env[Reflect.getMetadata(ENV_PROPERTY_METADATA, this, prop)]
            })

        }
    }
}
