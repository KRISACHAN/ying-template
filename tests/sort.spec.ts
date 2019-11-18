import {
    BubbleSort
} from '../src/ts/sort'
import {
    RandomList,
    SortedList
} from '../src/ts/utils'
describe('BubbleSort', () => {
    test('BubbleSort', () => {
        expect(BubbleSort(RandomList)).toStrictEqual(SortedList)
    })
})