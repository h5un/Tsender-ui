// vitest.config.ts
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        deps: {
            inline: ['wagmi', '@wagmi/core', ],
        },
        globals: true,        // 允許使用 describe/it/expect 等全域函式
        environment: 'jsdom', // 模擬瀏覽器環境（適合測試 React）
        include: ['**/*.test.ts', '**/*.test.tsx'], // 預設測試檔案路徑
    },
});
