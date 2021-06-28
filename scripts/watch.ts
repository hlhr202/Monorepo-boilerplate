import chokidar from "chokidar";
import debounceFn from "debounce-fn";
import path from "path";
import { build } from "./build";
import { parseArgs } from "./build";
import webpackConfig from "../webpack.config";
import webpack from "webpack";
import Server from "webpack-dev-server";

const debounceBuild = debounceFn((pkg: string) => build(pkg), { wait: 100 });

const run = () => {
    const pkgs = parseArgs();

    if (!pkgs.length) {
        throw new Error("serve:packages require 1 or more argument");
    } else {
        pkgs.forEach((pkg) => {
            // await build(pkg);
            chokidar
                .watch(path.resolve(__dirname, `../${pkg}/src`))
                .on("change", () => debounceBuild(pkg));
        });
    }

    const server = new Server(
        webpack(webpackConfig) as any,
        webpackConfig.devServer
    );
    const port = webpackConfig.devServer.port || 8080;
    server.listen(port, (err) => {
        if (err) {
            console.log(err);
        }
        console.log("WebpackDevServer listening at localhost:", port);
    });
};

run();
