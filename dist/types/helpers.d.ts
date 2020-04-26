/**
 * Takes the properties on object from parameter source and adds them to the object
 * parameter target
 * @param {object} target  Object to have properties copied onto from y
 * @param {object} source  Object with properties to be copied to x
 */
export declare function addPropertiesToObject(target: any, source: any): void;
/**
 * Returns a namespaced name of the module to be used as a store getter
 * @param module
 */
export declare function getModuleName(module: any): string;
export declare function getStaticName(path: string[]): string;
/**
 * Returns a namespaced name of the module to be used as a store getter
 * @param module
 */
export declare function getModuleNamespace(module: any): string;
/**
 * Returns a namespaced path of the module to be used as a store getter
 * @param module
 */
export declare function getModulePath(module: any): string[];
export declare function getNamespacedKey(namespace: string | null | undefined, key: string): string;
