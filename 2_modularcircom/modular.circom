pragma circom 2.0.0;
include "./compute.circom";
include "./power.circom";

/*
Demo for using circom as a template programming language
result = (a*a + b)*b + a*b
*/  

template Modular () {  

   // Declaration of signals.  
   // INPUT 
   signal input a;  
   signal input b;
   signal input expectedResult;
   // TEMP
   signal calc1;
   signal calc2;
   // OUTPUT
   signal output out;
   // Create component compute 
   component comp = Compute();
   // wire the component
   comp.a <== a;
   comp.b <== b;
   calc1 <== comp.out;
   // Create component power;
   component power = Power(2);
   // wire component power
   power.in[0] <== a;
   power.in[1] <== b;
   calc2 <== power.out;
   // add result as out
   out <== calc1 + calc2;
   expectedResult === out;
}

component main {public [expectedResult]} = Modular();

