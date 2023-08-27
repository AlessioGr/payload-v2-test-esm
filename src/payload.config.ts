import { buildConfig } from '@alessiogr/payloadtest/config';
import { dirname, resolve } from 'path';
import Users from './collections/Users.js';
import { adapter } from './adapter.js';

const _dirname = dirname(new URL(import.meta.url).pathname)



export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Users.slug,
    webpack(config) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
      }

      config.resolve.alias = {
        ...config.resolve.alias,
        /*'/Users/alessio/Documents/GitHub/payload-v2-test/node_modules/@alessiogr/payloadtestdb-mongodb/dist/index.js': '/Users/alessio/Documents/GitHub/payload-v2-test/node_modules/@alessiogr/payloadtestdb-mongodb/dist/esm/mock.js',*/
        [resolve(_dirname, './adapter.js')]: resolve(_dirname, './mock.js')
      }

      console.log('Webpack config resolve:', JSON.stringify(config.resolve, null, 2));

      return config;
    },
  },
  db: adapter,
  collections: [
    Users,
  ],
  typescript: {
    outputFile: resolve(_dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: resolve(_dirname, 'generated-schema.graphql'),
  },
  plugins: [
  ]
});
