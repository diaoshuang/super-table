module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:vue/essential",
        "airbnb-base",
        'plugin:prettier/recommended',// 添加 prettier 插件
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
        // 在此处写规则
        'no-unused-vars': 0, // 定义未使用的变量
        'vue/no-multiple-template-root': 'off',// 关闭多根节点的校验
    }
}
