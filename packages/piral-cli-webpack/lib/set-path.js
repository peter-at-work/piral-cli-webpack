function computePath() {
    try {
        throw new Error();
    }
    catch (t) {
        const e = ('' + t.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
        if (e) {
            return e[0].replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^\/]+$/, '$1') + '/';
        }
    }
    return '/';
}
// tslint:disable-next-line:variable-name
const __bundleUrl__ = computePath();
__webpack_public_path__ = __bundleUrl__;
//# sourceMappingURL=set-path.js.map