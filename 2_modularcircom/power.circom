pragma circom 2.0.0;

/*
module for demonstrating power of n
*/  

// module power

template Power(n) {
   signal input in[n];
   var internalcalc=1;
   signal output out;

   for (var i = 0; i < n; i++) {
      internalcalc = internalcalc * in[i];
   }

   // constraint
   out <== internalcalc;
}

