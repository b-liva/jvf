import {fileURLToPath, URL} from 'node:url'
const { resolve } = require('path');

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue';
import graphql from '@rollup/plugin-graphql';

// https://vitejs.dev/config/
export default defineConfig({
    root: './src',
    base: '/static/static/',
    server: {
        host: 'localhost',
        port: 3000,
        open: false,
        watch: {
            usePolling: true,
            disableGlobbing: false
        }
    },
    plugins: [vue({
        template: {
            compilerOptions: {
                // treat all tags with a dash as custom elements
                isCustomElement: (tag) => tag.includes('-')
            }
        }
    }), graphql()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
        extensions: ['.js', '.json']
    },
    build: {
        outDir: resolve("../app/frontend/dist"),
        assetsDir: '',
        manifest: true,
        emptyOutDir: true,
        sourcemap: true,
        target: 'es2015',
        minify: false,
        rollupOptions: {
            input: {
                main: resolve('./src/main.js')
            },
            output: {
                chunkFileNames: undefined,
            }
        }
    },
    define: {
        'process.env': {}
    }
})
