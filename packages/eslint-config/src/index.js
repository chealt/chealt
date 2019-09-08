const accessibilityRules = require('./rules/accessibility');
const javascriptRules = require('./rules/javascript');
const importRules = require('./rules/import');
const reactRules = require('./rules/react');

module.exports = {
    env: {
        browser: true,
        jest: true,
        node: true,
        es6: true
    },
    globals: {
        page: true
    },
    parser: 'babel-eslint',
    rules: {
        ...accessibilityRules,
        ...javascriptRules,
        ...reactRules,
        ...importRules
    },
    settings: {
        react: {
            version: 'detect'
        },
        'import/resolver': {
            webpack: {
                config: {
                    resolve: {
                        extensions: ['.js', '.jsx']
                    }
                }
            }
        }
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 8,
        sourceType: 'module'
    },
    plugins: ['import', 'react', 'jsx-a11y']
};
