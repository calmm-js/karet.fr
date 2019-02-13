import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'

const globals = {
  'karet.lift': 'karet.lift',
  'karet.util': 'karet.util',
  'kefir.partial.lenses': 'kefir.partial.lenses',
  'partial.lenses': 'L',
  'partial.lenses.validation': 'V',
  infestines: 'I',
  kefir: 'Kefir'
}

export default {
  input: 'test/tests.js',
  output: {
    globals,
    format: 'iife',
    file: 'test/generated/bundle.js',
    sourcemap: 'inline'
  },
  plugins: [
    replace({'process.env.NODE_ENV': JSON.stringify('dev')}),
    nodeResolve(),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react-dom/index.js': ['hydrate', 'render'],
        'node_modules/react/index.js': [
          'Children',
          'Component',
          'Fragment',
          'PureComponent',
          'createContext',
          'createElement',
          'forwardRef',
          'useContext'
        ],
        'node_modules/kefir/dist/kefir.js': [
          'Observable',
          'Stream',
          'Property',
          'combine',
          'concat',
          'constant',
          'constantError',
          'fromEvents',
          'interval',
          'later',
          'merge',
          'never',
          'stream'
        ]
      }
    }),
    babel()
  ]
}
