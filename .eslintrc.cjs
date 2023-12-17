/** @type { import("eslint").Linter.FlatConfig } */
module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'airbnb-base',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
	rules: {
		'no-console': 0,
		'arrow-parens': ['error', 'as-needed'],
		'import/prefer-default-export': 0,
		'no-await-in-loop': 0,
		'no-restricted-syntax': 0,
		'no-void': 0,
		'import/extensions': [0, { '<js>': 'always' }],
		// 'import/no-unresolved': [0, { ignore: ['^@'] }],
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.ts', '.svelte']
			}
		}
	},
};
