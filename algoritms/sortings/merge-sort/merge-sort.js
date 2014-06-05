/**
 * Created by Fujitsu on 6/5/2014.
 */
function merge(left, right){
    var result = [],
        li = 0,
        ri = 0;
    while(li < left.length && ri < right.length){
        if(left[li] < right[ri]){
            result.push(left[li++]);
        }else{
            result.push(right[ri++]);
        }
    }

    return result.concat(left.slice(li)).concat(right.slice(ri));
}

function merge_sort(arr){
    if(arr.length < 2 ){
        return arr;
    }
    var middle = Math.floor(arr.length/2),
        left = arr.slice(0,middle),
        right = arr.slice(middle);
    return merge(merge_sort(left), merge_sort(right));
}