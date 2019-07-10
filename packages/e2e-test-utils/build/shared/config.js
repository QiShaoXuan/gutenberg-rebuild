"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WP_BASE_URL = exports.WP_PASSWORD = exports.WP_USERNAME = exports.WP_ADMIN_USER = void 0;
var WP_ADMIN_USER = {
  username: 'admin',
  password: 'password'
};
exports.WP_ADMIN_USER = WP_ADMIN_USER;
var _process$env = process.env,
    _process$env$WP_USERN = _process$env.WP_USERNAME,
    WP_USERNAME = _process$env$WP_USERN === void 0 ? WP_ADMIN_USER.username : _process$env$WP_USERN,
    _process$env$WP_PASSW = _process$env.WP_PASSWORD,
    WP_PASSWORD = _process$env$WP_PASSW === void 0 ? WP_ADMIN_USER.password : _process$env$WP_PASSW,
    _process$env$WP_BASE_ = _process$env.WP_BASE_URL,
    WP_BASE_URL = _process$env$WP_BASE_ === void 0 ? 'http://localhost:8889' : _process$env$WP_BASE_;
exports.WP_BASE_URL = WP_BASE_URL;
exports.WP_PASSWORD = WP_PASSWORD;
exports.WP_USERNAME = WP_USERNAME;
//# sourceMappingURL=config.js.map