import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";
import replace from '@rollup/plugin-replace';

export default {
    input: 'app/index.js',
    output: {
        file: 'electron/app.min.js',
        format: 'cjs',
    },
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        babel({
            exclude: "node_modules/**",
            presets: ["@babel/preset-react"],
            babelHelpers: "bundled",
        }),
        commonjs({ transformMixedEsModules: true }),
        resolve({
            extensions: ['.js', '.jsx'],
            browser: true
        }),

    ]
};