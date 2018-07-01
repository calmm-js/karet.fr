# <a id="karet-fr"></a> [≡](#contents) Karet FR &middot; [![Gitter](https://img.shields.io/gitter/room/calmm-js/chat.js.svg)](https://gitter.im/calmm-js/chat) [![GitHub stars](https://img.shields.io/github/stars/calmm-js/karet.fr.svg?style=social)](https://github.com/calmm-js/karet.fr)

This library provides a thin wrapper over the standard
[`FileReader`](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) API.
See also [Karet XHR](https://github.com/calmm-js/karet.xhr/).

Examples:
* Live [Image Upload](https://codesandbox.io/s/oo8nz1kk7z) CodeSandbox.

[![npm version](https://badge.fury.io/js/karet.fr.svg)](http://badge.fury.io/js/karet.fr)
[![Build Status](https://travis-ci.org/calmm-js/karet.fr.svg?branch=master)](https://travis-ci.org/calmm-js/karet.fr)
[![Code Coverage](https://img.shields.io/codecov/c/github/calmm-js/karet.fr/master.svg)](https://codecov.io/github/calmm-js/karet.fr?branch=master)
[![](https://david-dm.org/calmm-js/karet.fr.svg)](https://david-dm.org/calmm-js/karet.fr)
[![](https://david-dm.org/calmm-js/karet.fr/dev-status.svg)](https://david-dm.org/calmm-js/karet.fr?type=dev)

## <a id="contents"></a> [≡](#contents) Contents

* [Reference](#reference)
  * [Starting](#starting)
    * [`FR.readAsArrayBuffer(file) ~> fileReader`](#FR-readAsArrayBuffer)
    * [`FR.readAsBinaryString(file) ~> fileReader`](#FR-readAsBinaryString)
    * [`FR.readAsDataURL(file) ~> fileReader`](#FR-readAsDataURL)
    * [`FR.readAsText(file) ~> fileReader`](#FR-readAsText)
  * [State](#state)
    * [`FR.hasEnded(fileReader) ~> boolean`](#FR-hasEnded)
    * [`FR.hasFailed(fileReader) ~> boolean`](#FR-hasFailed)
    * [`FR.hasStarted(fileReader) ~> boolean`](#FR-hasStarted)
    * [`FR.hasSucceeded(fileReader) ~> boolean`](#FR-hasSucceeded)
    * [`FR.isDone(fileReader) ~> boolean`](#FR-isDone)
    * [`FR.isProgressing(fileReader) ~> boolean`](#FR-isProgressing)
    * [`FR.loaded(fileReader) ~> number`](#FR-loaded)
    * [`FR.readyState(fileReader) ~> number`](#FR-readyState)
    * [`FR.total(fileReader) ~> number`](#FR-total)
  * [Result](#result)
    * [`FR.result(fileReader) ~> varies`](#FR-result)
    * [`FR.error(fileReader) ~> exception`](#FR-error)

## <a id="reference"></a> [≡](#contents) Reference

The interface of this library consists of named exports.  Typically one just
imports the library as:

```js
import * as FR from 'karet.fr'
```

### <a id="starting"></a> [≡](#contents) [Starting](#starting)

#### <a id="FR-readAsArrayBuffer"></a> [≡](#contents) [`FR.readAsArrayBuffer(file) ~> fileReader`](#FR-readAsArrayBuffer)
#### <a id="FR-readAsBinaryString"></a> [≡](#contents) [`FR.readAsBinaryString(file) ~> fileReader`](#FR-readAsBinaryString)
#### <a id="FR-readAsDataURL"></a> [≡](#contents) [`FR.readAsDataURL(file) ~> fileReader`](#FR-readAsDataURL)
#### <a id="FR-readAsText"></a> [≡](#contents) [`FR.readAsText(file) ~> fileReader`](#FR-readAsText)

### <a id="state"></a> [≡](#contents) [State](#state)

#### <a id="FR-hasEnded"></a> [≡](#contents) [`FR.hasEnded(fileReader) ~> boolean`](#FR-hasEnded)
#### <a id="FR-hasFailed"></a> [≡](#contents) [`FR.hasFailed(fileReader) ~> boolean`](#FR-hasFailed)
#### <a id="FR-hasStarted"></a> [≡](#contents) [`FR.hasStarted(fileReader) ~> boolean`](#FR-hasStarted)
#### <a id="FR-hasSucceeded"></a> [≡](#contents) [`FR.hasSucceeded(fileReader) ~> boolean`](#FR-hasSucceeded)
#### <a id="FR-isDone"></a> [≡](#contents) [`FR.isDone(fileReader) ~> boolean`](#FR-isDone)
#### <a id="FR-isProgressing"></a> [≡](#contents) [`FR.isProgressing(fileReader) ~> boolean`](#FR-isProgressing)
#### <a id="FR-loaded"></a> [≡](#contents) [`FR.loaded(fileReader) ~> number`](#FR-loaded)
#### <a id="FR-readyState"></a> [≡](#contents) [`FR.readyState(fileReader) ~> number`](#FR-readyState)
#### <a id="FR-total"></a> [≡](#contents) [`FR.total(fileReader) ~> number`](#FR-total)

### <a id="result"></a> [≡](#contents) [Result](#result)

#### <a id="FR-result"></a> [≡](#contents) [`FR.result(fileReader) ~> varies`](#FR-result)
#### <a id="FR-error"></a> [≡](#contents) [`FR.error(fileReader) ~> exception`](#FR-error)
