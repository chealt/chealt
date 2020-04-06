const javascriptRules = require("./rules/javascript");
const importRules = require("./rules/import");
const prettierRules = require("./rules/prettier");

const config = {
    env: {
        browser: true,
        jest: true,
        node: true,
        es6: true
    },
    globals: {
        page: true
    },
    parser: "babel-eslint",
    rules: {
        ...javascriptRules,
        ...importRules,
        ...prettierRules
    },
    parserOptions: {
        ecmaVersion: 8,
        sourceType: "module"
    },
    plugins: ["import"]
};

module.exports = config;
