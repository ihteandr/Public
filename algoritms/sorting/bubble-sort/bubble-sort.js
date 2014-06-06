/**
 * Created by Fujitsu on 6/4/2014.
 */

function swap(arr, firstIndex, secondIndex){
    var temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
}

function bubble_sorting(arr){
    var len = arr.length,
        i, j, stop;
    for(i = 0; i < len; i++){
        for(j=0, stop = len-i; j < stop;j++){
            if(arr[j]>arr[j+1]){
                swap(arr, j, j+1);
            }
        }
    }
    return arr;
}
