'use strict'
import '@/css/index.css'
import '@/sass/index.scss'
import {
    BubbleSort
} from './ts/sort'
import {
    RandomList,
    SortedList
} from './ts/utils'

const BubbleSortIsCurrent = BubbleSort(RandomList)
                                .every((num, idx) => {
                                    return num === SortedList[idx]
                                })
console.log(BubbleSortIsCurrent)