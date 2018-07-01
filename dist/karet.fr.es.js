import { combine } from 'karet.lift';
import { curry, defineNameU, id, curryN, pipe2U } from 'infestines';
import { Observable, stream } from 'kefir';
import { set, get, is } from 'kefir.partial.lenses';

//

var isObservable = function isObservable(x) {
  return x instanceof Observable;
};

var filter = /*#__PURE__*/curry(function filter(pr, xs) {
  if (isObservable(xs)) {
    return xs.filter(pr);
  } else if (pr(xs)) {
    return xs;
  } else {
    throw Error(pr.name);
  }
});

//

var setName = process.env.NODE_ENV === 'production' ? function (x) {
  return x;
} : function (to, name) {
  return defineNameU(to, name);
};

var copyName = process.env.NODE_ENV === 'production' ? function (x) {
  return x;
} : function (to, from) {
  return defineNameU(to, from.name);
};

//

var eventTypes = ['loadstart', 'progress', 'load', 'error'];

var initial = { type: 'initial' };

function perform(method) {
  var performPlain = setName(function (args) {
    return stream(function (_ref) {
      var emit = _ref.emit,
          end = _ref.end;

      var fr = new FileReader();
      var state = { fr: fr, state: initial, event: initial };
      eventTypes.forEach(function (type) {
        fr.addEventListener(type, function (event) {
          emit(state = set('state', { type: type, event: event }, state));
        });
      });
      fr.addEventListener('loadend', function (event) {
        end(emit(state = set('event', event, state)));
      });
      fr[method](args);
      return function () {
        if (fr.readyState < 2) fr.abort();
      };
    });
  }, method);
  return setName(function (argsIn) {
    var args = combine([argsIn], id);
    return (args != argsIn ? args.flatMapLatest(performPlain) : performPlain(args)).toProperty();
  }, method);
}

var after = /*#__PURE__*/curryN(3, function (predicate, getter) {
  return copyName(pipe2U(filter(predicate), getter), getter);
});

var isOneOf = /*#__PURE__*/curry(function (values, value) {
  return values.includes(value);
});
var is$1 = function is$$1(values) {
  return get(['state', 'type', isOneOf(values)]);
};

var getFR = function getFR(prop) {
  return setName(get(['fr', prop]), prop);
};
var getState = function getState(prop) {
  return setName(get(['state', 'event', prop]), prop);
};

// Starting

var readAsArrayBuffer = /*#__PURE__*/perform('readAsArrayBuffer');
var readAsBinaryString = /*#__PURE__*/perform('readAsBinaryString');
var readAsDataURL = /*#__PURE__*/perform('readAsDataURL');
var readAsText = /*#__PURE__*/perform('readAsText');

// State

var hasEnded = /*#__PURE__*/setName( /*#__PURE__*/is$1(['load', 'error']), 'hasEnded');
var hasFailed = /*#__PURE__*/setName( /*#__PURE__*/is$1(['error']), 'hasFailed');
var hasStarted = /*#__PURE__*/setName( /*#__PURE__*/is$1(eventTypes), 'hasStarted');
var hasSucceeded = /*#__PURE__*/setName( /*#__PURE__*/is$1(['load']), 'hasSucceeded');
var isDone = /*#__PURE__*/defineNameU( /*#__PURE__*/get(['event', 'type', /*#__PURE__*/is('loadend')]), 'isDone');
var isProgressing = /*#__PURE__*/setName( /*#__PURE__*/is$1(['progress', 'loadstart']), 'isProgressing');
var loaded = /*#__PURE__*/getState('loaded');
var readyState = /*#__PURE__*/getFR('readyState');
var total = /*#__PURE__*/getState('total');

// Result

var result = /*#__PURE__*/after(isDone, /*#__PURE__*/getFR('result'));
var error = /*#__PURE__*/after(isDone, /*#__PURE__*/getFR('error'));

export { readAsArrayBuffer, readAsBinaryString, readAsDataURL, readAsText, hasEnded, hasFailed, hasStarted, hasSucceeded, isDone, isProgressing, loaded, readyState, total, result, error };
