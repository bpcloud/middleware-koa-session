'use strict';

/**
* Copyright (c) 2021 Copyright bp All Rights Reserved.
* Author: brian.li
* Date: 2021-03-11 13:53
* Desc: 
*/

var afterRoute = require('./libs/afterRoute');
var beforeRoute = require('./libs/beforeRoute');
var initiator = require('./libs/initiator');
var defaultCfg = require('./libs/defaultCfg');
var path = require('path');

exports.name = "middleware-koa-session";

exports.middleware = function (cfg) {

  cfg = cfg || {};

  cfg.keys = cfg.keys || defaultCfg.keys;
  cfg.key = cfg.key || defaultCfg.key;
  cfg.maxAge = cfg.maxAge || defaultCfg.maxAge;
  cfg.autoCommit = cfg.autoCommit || defaultCfg.autoCommit;
  cfg.overwrite = cfg.overwrite || defaultCfg.overwrite;
  cfg.httpOnly = cfg.httpOnly || defaultCfg.httpOnly;
  cfg.signed = cfg.signed || defaultCfg.signed;
  cfg.rolling = cfg.rolling || defaultCfg.rolling;
  cfg.renew = cfg.renew || defaultCfg.renew;
  cfg.secure = cfg.secure || defaultCfg.secure;
  cfg.sameSite = cfg.sameSite || defaultCfg.sameSite;

  return {
    type: 'koa',
    name: exports.name,
    afterRoute,
    beforeRoute,
    initiator: (app, bpApp) => {
      return initiator(app, cfg, bpApp);
    }
  };
}