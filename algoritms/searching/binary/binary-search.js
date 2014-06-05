/**
 * Created by Fujitsu on 6/5/2014.
 */
function binary_search(arr, el){
    var start = 0,
        end = arr.length-1,
        middle = Math.floor((start + end)/2)
    while(arr[middle] != el && start < end){
        if(arr[middle] > el){
            end = middle - 1;
        } else {
            start = middle+1;
        }
        middle = Math.floor((start + end)/2)
    }

    return (arr[middle] != el) ? -1 : middle;
}