module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    'custom-property-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*(--[a-z0-9]+)*$',
      {
        message: (name) =>
          `Expected custom property name "${name}" to be kebab-case with an optional modifier at the end`
      }
    ],
    'selector-class-pattern': [
      '(^[a-z]|[A-Z0-9])[a-z]*$',
      {
        message: (selector) => `Expected class selector "${selector}" to be camel-case`
      }
    ]
  }
};
