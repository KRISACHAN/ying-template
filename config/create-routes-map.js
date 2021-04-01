const babel = require('@babel/core')
const fs = require('fs')
const mobileRoutesSource = fs.readFileSync('./src/mobile/routes.ts', 'utf-8')
const pcRoutesSource = fs.readFileSync('./src/pc/routes.ts', 'utf-8')

const genAst = source => {
    const { ast } = babel.transformSync(source, {
        ast: true,
        code: true,
        babelrc: true,
    })
    return ast
}

const genRoutesMap = ast => {
    let res = {}
    const { program } = ast
    if (!program || !program.body) {
        return res
    }
    const [ObjectExpression] = program.body
        .filter(
            expression =>
                expression.declaration && expression.declaration.properties,
        )
        .map(expression => expression.declaration.properties)
    res = ObjectExpression.filter(
        expression => expression.type === 'ObjectProperty',
    ).map(expression => ({
        key: expression.key.value,
        value: expression.value.value,
    }))
    return res
}

const mobileRoutesMap = genRoutesMap(genAst(mobileRoutesSource))
const pcRoutesMap = genRoutesMap(genAst(pcRoutesSource))

module.exports = {
    mobileRoutesMap,
    pcRoutesMap,
}
