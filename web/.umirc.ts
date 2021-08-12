import { defineConfig, IConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  history: {
    type: 'memory',
  },
  devServer: {
    writeToDisk: filePath =>
      ['umi.js', 'umi.css'].some(name => filePath.endsWith(name)),
  },
} as IConfig);
