import Loader from "../core/Loader";

const MATCH_REG = /([^\/]+)\/bootstrap\.(?:ts|js)/;

class SundayBootstrapLoader extends Loader {
    load() {
        const { pattern } = this.config;
        if (!pattern) return;
        const config = this.app.config;
        this.getGlobalEntry(pattern, entries => {
            entries.forEach(entry => {
                const name = entry.match(MATCH_REG)![1];
                let boostrap = require(entry);
                boostrap = boostrap.default || boostrap;
                if (typeof boostrap === 'function') {
                    boostrap(config[name] || {});
                }
            });
        })
    }
}

export = SundayBootstrapLoader;