import { PluginConfigItem } from "../definitions/core";
import { PureObject } from '../definitions/common';
import { getPluginPath } from '../core/lib/util';

const pluginConfig: PureObject<Partial<PluginConfigItem>> = {
    'sunday-decorator': {
        enable: true,
        path: getPluginPath(__dirname, 'sunday-decorator')
    },
    'sunday-body': {
        enable: true,
        path: getPluginPath(__dirname, 'sunday-body')
    },
    'sunday-nunjucks': {
        enable: true,
        path: getPluginPath(__dirname, 'sunday-nunjucks')
    }
}

export = pluginConfig;