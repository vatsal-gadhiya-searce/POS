const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");

const config = require("custom-react-scripts/config/webpack.config.prod");

config.entry = "./src/index.ssr.js";

config.output.path = config.output.path + "_ssr";
config.output.filename = "[name].js";
config.output.libraryTarget = "commonjs2";
delete config.output.chunkFilename;

config.target = "node";
config.externals = /^[a-z\-0-9]+$/;
delete config.devtool;

config.plugins = config.plugins.filter(
    plugin =>
        !(
            plugin instanceof HtmlWebpackPlugin ||
            plugin instanceof SWPrecacheWebpackPlugin ||
            plugin instanceof webpack.optimize.UglifyJsPlugin
        )
);
config.plugins.push(new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1,
}));

module.exports = config;