module.exports = {
    'array-bracket-spacing': ['error'],
    'arrow-body-style': ['error'],
    'comma-dangle': ['error', 'never'],
    'comma-spacing': [
        'error',
        {
            before: false,
            after: true
        }
    ],
    complexity: ['error', 10],
    'eol-last': ['error', 'always'],
    eqeqeq: ['error'],
    'import/newline-after-import': ['error'],
    indent: [
        'error',
        4,
        {
            SwitchCase: 1
        }
    ],
    'no-multiple-empty-lines': [
        'error',
        {
            max: 1
        }
    ],
    'no-trailing-spaces': ['error'],
    'object-curly-spacing': ['error', 'always'],
    'padded-blocks': ['error', 'never'],
    'padding-line-between-statements': [
        'error',
        {
            blankLine: 'always',
            prev: '*',
            next: 'return'
        },
        {
            blankLine: 'always',
            prev: '*',
            next: 'break'
        },
        {
            blankLine: 'always',
            prev: '*',
            next: 'if'
        },
        {
            blankLine: 'always',
            prev: 'if',
            next: '*'
        }
    ],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': ['error']
};
