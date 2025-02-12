'use strict'

/**
 * Copyright (c) 2021 Copyright bp All Rights Reserved.
 * Author: brian.li
 * Date: 2021-03-11 13:13
 * Desc:
 */

module.exports = async function (app, bpApp, request) {
  request._session = app.session;
  request._ctx = app;

  Object.defineProperty(request, 'session', {
    get: function () {
      return this._session
    },
    set: function (value) {
      if (value == null) {
        this._ctx.session = null
      }
    },
    destroy() {
      this._ctx.session = null
    },
    enumerable: true, // 可枚举
    configurable: true, // 可配置
  })
}
