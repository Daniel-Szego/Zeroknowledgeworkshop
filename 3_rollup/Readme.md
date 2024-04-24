# NOTES FOR FABRIC ZK DEMO

### Forked repo: 
https://github.com/tanpx12/zk-rollup-tutorial

generate input for the rollup circom artihmetic circuit

node generateinput.js

### compile the circuit and generate test proof
./run.sh

## NODEJS
#### generate proof with nodejs
npm run prove  transaction_js/transaction.wasm transaction_js/transaction_final.zkey input.json

#### verify proof with nodejs
npm run verify transaction_js/verification_key.json publicSignals.json proof.json

## SOLIDITY
cd transaction_js

#### generate solidity smart contract
snarkjs zkey export solidityverifier transaction_final.zkey verifier.sol

#### generate test call for solidity smart contract
snarkjs generatecall

## HYPERLEGDGER FABRIC

make sure that the fabrcar.js has the latest vkeys and proofs
copy the modified fabcar.js to the fabric-samples/chaincode/fabcar/javascript/lib

### hyperledger network up from fabric-samples/test-network
cd fabric-samples/test-network
./network.sh up createChannel -c mychannel -ca

### install transfer-basic - not used
( install javascript chaincode asset transfer
 ./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/# 
 chaincode-javascript/ -ccl javascript )

### install javascript chaincode fabcar: chaincode/fabcar/javascript
./network.sh deployCC -ccn fabcar -ccp ../chaincode/fabcar/javascript -ccl javascript


### sending test transaction

export CORE_PEER_TLS_ENABLED=true
export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=$PWD/../config/
export CORE_PEER_LOCALMSPID="Org1MSP"
export PEER0_ORG1_CA=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG1_CA
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051

### test query

peer chaincode query -C mychannel -n fabcar -c '{"Args":["queryAllCars"]}' \
--peerAddresses localhost:7051 --tlsRootCertFiles ./organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt 

### test transaction

peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile /home/dsz/fabric-samples/test-network/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles /home/dsz/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peerAddresses localhost:9051 --tlsRootCertFiles /home/dsz/fabric-samples/test-network/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt -c '{"function":"createCar","Args":["CAR11", "Nissan", "Leaf", "green", "Siobhán"]}'

### query verify

peer chaincode query -C mychannel -n fabcar -c '{"Args":["verify","[\"9183787865242495652088694319607959189948080835728616184486901186122731972696\"]"]}' \
--peerAddresses localhost:7051 --tlsRootCertFiles ./organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt 

### change owner with wrong proof

peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile /home/dsz/fabric-samples/test-network/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles /home/dsz/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peerAddresses localhost:9051 --tlsRootCertFiles /home/dsz/fabric-samples/test-network/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt -c '{"function":"changeCarOwner","Args":["CAR11","Johny","[\"9183787865242495652088694319607959189948080835728616184486901186122731972697\"]"]}'

### change owner with good proof

peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile /home/dsz/fabric-samples/test-network/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles /home/dsz/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peerAddresses localhost:9051 --tlsRootCertFiles /home/dsz/fabric-samples/test-network/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt -c '{"function":"changeCarOwner","Args":["CAR11","Johny","[\"9183787865242495652088694319607959189948080835728616184486901186122731972696\"]"]}'


### shut down fabric
./network.sh down

# prune
docker volume prune