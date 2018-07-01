//import * as K from 'kefir'
import * as R from 'ramda'
import * as React from 'karet'
import * as ReactDOM from 'react-dom'
import * as U from 'karet.util'

import * as FR from './generated/dist/karet.fr.es.js'

//function show(x) {
//  switch (typeof x) {
//    case 'string':
//    case 'object':
//      return JSON.stringify(x)
//    default:
//      return `${x}`
//  }
//}
//
//const toExpr = f =>
//  f
//    .toString()
//    .replace(/\s+/g, ' ')
//    .replace(/^\s*function\s*\(\s*\)\s*{\s*(return\s*)?/, '')
//    .replace(/\s*;?\s*}\s*$/, '')
//    .replace(/function\s*(\([a-zA-Z0-9, ]*\))\s*/g, '$1 => ')
//    .replace(/\(([^),]+)\) =>/, '$1 =>')
//    .replace(/{\s*return\s*([^{;]+)\s*;\s*}/g, '$1')
//    .replace(/\(0, [^.]*[.]([^)]*)\)/g, '$1')
//    .replace(/\$\d+/g, '')
//
//const testEq = (expect, thunk) =>
//  it(`${toExpr(thunk)} => ${show(expect)}`, done => {
//    const actual = thunk()
//    function check(actual) {
//      if (!R.equals(actual, expect)) {
//        done(new Error(`Expected: ${show(expect)}, actual: ${show(actual)}`))
//      } else {
//        done()
//      }
//    }
//    if (actual instanceof K.Property) {
//      actual.bufferBy(K.never()).observe({value: check, error: check})
//    } else {
//      check(actual)
//    }
//  })
//
//const testThrows = thunk =>
//  it(`${toExpr(thunk)} => throws`, () => {
//    try {
//      thunk()
//    } catch (_) {
//      return
//    }
//    throw Error('Did not throw as expected.')
//  })

const App = () => {
  const fileBus = U.bus()
  const dataURL = U.thru(
    fileBus,
    U.toProperty,
    FR.readAsDataURL,
    U.startWith(undefined)
  )
  const src = U.thru(dataURL, FR.result, U.startWith(undefined))
  return (
    <div className="testView">
      <input type="file" onChange={e => fileBus.push(e.target.files[0])} />
      {U.cond(
        [FR.error(dataURL), <p className="error">Error loading file!</p>],
        [src, <img className="imagePreview" src={src} alt="Image preview" />]
      )}
    </div>
  )
}

if (process.env.NODE_ENV !== 'production') {
  before(() => ReactDOM.render(<App />, document.getElementById('app')))

  describe('Names of exported functions', () => {
    it('match their export names', () => {
      for (const k in FR) {
        const v = FR[k]
        if (R.is(Function, v) && v.name !== k)
          throw Error(`Name of exported function '${k}' was '${v.name}'`)
      }
    })
  })
}
