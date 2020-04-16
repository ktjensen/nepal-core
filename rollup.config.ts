import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import copy from 'rollup-plugin-copy'
import {terser} from "rollup-plugin-terser";

export default {
    input: 'src/index.ts', // our source file
    output: [
        {
            file: pkg.main,
            format: "cjs",
            sourcemap:true,
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap:true,
        },
    ],
    external: [
        ...Object.keys(pkg.dependencies || {})
    ],
    plugins: [
        typescript({
            typescript: require('typescript'),
        }),
        // terser() // minifies generated bundles
        copy({
            targets: [
                { src: 'tslint.json', dest: 'dist/config' },
            ]
        })
    ]
};
