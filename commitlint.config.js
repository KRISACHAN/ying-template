module.exports = {
    extends: ['@commitlint/config-conventional'],
    // 定义规则类型
    rules: {
        // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
        'type-enum': [
            2,
            'always',
            [
                'feat', // 特性
                'fix', //  修复
                'docs', // 文档
                'refactor', // 重构
                'wip', // 半成品
                'build', // 打包
                'ci', // 集成
                'chore', // 辅助
                'revert', // 回退
            ],
        ],
        'subject-case': [0],
    },
}
