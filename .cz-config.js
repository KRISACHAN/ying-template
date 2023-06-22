const czConfig = {
    types: [
        { value: 'feat', name: '特性: 新增一个功能' },
        { value: 'fix', name: '修复: 修复一个Bug' },
        { value: 'docs', name: '文档: 文档变更' },
        { value: 'refactor', name: '重构: 代码重构' },
        { value: 'wip', name: '半成品: 开发中' },
        {
            value: 'build',
            name: '构建: 变更项目构建或外部依赖',
        },
        {
            value: 'ci',
            name: '集成: 更改持续集成软件的配置文件和package中的scripts命令',
        },
        {
            value: 'chore',
            name: '辅助: 其他变更',
        },
        {
            value: 'revert',
            name: '回退: 代码回退',
        },
    ],
    scopes: [
        { name: 'config' },
        { name: 'src/assets' },
        { name: 'src/styles' },
        { name: 'src/scripts' },
        { name: 'static' },
        { name: 'tests' },
        { name: 'views' },
        { name: 'readme' },
        { name: 'line' },
    ],
    messages: {
        type: '选择一种你的提交类型:',
        scope: '选择一个scope (可选):',
        customScope: '选择更改范围:',
        subject: '短说明:\n',
        body: '长说明，使用"|"换行(可选)：\n',
        breaking: '非兼容性说明 (可选):\n',
        footer: '关联关闭的issue，例如：#31, #34(可选):\n',
        confirmCommit: '确定提交说明?',
    },
    allowCustomScopes: true,
    allowBreakingChanges: ['feat', 'fix', 'wip'],
    // 限制主题长度
    subjectLimit: 100,
}

module.exports = czConfig
