#!/bin/bash
set -evx

echo '###########################';
echo '#### COMPILE AND RUN #####';
echo '###########################';

echo "Compile main transaction circuit";
circom transaction.circom --r1cs --wasm --sym

echo "View information on the transaction circuit"
snarkjs r1cs info transaction.r1cs

# setup power of tau
cp preparedtau/pot18_0000.ptau transaction_js/pot18_0000.ptau
cp preparedtau/pot18_0001.ptau transaction_js/pot18_0001.ptau
cp preparedtau/pot18_beacon.ptau transaction_js/pot18_beacon.ptau
cp preparedtau/pot18_final.ptau transaction_js/pot18_final.ptau

#copy compiled file
cp input.json transaction_js
cp input.json transaction_cpp
cp transaction.r1cs transaction_js
cp transaction.r1cs transaction_cpp

# generate witness from js
echo "Generate witness from js"

cd transaction_js

node generate_witness.js transaction.wasm input.json witness.wtns

# trusted setup phase1 - powers of tau

echo "Trusted setup phase1 - powers of tau"

#snarkjs powersoftau new bn128 14 pot14_0000.ptau -v

#snarkjs powersoftau contribute pot14_0000.ptau pot14_0001.ptau --name="First contribution" -v

# trusted setup phase2

echo "Trusted setup phase2 power of tau"

#snarkjs powersoftau prepare phase2 pot14_0001.ptau pot14_final.ptau -v

#snarkjs powersoftau contribute pot14_0001.ptau pot14_0002.ptau --name="Second contribution" -v -e="some random text"

#snarkjs powersoftau export challenge pot14_0002.ptau challenge_0003
#snarkjs powersoftau challenge contribute bn128 challenge_0003 response_0003 -e="some random text"
#snarkjs powersoftau import response pot14_0002.ptau response_0003 pot18_0003.ptau -n="Third contribution name"

# verify the protocol
echo "Verify the protocol"
#snarkjs powersoftau verify pot14_0003.ptau

# random beacon
echo "Random beacon"
#snarkjs powersoftau beacon pot14_0003.ptau pot14_beacon.ptau 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n="Final Beacon"

# Prepare phase 2
echo "Random beacon"
#snarkjs powersoftau prepare phase2 pot14_beacon.ptau pot14_final.ptau -v

# Verify final
echo "Verify final power of tau"
#snarkjs powersoftau verify pot14_final.ptau


#setup plonk
echo "setup plonk"
snarkjs plonk setup transaction.r1cs pot18_final.ptau transaction_final.zkey

#export the verification key
echo "export the verification key"
snarkjs zkey export verificationkey transaction_final.zkey verification_key.json

# create proof plonk
echo "create proof plonk"
snarkjs plonk prove transaction_final.zkey witness.wtns proof.json public.json

# verify proof
echo "verify proof"
snarkjs plonk verify verification_key.json public.json proof.json







