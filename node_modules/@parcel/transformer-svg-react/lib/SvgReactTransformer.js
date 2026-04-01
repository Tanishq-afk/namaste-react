"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _plugin() {
  const data = require("@parcel/plugin");
  _plugin = function () {
    return data;
  };
  return data;
}
function _pluginJsx() {
  const data = _interopRequireDefault(require("@svgr/plugin-jsx"));
  _pluginJsx = function () {
    return data;
  };
  return data;
}
function _core() {
  const data = require("@svgr/core");
  _core = function () {
    return data;
  };
  return data;
}
function _utils() {
  const data = require("@parcel/utils");
  _utils = function () {
    return data;
  };
  return data;
}
function _path() {
  const data = _interopRequireDefault(require("path"));
  _path = function () {
    return data;
  };
  return data;
}
function _diagnostic() {
  const data = require("@parcel/diagnostic");
  _diagnostic = function () {
    return data;
  };
  return data;
}
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = new (_plugin().Transformer)({
  async loadConfig({
    config,
    logger,
    options
  }) {
    var _svgrResult$contents, _svgrResult$contents2;
    let svgrResult = await config.getConfig(['.svgrrc', '.svgrrc.json', '.svgrrc.js', '.svgrrc.cjs', '.svgrrc.mjs', 'svgr.config.json', 'svgr.config.js', 'svgr.config.cjs', 'svgr.config.mjs']);
    let svgoResult = await config.getConfig(['svgo.config.js', 'svgo.config.cjs', 'svgo.config.mjs', 'svgo.config.json']);
    let svgoConfig = (svgrResult === null || svgrResult === void 0 || (_svgrResult$contents = svgrResult.contents) === null || _svgrResult$contents === void 0 ? void 0 : _svgrResult$contents.svgoConfig) ?? (svgoResult === null || svgoResult === void 0 ? void 0 : svgoResult.contents);
    let svgoConfigPath = svgrResult !== null && svgrResult !== void 0 && (_svgrResult$contents2 = svgrResult.contents) !== null && _svgrResult$contents2 !== void 0 && _svgrResult$contents2.svgoConfig ? svgrResult.filePath : svgoResult === null || svgoResult === void 0 ? void 0 : svgoResult.filePath;

    // See if svgo is already installed.
    let resolved;
    try {
      resolved = await options.packageManager.resolve('svgo', _path().default.join(options.projectRoot, 'index'), {
        shouldAutoInstall: false
      });
    } catch (err) {
      // ignore.
    }

    // If so, use the existing installed version.
    let svgoVersion = 3;
    if (resolved) {
      var _resolved$pkg;
      if ((_resolved$pkg = resolved.pkg) !== null && _resolved$pkg !== void 0 && _resolved$pkg.version) {
        svgoVersion = parseInt(resolved.pkg.version);
      }
    } else if (svgoConfig) {
      // Otherwise try to detect the version based on the config file.
      let v = (0, _utils().detectSVGOVersion)(svgoConfig);
      if (svgoConfig != null && v.version === 2) {
        var _svgrResult$contents3;
        logger.warn({
          message: (0, _diagnostic().md)`Detected deprecated SVGO v2 options in ${_path().default.relative(process.cwd(), svgoConfigPath)}`,
          codeFrames: [{
            filePath: svgoConfigPath,
            codeHighlights: _path().default.basename(svgoConfigPath) === '.svgrrc' || _path().default.extname(svgoConfigPath) === '.json' ? (0, _diagnostic().generateJSONCodeHighlights)(await options.inputFS.readFile(svgoConfigPath, 'utf8'), [{
              key: `${svgrResult !== null && svgrResult !== void 0 && (_svgrResult$contents3 = svgrResult.contents) !== null && _svgrResult$contents3 !== void 0 && _svgrResult$contents3.svgoConfig ? '/svgoConfig' : ''}${v.path}`
            }]) : []
          }]
        });
      }
      svgoVersion = v.version;
    }
    return {
      svgr: svgrResult === null || svgrResult === void 0 ? void 0 : svgrResult.contents,
      svgo: svgoConfig,
      svgoVersion
    };
  },
  async transform({
    asset,
    config,
    options
  }) {
    var _config$svgr, _config$svgr2;
    let code = await asset.getCode();
    let plugins = [];
    if (((_config$svgr = config.svgr) === null || _config$svgr === void 0 ? void 0 : _config$svgr.svgo) !== false) {
      let svgo = await options.packageManager.require('svgo', _path().default.join(options.projectRoot, 'index'), {
        range: `^${config.svgoVersion}`,
        saveDev: true,
        shouldAutoInstall: options.shouldAutoInstall
      });
      plugins.push(createSvgoPlugin(svgo));
    }
    plugins.push(_pluginJsx().default);
    const jsx = await (0, _core().transform)(code, {
      svgoConfig: config.svgo,
      ...config.svgr,
      runtimeConfig: false
    }, {
      caller: {
        name: '@parcel/transformer-svg-react',
        defaultPlugins: plugins
      },
      filePath: asset.filePath
    });
    asset.type = (_config$svgr2 = config.svgr) !== null && _config$svgr2 !== void 0 && _config$svgr2.typescript ? 'tsx' : 'jsx';
    asset.bundleBehavior = null;
    asset.setCode(jsx);
    return [asset];
  }
}); // Below is copied from @svgr/plugin-svgo. MIT license.
// https://github.com/gregberge/svgr/tree/180eb6d503215fc782dfece351ff751194a0dfed/packages/plugin-svgo
function getSvgoConfigFromSvgrConfig(config) {
  const params = {
    overrides: {}
  };
  if (config.icon || config.dimensions === false) {
    params.overrides.removeViewBox = false;
  }
  if (config.native) {
    params.overrides.inlineStyles = {
      onlyMatchedOnce: false
    };
  }
  return {
    plugins: [{
      name: 'preset-default',
      params
    }, 'prefixIds']
  };
}
function getSvgoConfig(config) {
  if (config.svgoConfig) return config.svgoConfig;
  return getSvgoConfigFromSvgrConfig(config);
}
function createSvgoPlugin(svgo) {
  return (code, config, state) => {
    const svgoConfig = getSvgoConfig(config);
    const result = svgo.optimize(code, {
      ...svgoConfig,
      path: state.filePath
    });

    // @ts-ignore
    if (result.modernError) {
      // @ts-ignore
      throw result.modernError;
    }
    return result.data;
  };
}