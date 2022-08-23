import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import path from 'path'
import swc from 'rollup-plugin-swc3'
import { dependencies } from './package.json'

const root = __dirname

const dependenciesNames = Object.keys(dependencies)

const createConfig = ({ dir, format, input = 'index.ts' }) => {
  /** @type {import('rollup').RollupOptions} */
  const config = {
    external: new RegExp(dependenciesNames.join('|')),
    input: `src/${input}`,
    output: {
      dir,
      exports: 'named',
      format,
      entryFileNames: `[name].${format === 'esm' ? 'mjs' : 'js'}`,
    },
    plugins: [
      alias({
        entries: {
          '~': path.resolve(root, 'src'),
        },
      }),
      commonjs(),
      nodeResolve({
        extensions: ['.ts'],
      }),
      swc({
        jsc: {
          externalHelpers: true,
        },
        tsconfig: path.resolve(root, 'tsconfig.code.json'),
      }),
    ],
  }

  return config
}

export default [
  createConfig({ dir: 'lib', format: 'cjs' }),
  createConfig({ dir: 'esm', format: 'esm' }),
  createConfig({ dir: 'dist', format: 'esm', input: 'cli.ts' }),
]
