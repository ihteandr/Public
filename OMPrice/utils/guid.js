module.exports = {
    generate: function() {
        function s4() {
            return Math.floor((1 + Math.random()) * Date.now().toString().substr(5))
                .toString(16)
                .substring(1);
        }
        return function() {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };
    }
}