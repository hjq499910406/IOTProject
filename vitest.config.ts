import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [ ...configDefaults.exclude, 'e2e/*' ],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        provider: 'v8', // 使用 V8 覆盖率提供者
        // 指定覆盖率报告输出的目录
        reportsDirectory: './coverage',
        // 生成文本摘要、HTML 和 lcov 报告
        reporter: [ 'html', 'lcov' ],
        // 可以添加更多覆盖率相关的配置
        // 例如，可以指定哪些文件需要包含或排除在覆盖率报告中
        include: [ 'src/**/*.{js,ts,vue}' ],
        exclude: [ '**/node_modules/**', '**/tests/**' ],
        // 其他配置...
      },
    }

  })
);
