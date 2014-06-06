/**
 * Created by Fujitsu on 6/5/2014.
 */
describe("searching tests", function(){
    it("binary search", function(){
        expect(binary_search([1,2,3,4,5,6,7,8,9,10,11],11)).toBe(10)
    })
})