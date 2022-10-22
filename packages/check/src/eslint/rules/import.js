const config = {
  'import/default': ['error'],
  'import/export': ['error'],
  'import/group-exports': ['error'],
  'import/named': ['error'],
  'import/namespace': ['error'],
  'import/no-cycle': ['error'],
  'import/no-duplicates': ['error'],
  'import/no-extraneous-dependencies': ['error'],
  'import/no-named-as-default-member': ['error'],
  'import/no-named-as-default': ['error'],
  'import/no-unresolved': ['error', { commonjs: true, ignore: ['unpkg'] }],
  'import/order': [
    'error',
    {
      alphabetize: {
        order: 'asc'
      },
      'newlines-between': 'always',
      groups: ['external', 'internal'],
      pathGroups: [
        {
          pattern: '{.,..}/**/*.css',
          group: 'index',
          position: 'after'
        }
      ]
    }
  ]
};

module.exports = config;
