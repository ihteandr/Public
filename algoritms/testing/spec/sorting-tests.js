/**
 * Created by Fujitsu on 6/5/2014.
 */
describe("Sorting tests", function(){
    it("bubble sort", function(){
        expect(bubble_sorting([1,5,10,6,7,2,3,4,8,9])).toEqual([1,2,3,4,5,6,7,8,9,10])
    })

    it("merge sort", function(){
        expect(merge_sort([1,5,10,6,7,2,3,4,8,9])).toEqual([1,2,3,4,5,6,7,8,9,10])
    })

    it("quick sort", function(){
        expect(quick_sort([1,5,10,6,7,2,3,4,8,9])).toEqual([1,2,3,4,5,6,7,8,9,10])
    })

    it("selection sort", function(){
        expect(selection_sort([1,5,10,6,7,2,3,4,8,9])).toEqual([1,2,3,4,5,6,7,8,9,10])
    })

    it("insertion sort", function(){
        expect(insertion_sort([1,5,10,6,7,2,3,4,8,9])).toEqual([1,2,3,4,5,6,7,8,9,10])
    })
})