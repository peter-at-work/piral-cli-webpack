import InjectPlugin from 'webpack-inject-plugin';
export default class SheetPlugin extends InjectPlugin {
    private cssName;
    constructor(cssName: string, name: string);
    apply(compiler: any): void;
}
