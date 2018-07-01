import * as F from 'karet.lift'
import * as I from 'infestines'
import * as K from 'kefir'
import * as L from 'kefir.partial.lenses'

//

const isObservable = x => x instanceof K.Observable

const filter = I.curry(function filter(pr, xs) {
  if (isObservable(xs)) {
    return xs.filter(pr)
  } else if (pr(xs)) {
    return xs
  } else {
    throw Error(pr.name)
  }
})

//

const setName =
  process.env.NODE_ENV === 'production'
    ? x => x
    : (to, name) => I.defineNameU(to, name)

const copyName =
  process.env.NODE_ENV === 'production'
    ? x => x
    : (to, from) => I.defineNameU(to, from.name)

//

const eventTypes = ['loadstart', 'progress', 'load', 'error']

const initial = {type: 'initial'}

function perform(method) {
  const performPlain = setName(
    args =>
      K.stream(({emit, end}) => {
        const fr = new FileReader()
        let state = {fr, state: initial, event: initial}
        eventTypes.forEach(type => {
          fr.addEventListener(type, event => {
            emit((state = L.set('state', {type, event}, state)))
          })
        })
        fr.addEventListener('loadend', event => {
          end(emit((state = L.set('event', event, state))))
        })
        fr[method](args)
        return () => {
          if (fr.readyState < 2) fr.abort()
        }
      }),
    method
  )
  return setName(argsIn => {
    const args = F.combine([argsIn], I.id)
    return (args != argsIn
      ? args.flatMapLatest(performPlain)
      : performPlain(args)
    ).toProperty()
  }, method)
}

const after = I.curryN(3, (predicate, getter) =>
  copyName(I.pipe2U(filter(predicate), getter), getter)
)

const isOneOf = I.curry((values, value) => values.includes(value))
const is = values => L.get(['state', 'type', isOneOf(values)])

const getFR = prop => setName(L.get(['fr', prop]), prop)
const getState = prop => setName(L.get(['state', 'event', prop]), prop)

// Starting

export const readAsArrayBuffer = perform('readAsArrayBuffer')
export const readAsBinaryString = perform('readAsBinaryString')
export const readAsDataURL = perform('readAsDataURL')
export const readAsText = perform('readAsText')

// State

export const hasEnded = setName(is(['load', 'error']), 'hasEnded')
export const hasFailed = setName(is(['error']), 'hasFailed')
export const hasStarted = setName(is(eventTypes), 'hasStarted')
export const hasSucceeded = setName(is(['load']), 'hasSucceeded')
export const isDone = I.defineNameU(
  L.get(['event', 'type', L.is('loadend')]),
  'isDone'
)
export const isProgressing = setName(
  is(['progress', 'loadstart']),
  'isProgressing'
)
export const loaded = getState('loaded')
export const readyState = getFR('readyState')
export const total = getState('total')

// Result

export const result = after(isDone, getFR('result'))
export const error = after(isDone, getFR('error'))
