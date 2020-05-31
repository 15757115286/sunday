import { PureObject } from '../definitions/common';
import { LoadConfig } from '../definitions/core';

const LoaderConfig: PureObject<LoadConfig> = {
    'SundayConfigLoader': {
        priority: 1,
        options: {
            pattern: 'config/**/*.(ts|js)'
        }
    }
};
export default LoaderConfig;