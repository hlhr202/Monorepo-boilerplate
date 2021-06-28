import esbuild from "esbuild";
import path from "path";
import { dtsPlugin } from "esbuild-plugin-d.ts";
import npmPackage from "../package.json";
import rimraf from "rimraf";

export const parseArgs = () => {
    return process.argv.slice(2);
};

export const build = async (pkg: string) => {
    await new Promise<void>((res, rej) =>
        rimraf(path.resolve(__dirname, `../${pkg}/dist`), (err) => {
            if (err) rej(err);
            else res();
        })
    );
    return await esbuild.build({
        bundle: true,
        entryPoints: {
            index: path.resolve(__dirname, `../${pkg}/src/index.tsx`),
        },
        platform: "node",
        format: "cjs",
        color: true,
        logLevel: "info",
        outdir: path.resolve(__dirname, `../${pkg}/dist`),
        external: Object.keys(npmPackage.dependencies),
        plugins: [dtsPlugin()],
    });
};

const run = () => {
    const pkgs = parseArgs();
    if (!pkgs.length) {
        throw new Error("build:packages require 1 or more argument");
    } else {
        pkgs.forEach((pkg) => {
            console.log(`Building: ${pkg}`);
            build(pkg);
        });
    }
};

run();
