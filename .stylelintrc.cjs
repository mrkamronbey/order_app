module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-sass-guidelines',
    'stylelint-prettier/recommended',
    'stylelint-config-standard-scss',
    'stylelint-config-prettier-scss',
  ],

  plugins: ['stylelint-order', 'stylelint-scss'],

  defaultSeverity: 'warning',

  rules: {
    'max-nesting-depth': [
      1,
      {
        ignore: ['pseudo-classes'],
      },
    ],
    'order/order': [
      'custom-properties',
      'dollar-variables',
      'declarations',
      {
        type: 'at-rule',
        name: 'include',
      },
      {
        type: 'at-rule',
        name: 'extend',
      },
      'rules',
      'at-rules',
    ],
    'order/properties-alphabetical-order': true,
    'selector-class-pattern': [
      '^[a-z][a-z0-9-_]*$',
      {
        severity: 'warning',
      },
    ],
    'color-named': [
      'never',
      {
        severity: 'warning',
      },
    ],
    'scss/no-global-function-names': [
      true,
      {
        ignoreFunctions: ['color.change', 'color.hue', 'color.mix'],
      },
    ],
    'max-nesting-depth': [
      1,
      {
        ignore: ['pseudo-classes'],
      },
    ],
    'scss/no-global-function-names': [
      true,
      {
        ignoreFunctions: ['color.change', 'color.hue', 'color.mix'],
      },
    ],
  },
}
