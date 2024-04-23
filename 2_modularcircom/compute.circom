pragma circom 2.0.0;

/*
simple circuits for executing a complex calculation
out = (a*a + b)*b
*/  

// module add
template Compute () {
   // input signal
   signal input a;
   // input signal
   signal input b;
   // internal signal
   signal calc;
   // output signal
   signal output out;

   // do internal computation and constraint
   calc <== a*a + b;

   // do final calculation and constraint
   out <== calc * b;
}

