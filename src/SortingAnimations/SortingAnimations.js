// TODO: Import these from const file
const HEIGHT_CHANGE = 1;
const COLOR_TO_DEFAULT = 2;
const COLOR_TO_ACTIVE = 3;
const COLOR_TO_ACTIVE_LOW = 4;
const SWAP_LOW = 5;

export function getSelectionSortAnimations(array) {
    const animations = [];
    if(array.length <= 1) return array;
    doSelectionSort(array, animations);
    return animations;
}

function doSelectionSort(array, animations) {
    let low;
    const n = array.length;

    for(let i = 0; i < n; i++) {
        low = i;
        animations.push({type: COLOR_TO_ACTIVE_LOW, index: low});
        for(let j = i + 1; j < n; j++) {
            animations.push({type: COLOR_TO_ACTIVE, index: j});
            if(array[j] < array[low]) {
                animations.push({
                    type: SWAP_LOW,
                    old_low: low,
                    new_low: j,
                });
                low = j;
            } else {
                animations.push({type: COLOR_TO_DEFAULT, index: j});
            }
        }

        if(array[i] > array[low]) {
            animations.push({
                type: HEIGHT_CHANGE,
                index1: i,
                index2: low,
            })
            let temp = array[i];
            array[i] = array[low];
            array[low] = temp;
        } else {
            animations.push({type: COLOR_TO_DEFAULT, index: low});
        }
        animations.push({type: COLOR_TO_DEFAULT, index: i});
    }
}

