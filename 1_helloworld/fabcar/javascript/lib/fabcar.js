/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const snarkjs = require("snarkjs");

const vkeys = {
    "protocol": "plonk",
    "curve": "bn128",
    "nPublic": 2,
    "power": 3,
    "k1": "2",
    "k2": "3",
    "Qm": [
     "18185127353387430320222682987787323667337463309573604480360441523553328955732",
     "20209797412358821379519240058038025645545839378426129804888592289281842423006",
     "1"
    ],
    "Ql": [
     "12399914769397959643457964431136944886168919683855089483595085618801263003471",
     "6290793280771518392850136852875675640526864962481613332739557974908478491124",
     "1"
    ],
    "Qr": [
     "20876666289088858716093222600970392153018229707217071578590635944423903048964",
     "3189686083721655034243787735346831498193085675850848759659644193568433359963",
     "1"
    ],
    "Qo": [
     "18185127353387430320222682987787323667337463309573604480360441523553328955732",
     "1678445459480453842727165687219249443150471778871693857800445605363383785577",
     "1"
    ],
    "Qc": [
     "0",
     "1",
     "0"
    ],
    "S1": [
     "2586955120752081005912757095543999673027163714191961344802099547031106134782",
     "3833101857040730157445874239656607853489530318461912653927597869155228329533",
     "1"
    ],
    "S2": [
     "607331817284325149896985741991576795894961766983177022728990044229351869174",
     "10985685002344537346342765239172770006609765252060002170001158874760546689922",
     "1"
    ],
    "S3": [
     "15766325462208880481428685586620152503724300150225599738597202023570183828011",
     "17414068808144696627765552218182202958300331426742130735252528157862963269830",
     "1"
    ],
    "X_2": [
     [
      "5479300833911078321560501259526144492243244659157718039834952072517236798742",
      "7051072430270357621794925166002741942987583377228923348711602087969738572007"
     ],
     [
      "16800466630691268956199786034125280622044718111544448700470380291867032705566",
      "6390584024428087060904851840831992269614322261674278670789998192383268725772"
     ],
     [
      "1",
      "0"
     ]
    ],
    "w": "19540430494807482326159819597004422086093766032135589407132600596362845576832"
   };

   const proof = {
    "A": [
     "5017039250090352133918562823028354213194073190417243236551316853355503047987",
     "13229149441695449279668419657473810615670027469360340500635261430359408995654",
     "1"
    ],
    "B": [
     "17720854319528316726061679890915298490668169438801708012455342986682115000116",
     "685537388525036407427568014947869330880993806309032177557609015217274587587",
     "1"
    ],
    "C": [
     "3483089879483921777598804541629309065222509744838010445521900627835088805434",
     "1240710878770879089352625353415414707410110388633217308050269966425480416060",
     "1"
    ],
    "Z": [
     "2674813925800400163788565740157078059358786418788912195744508029455994824111",
     "4046756474513842887181776493302481365951472883131190646030321485616457780675",
     "1"
    ],
    "T1": [
     "8167657167655931657742433242949154355419629093290572736447092749365477909753",
     "5908248308605927508966001591979726850654843351087594102233645354929894865909",
     "1"
    ],
    "T2": [
     "8018075851035069356003934884535063156998324538200781048414520671797455730023",
     "3975446446996218671360013858224497076858215167112775167513128143567434722792",
     "1"
    ],
    "T3": [
     "12795957342786240752918703041978334429304751128328892506690781575932005775685",
     "7945545485393502384480963747993610565139736165081087290009708015272227486502",
     "1"
    ],
    "Wxi": [
     "21537293514970718614881348252288685515281946067793565655264534419528667712330",
     "8081413043501545272433482280561801838906838232190001399349484787653408586374",
     "1"
    ],
    "Wxiw": [
     "13471281086269649560586441611830857459963208190774698693214760839865041726474",
     "6281094358550459893588846724517853191034047855520011488401136088659980515018",
     "1"
    ],
    "eval_a": "2229401822305033093895123218217733129536197276759722321472817377392837518730",
    "eval_b": "4772426097782301763359495859589767737802440849905766134439528957522544922870",
    "eval_c": "20730127683937496123818535223330088658470026913114114847752381160187225232229",
    "eval_s1": "17451025999670607174514949699513913011775144411858385809540590585553800219406",
    "eval_s2": "4575373612383268394132464043446199855169276582447226051145860422693112617116",
    "eval_zw": "2082666821225766961536974150906185738241704353656065268257372092932864020982",
    "protocol": "plonk",
    "curve": "bn128"
   };

class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const cars = [
            {
                color: 'blue',
                make: 'Toyota',
                model: 'Prius',
                owner: 'Tomoko',
            },
            {
                color: 'red',
                make: 'Ford',
                model: 'Mustang',
                owner: 'Brad',
            },
            {
                color: 'green',
                make: 'Hyundai',
                model: 'Tucson',
                owner: 'Jin Soo',
            },
            {
                color: 'yellow',
                make: 'Volkswagen',
                model: 'Passat',
                owner: 'Max',
            },
            {
                color: 'black',
                make: 'Tesla',
                model: 'S',
                owner: 'Adriana',
            },
            {
                color: 'purple',
                make: 'Peugeot',
                model: '205',
                owner: 'Michel',
            },
            {
                color: 'white',
                make: 'Chery',
                model: 'S22L',
                owner: 'Aarav',
            },
            {
                color: 'violet',
                make: 'Fiat',
                model: 'Punto',
                owner: 'Pari',
            },
            {
                color: 'indigo',
                make: 'Tata',
                model: 'Nano',
                owner: 'Valeria',
            },
            {
                color: 'brown',
                make: 'Holden',
                model: 'Barina',
                owner: 'Shotaro',
            },
        ];

        for (let i = 0; i < cars.length; i++) {
            cars[i].docType = 'car';
            await ctx.stub.putState('CAR' + i, Buffer.from(JSON.stringify(cars[i])));
            console.info('Added <--> ', cars[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryCar(ctx, carNumber) {
        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        console.log(carAsBytes.toString());
        return carAsBytes.toString();
    }

    async createCar(ctx, carNumber, make, model, color, owner) {
        console.info('============= START : Create Car ===========');

        const car = {
            color,
            docType: 'car',
            make,
            model,
            owner,
        };

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : Create Car ===========');
    }

    async queryAllCars(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeCarOwner(ctx, carNumber, newOwner, inputs) {
        console.info('============= START : changeCarOwner ===========');
        const verify = await this.verify(ctx,inputs);
        if(!verify){
            throw new Error(`UNAUTHORIZED`);
        }

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.owner = newOwner;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }
    
    async verify(ctx, inputs) {
        console.log("verify");
        console.info("INPUT : ", inputs);
        console.info("vkeys : ", vkeys);
        console.info("proof : ", proof);
        console.info("snarkjs : ", snarkjs);
        const inputsJSON = JSON.parse(inputs);
        const result = await snarkjs.plonk.verify(vkeys, inputsJSON, proof);
        console.info(result);
        return result;
    }


}

module.exports = FabCar;
