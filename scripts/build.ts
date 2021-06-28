import esbuild from "esbuild";
import path from "path";
import { dtsPlugin } from "esbuild-plugin-d.ts";
import pkg from "../package.json";

const build = (pkgPath: string) => {
    return esbuild.build({
        bundle: true,
        entryPoints: {
            index: path.resolve(__dirname, `../${pkgPath}/src/index.tsx`),
        },
        platform: "node",
        format: "cjs",
        color: true,
        logLevel: 'info',
        outdir: path.resolve(__dirname, `../${pkgPath}/dist`),
        external: Object.keys(pkg.dependencies),
        plugins: [dtsPlugin()],
    });
};

const run = () => {
    const args = process.argv;
    const packagePaths: string[] = args.slice(2);

    if (!packagePaths.length) {
        throw new Error("build:packages require 1 or more argument");
    } else {
        packagePaths.forEach((pkg) => {
            console.log(`Building: ${pkg}`);
            build(pkg);
        });
    }
};

run();
