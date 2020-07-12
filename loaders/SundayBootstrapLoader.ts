import Loader from '../core/Loader';

class SundayBootstrapLoader extends Loader {
  load () {
    const { pattern } = this.config;
    if (!pattern) return;
    this.getGlobalEntry(pattern, entries => {
      entries.forEach(entry => {
        let boostrap = require(entry);
        boostrap = boostrap.default || boostrap;
        if (typeof boostrap === 'function') {
          boostrap(this.app);
        }
      });
    });
  }
}

export = SundayBootstrapLoader;