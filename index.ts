import Sunday from './core/Sunday';

// process.env.NODE_ENV = 'prod';
new Sunday({
    port: 3000,
    root: process.cwd()
});
