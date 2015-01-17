define([
    "spin"
], function(Spinner){
    return function(){
        var spin = new Spinner();
        function startSpin(el){
            spin.spin(el);
        };

        function stopSpin(){
            spin.stop();
        };
        return {
            startSpin: startSpin,
            stopSpin: stopSpin
        };

    };
});