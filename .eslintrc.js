module.exports = {
    //继承 Eslint规则
    parser: "@babel/eslint-parser",
    extends: ["eslint:recommended"],
    env: {
        node: true,  //启用node全局变量
        browser: true,//启用浏览器全局变量
    },
    parserOptions: {
        "ecmaVersion": 6,
        "sourceType": "module",
    },
    rules: {
        "semi": 0, //允许不使用分号
        "no-var": 2,//禁止使用var
        "no-undef": 0
    },
}