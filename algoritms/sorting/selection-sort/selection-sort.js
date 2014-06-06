/**
 * Created by Fujitsu on 6/5/2014.
 */
function swap(arr, firstIndex, secondIndex){
    var temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
}

function selection_sort(arr){
    var len = arr.length;

    for(var i= 0;i < len;i++){
        var min = i;
        for(var j = i; j < len; j++){
            if(arr[min]>arr[j]){
                min = j;
            }
        }
        swap(arr, min, i);
    }
    return arr;
}