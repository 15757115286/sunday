import * as nunjucks from 'nunjucks';

let environment!: nunjucks.Environment;

export function configNunjucks(path: string, opts?: nunjucks.ConfigureOptions) {
    environment = nunjucks.configure(path, opts);
}

export function getInstance() {
    return environment;
}