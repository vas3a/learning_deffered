(function(){
   /**
    * Returns a random integer between min and max
    * Using Math.round() will give you a non-uniform distribution!
    */
   function getRandomInt (min, max) {
       return Math.floor(Math.random() * (max - min + 1)) + min;
   }
   
   function t(){return getRandomInt(15, 2000);}

   var final = new $.Deferred,
       finalPromise = final.promise();
   
   final.done(function(){
       console.log('Done!!!');
   });
   final = final.resolve;

   var deps = [], difs = [];
   for(var i = 0; i < 30; i++){
       var promise, dif;
       promise = (dif = new $.Deferred).promise();
       
       promise.done((function(_i){
           return function(){
               console.log('Promise '+_i+' is done!');
               final = final.call(null);
           }
       })(i));
       
       difs.push(dif);
       
       if(i < 9) final = wrap(final);
   }
   
   // only on dev
   for(var i = 0; i < 30; i++){
       setTimeout(difs[i].resolve, t());
   }
   
   function wrap(func){
       return function(){return func;}
   }
})();
