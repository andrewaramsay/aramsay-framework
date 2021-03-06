import 'core-js';
if (!Reflect.defineMetadata) {
	require('reflect-metadata');
}

export * from './src/common';
export * from './src/data';
export * from './src/mapping';
export * from './src/testing';
export { FrameworkModule, FrameworkModuleDependencies } from './src/dependency-injection/framework-module';
