import { defineConfig, splitVendorChunkPlugin } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.js',
            ]
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        splitVendorChunkPlugin(),
    ],
    build: {
        chunkSizeWarningLimit: 2000,
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-ui': ['ant-design-vue', '@ant-design/icons-vue'],
                    'vendor-charts': ['chart.js', 'vue-chart-3'],
                }
            }
        }
    },
    server: {
        hmr: {
            host: 'localhost',
        },
    },
});
