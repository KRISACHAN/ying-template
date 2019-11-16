'use strict'
import '@/css/index.css'
import '@/sass/index.scss'
import {
    BubbleSort,
    RandomList,
    SortedList
} from 'src/ts/sort'

const BubbleSortIsCurrent = BubbleSort(RandomList)
                                .every((num, idx) => {
                                    return num === SortedList[idx]
                                })
console.log(BubbleSortIsCurrent)