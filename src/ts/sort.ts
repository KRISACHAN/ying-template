import {
    DefalutListType
} from './global.d'
import {
    Swap
} from './utils'

export const BubbleSort = (list: DefalutListType): DefalutListType => {
    const len: number = list.length - 1
    for (let i: number = 0; i < len; ++i) {
        for (let j: number = 0; j < len - i; ++j) {
            if (list[j] > list[j + 1]) {
                Swap(list, j, j + 1)
            }
        }
    }
    return list
}