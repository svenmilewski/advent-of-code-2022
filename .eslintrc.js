module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', "prettier"],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    rules: {
        curly: 2
    },
    env: {
        node: true
    }
};