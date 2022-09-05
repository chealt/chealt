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
  'import/no-unresolved': ['error', { commonjs: true, ignore: ['unpkg'] }]
};

module.exports = config;
