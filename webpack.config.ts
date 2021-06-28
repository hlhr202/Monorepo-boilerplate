import type { Configuration } from "webpack";
import type { Configuration as DevServerConfig } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

const webpackConfig: Configuration & { devServer: DevServerConfig } = {
    context: path.resolve(__dirname, "./src"),
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    entry: {
        index: "./index.tsx",
    },
    output: {
        filename: "assets/js/bundle.[contenthash].min.js",
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: [/\.jsx?$/, /\.tsx?$/],
                use: ["babel-loader"],
                // this will exclude compilation from all packages
                exclude: [/node_modules/, /packages/],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    devServer: {
        contentBase: path.resolve(__dirname, "./dist"),
        compress: true,
        port: 9000,
    },
    plugins: [new HtmlWebpackPlugin()],
};

export default webpackConfig;
