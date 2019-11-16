import {
    BubbleSort,
    RandomList,
    SortedList
} from '../src/ts/sort'
describe('BubbleSort', () => {
    test('BubbleSort', () => {
        expect(BubbleSort(RandomList)).toStrictEqual(SortedList)
    })
})