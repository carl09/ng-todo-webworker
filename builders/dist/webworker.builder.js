"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular-devkit/core");
var build_webpack_1 = require("@angular-devkit/build-webpack");
var build_angular_1 = require("@angular-devkit/build-angular");
var WebWorkerBuilder = /** @class */ (function () {
    function WebWorkerBuilder(context) {
        this.context = context;
    }
    WebWorkerBuilder.prototype.run = function (builderConfig) {
        var host = new core_1.virtualFs.AliasHost(this.context.host);
        var root = this.context.workspace.root;
        var projectRoot = core_1.resolve(root, builderConfig.root);
        var options = builderConfig.options;
        options.scripts = [];
        options.styles = [];
        var webpackBuilder = new build_webpack_1.WebpackBuilder(__assign({}, this.context, { host: host }));
        var browserBuilder = new build_angular_1.BrowserBuilder(this.context);
        var webpackConfig = browserBuilder.buildWebpackConfig(root, projectRoot, host, options);
        webpackConfig.optimization.splitChunks = false;
        webpackConfig.optimization.runtimeChunk = false;
        var plugins = webpackConfig.plugins;
        plugins.splice(plugins.findIndex(function (x) { return x.constructor.name === 'IndexHtmlWebpackPlugin'; }), 1);
        // plugins.forEach((p: object) => {
        //     console.log(p.constructor.name);
        // });
        return webpackBuilder.runWebpack(webpackConfig);
    };
    return WebWorkerBuilder;
}());
exports.default = WebWorkerBuilder;
