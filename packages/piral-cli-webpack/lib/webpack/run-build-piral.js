"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("piral-cli/utils");
const path_1 = require("path");
const bundler_run_1 = require("./bundler-run");
const configs_1 = require("../configs");
const helpers_1 = require("../helpers");
const constants_1 = require("../constants");
function run(root, piral, emulator, sourceMaps, contentHash, minify, externals, publicUrl, outDir, entryFiles, logLevel) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, utils_1.setStandardEnvs)({
            production: !emulator,
            root,
            debugPiral: emulator,
            debugPilet: emulator,
            piral,
            dependencies: externals,
        });
        const otherConfigPath = (0, path_1.resolve)(root, constants_1.defaultWebpackConfig);
        const baseConfig = yield (0, configs_1.getPiralConfig)(entryFiles, outDir, externals, emulator, sourceMaps, contentHash, minify, publicUrl);
        const wpConfig = (0, helpers_1.extendConfig)(baseConfig, otherConfigPath, {
            watch: false,
        });
        const bundler = (0, bundler_run_1.runWebpack)(wpConfig, logLevel);
        return bundler.bundle();
    });
}
process.on('message', (msg) => __awaiter(void 0, void 0, void 0, function* () {
    switch (msg.type) {
        case 'start':
            const result = yield run(process.cwd(), msg.piral, msg.emulator, msg.sourceMaps, msg.contentHash, msg.minify, msg.externals, msg.publicUrl, msg.outDir, msg.entryFiles, msg.logLevel).catch((error) => {
                process.send({
                    type: 'fail',
                    error: error === null || error === void 0 ? void 0 : error.message,
                });
            });
            if (result) {
                process.send({
                    type: 'done',
                    outDir: result.outDir,
                    outFile: result.outFile,
                });
            }
            break;
    }
}));
//# sourceMappingURL=run-build-piral.js.map