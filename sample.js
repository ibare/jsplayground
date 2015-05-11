function fibo() {
  var first,second,add;

  for(var i=0;i<4000;i++){
      if(i === 0){
          first = 1;
          second = 2;
      }
      add = first + second;
      first = second;
      second = add;

  }

  console.log(add);
}

fibo();
