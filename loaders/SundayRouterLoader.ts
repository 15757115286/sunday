import Loader from "../core/Loader";
import { LoaderParameter } from '../definitions/core';

class SundayRouterLoader extends Loader {
    constructor(params: Readonly<LoaderParameter>) {
        super(params);
    }
    load() {
        this.app.xwt = '1';
        console.log('run loaders!')
    }
}

export = SundayRouterLoader;