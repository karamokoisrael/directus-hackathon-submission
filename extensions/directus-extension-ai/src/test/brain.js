const brain = require("brain.js");
const net = new brain.NeuralNetwork({hiddenLayers :[3]});
const _Data = [
    {input : [0,0], output: [0]},
    {input : [0,1], output: [1]},
    {input : [1,0], output: [1]},
    {input : [1,1], output: [0]}
];

net.train(_Data);
console.log(net.run([0,0]));
console.log(net.run([0,1]));
console.log(net.run([1,0]));
console.log(net.run([0,0]));
console.log(brain);