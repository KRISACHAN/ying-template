module.exports = {
    extends: ['@commitlint/config-conventional'],
    // 定义规则类型
    rules: {
        // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
        'type-enum': [
            2,
            'always',
            [
                'feat', // 新功能
                'fix', //  修复
                'docs', // 文档变更
                'style', // 代码格式（不影响代码运行的变动）
                'refactor', // 重构（既不是增加feature）,也不是修复bug
                'pref', // 性能优化
                'test', // 增加测试
                'wip', // 半成品: 开发中
                'build', // 打包
                'ci', // 集成
                'style', // 代码格式
                'chore', // 构建: 变更构建流程或辅助工具
                'revert', // 回退
            ],
        ],
        // subject 大小写不做校验
        'subject-case': [0],
    },
}
