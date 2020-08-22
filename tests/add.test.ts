import { add } from 'src/demo'

describe('Add', () => {
    test('1 + 1', () => {
        expect(add(1, 1)).toEqual(2)
    })
})
