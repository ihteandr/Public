/**
 * Created by Fujitsu on 6/5/2014.
 */

function swap(arr, first, second){
    var temp = arr[first];
    arr[first] = arr[second];
    arr[second] = temp;
}

function partition(arr, first, second){
    var middle = Math.floor((first + second)/2),
        i = first,
        j = second;

    while(i<=j){
        while(arr[i] < arr[middle]){
            i++
        }
        while(arr[j]>arr[middle]){
            j--;
        }
        if(i<=j){
            swap(arr, i, j);
            i++;
            j--;
        }
    }
    return i;
}

function quick_sort(arr, first, second){
    first = first || 0;
    second = second || arr.length-1;
    if(arr.length > 1){
        var index = partition(arr, first, second);
        if(first < index -1){
            quick_sort(arr, first, index - 1);
        }
        if(index < second){
            quick_sort(arr, index, second);
        }
    }
    return arr;
}