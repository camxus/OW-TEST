const CracoAlias = require("craco-alias");
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.extend.json');

module.exports = {
  reactScriptsVersion: 'react-scripts',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  style: {
    sass: {
      loaderOptions: {
        sassOptions: {
          includePaths: ['node_modules', 'src/assets']
        }
      }
    }
    // postcss: {
    //   plugins: [require('postcss-rtl')()]
    // }
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        // baseUrl SHOULD be specified
        // plugin does not take it from tsconfig
        baseUrl: "./",
        // tsConfigPath should point to the file where "baseUrl" and "paths" are specified
        tsConfigPath: "./tsconfig.extend.json"
      }
    }
  ],
  jest: {
    configure: {
      preset: 'ts-jest',
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/src/',
      }),
    },
  },
};