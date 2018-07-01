(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('karet.lift'), require('infestines'), require('kefir'), require('kefir.partial.lenses')) :
  typeof define === 'function' && define.amd ? define(['exports', 'karet.lift', 'infestines', 'kefir', 'kefir.partial.lenses'], factory) :
  (factory((global.karet = global.karet || {}, global.karet.fr = {}),global.karet.lift,global.I,global.Kefir,global.kefir.partial.lenses));
}(this, (function (exports,F,I,K,L) { 'use strict';

  //

  var isObservable = function isObservable(x) {
    return x instanceof K.Observable;
  };

  var filter = /*#__PURE__*/I.curry(function filter(pr, xs) {
    if (isObservable(xs)) {
      return xs.filter(pr);
    } else if (pr(xs)) {
      return xs;
    } else {
      throw Error(pr.name);
    }
  });

  //

  var setName = function (to, name) {
    return I.defineNameU(to, name);
  };

  var copyName = function (to, from) {
    return I.defineNameU(to, from.name);
  };

  //

  var eventTypes = ['loadstart', 'progress', 'load', 'error'];

  var initial = { type: 'initial' };

  function perform(method) {
    var performPlain = setName(function (args) {
      return K.stream(function (_ref) {
        var emit = _ref.emit,
            end = _ref.end;

        var fr = new FileReader();
        var state = { fr: fr, state: initial, event: initial };
        eventTypes.forEach(function (type) {
          fr.addEventListener(type, function (event) {
            emit(state = L.set('state', { type: type, event: event }, state));
          });
        });
        fr.addEventListener('loadend', function (event) {
          end(emit(state = L.set('event', event, state)));
        });
        fr[method](args);
        return function () {
          if (fr.readyState < 2) fr.abort();
        };
      });
    }, method);
    return setName(function (argsIn) {
      var args = F.combine([argsIn], I.id);
      return (args != argsIn ? args.flatMapLatest(performPlain) : performPlain(args)).toProperty();
    }, method);
  }

  var after = /*#__PURE__*/I.curryN(3, function (predicate, getter) {
    return copyName(I.pipe2U(filter(predicate), getter), getter);
  });

  var isOneOf = /*#__PURE__*/I.curry(function (values, value) {
    return values.includes(value);
  });
  var is = function is(values) {
    return L.get(['state', 'type', isOneOf(values)]);
  };

  var getFR = function getFR(prop) {
    return setName(L.get(['fr', prop]), prop);
  };
  var getState = function getState(prop) {
    return setName(L.get(['state', 'event', prop]), prop);
  };

  // Starting

  var readAsArrayBuffer = /*#__PURE__*/perform('readAsArrayBuffer');
  var readAsBinaryString = /*#__PURE__*/perform('readAsBinaryString');
  var readAsDataURL = /*#__PURE__*/perform('readAsDataURL');
  var readAsText = /*#__PURE__*/perform('readAsText');

  // State

  var hasEnded = /*#__PURE__*/setName( /*#__PURE__*/is(['load', 'error']), 'hasEnded');
  var hasFailed = /*#__PURE__*/setName( /*#__PURE__*/is(['error']), 'hasFailed');
  var hasStarted = /*#__PURE__*/setName( /*#__PURE__*/is(eventTypes), 'hasStarted');
  var hasSucceeded = /*#__PURE__*/setName( /*#__PURE__*/is(['load']), 'hasSucceeded');
  var isDone = /*#__PURE__*/I.defineNameU( /*#__PURE__*/L.get(['event', 'type', /*#__PURE__*/L.is('loadend')]), 'isDone');
  var isProgressing = /*#__PURE__*/setName( /*#__PURE__*/is(['progress', 'loadstart']), 'isProgressing');
  var loaded = /*#__PURE__*/getState('loaded');
  var readyState = /*#__PURE__*/getFR('readyState');
  var total = /*#__PURE__*/getState('total');

  // Result

  var result = /*#__PURE__*/after(isDone, /*#__PURE__*/getFR('result'));
  var error = /*#__PURE__*/after(isDone, /*#__PURE__*/getFR('error'));

  exports.readAsArrayBuffer = readAsArrayBuffer;
  exports.readAsBinaryString = readAsBinaryString;
  exports.readAsDataURL = readAsDataURL;
  exports.readAsText = readAsText;
  exports.hasEnded = hasEnded;
  exports.hasFailed = hasFailed;
  exports.hasStarted = hasStarted;
  exports.hasSucceeded = hasSucceeded;
  exports.isDone = isDone;
  exports.isProgressing = isProgressing;
  exports.loaded = loaded;
  exports.readyState = readyState;
  exports.total = total;
  exports.result = result;
  exports.error = error;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
