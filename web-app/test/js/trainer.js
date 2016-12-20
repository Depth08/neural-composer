/**
 * Created by Rafael on 20/12/2016.
 */

NeuralComposer.changeError = function(value) {
    NeuralComposer.error = value / 1000;
    NeuralComposer.log('Current minimum error: ' + NeuralComposer.error);
};

NeuralComposer.changeLearningRate = function(value) {
    NeuralComposer.rate = value / 10000.00000;
    NeuralComposer.log('Current learning rate: ' + NeuralComposer.rate);
};

NeuralComposer.changeDelay = function(value) {
    NeuralComposer.delay = value / 100;
    NeuralComposer.log('Current delay: ' + NeuralComposer.delay);
};

NeuralComposer.costFunctions = {
    'Cross Entropy': synaptic.Trainer.cost.CROSS_ENTROPY,
    'MSE': synaptic.Trainer.cost.MSE,
    'Binary': synaptic.Trainer.cost.BINARY
};

NeuralComposer.startTraining = function(e) {
    e.preventDefault();

    if (NeuralComposer.trainingData.length < 2) {
        return NeuralComposer.log('Cannot train, no training data!');
    }

    NeuralComposer.log('Creating trainer for Network...');
    var trainer = new synaptic.Trainer(NeuralComposer.network);

    var selectedCost = $('#costFunction').val();

    NeuralComposer.log('Starting training...');
    trainer.trainAsync(NeuralComposer.trainingData,{
        rate: NeuralComposer.rate,
        iterations: 10000,
        error: NeuralComposer.error,
        shuffle: true,
        schedule: {
            every: 5,
            do: function(data) {
                NeuralComposer.log('Iteration ' + data.iterations + ' Current Error: ' + data.error);
            }
        },
        cost: NeuralComposer.costFunctions[selectedCost]
    }).then(results => {
        console.log('done', results);

        console.log(NeuralComposer.network.activate([1,0,0,0,0,0,0,0,0,0,0,0]));
        $('#btnNetworkStart').attr('disabled', false);
        $('#btnNetworkSave').attr('disabled', false);
    });
};