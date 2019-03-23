import "reflect-metadata";
import { ENV_PROPERTY_METADATA } from "../utils/constants";

export const EnvProp = (envPath: string): PropertyDecorator => {
    return (target, propertykey) => {
        Reflect.defineMetadata(ENV_PROPERTY_METADATA, envPath, target, propertykey);
        const metadata = <String[]>Reflect.getMetadata(ENV_PROPERTY_METADATA, target);
        if (!!!metadata) {
            Reflect.defineMetadata(ENV_PROPERTY_METADATA, [propertykey], target);
        } else {
            Reflect.defineMetadata(ENV_PROPERTY_METADATA, [propertykey, ...metadata], target);
        }
    }
}