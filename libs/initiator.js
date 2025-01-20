'use strict';

/**
 * Copyright (c) 2021 Copyright bp All Rights Reserved.
 * Author: brian.li
 * Date: 2021-03-11 13:13
 * Desc:
 */

var session = require('koa-session');

module.exports = function (app, cfg, bpApp) {
  app.keys = cfg.keys;
  app.use(session.createSession(cfg, app));
};
