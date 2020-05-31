import { PluginConfigItem } from "../definitions/core";
import { PureObject } from '../definitions/common';
import { getPluginPath } from '../core/lib/util';

const pluginConfig: PureObject<Partial<PluginConfigItem>> = {
    'sunday-router': {
        enable: true,
        path: getPluginPath(__dirname, 'sunday-router')
    }
}

export = pluginConfig;