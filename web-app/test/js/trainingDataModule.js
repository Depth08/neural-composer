/**
 * Created by Rafael on 19/12/2016.
 */
/**
 * Training-data assembler
 */
NeuralComposer.trainingData = [{}],
    NeuralComposer.trainingDataModel = null;

    NeuralComposer.trainingDataModels = {
        0: {
            baseNote: -1,

            isNoteWithinRange: function(note) {
                if (note >= NeuralComposer.trainingDataModels[0].baseNote && note < NeuralComposer.trainingDataModels[0].baseNote + 12) {
                    return true;
                }
                else {
                    NeuralComposer.log('The note: ' + note + ' is not within expected range!');
                    return false;
                }
            },

            setBaseNote: function(note) {
                NeuralComposer.log('Base-note selected: ' + note);

                NeuralComposer.trainingDataModels[0].baseNote = note;

                NeuralComposer.trainingDataAction = NeuralComposer.trainingDataModels[0].inputNote;
            },

            logger: {
                formatData: function(note) {
                    var result = [0,0,0,0,0,0,0,0,0,0,0,0];

                    var bn = NeuralComposer.trainingDataModels[0].baseNote;

                    result[note - bn] = 1;

                    return result;
                },

                logInput: function(note) {
                    NeuralComposer.trainingData[NeuralComposer.trainingData.length - 1].input = NeuralComposer.trainingDataModels[0].logger.formatData(note);

                    console.log(NeuralComposer.trainingData);
                },

                logOutput: function(note) {
                    NeuralComposer.trainingData[NeuralComposer.trainingData.length - 1].output = NeuralComposer.trainingDataModels[0].logger.formatData(note);

                    // Allow saving if not already allowed
                    $('#btnTrainingDataSave').attr('disabled', false);

                    console.log(NeuralComposer.trainingData);
                }
            },

            inputNote: function(note) {
                // Not within range
                if (!NeuralComposer.trainingDataModels[0].isNoteWithinRange(note)) {
                    return false;
                }

                NeuralComposer.log('Input note: ' + note + '. Entries in data set: ' + NeuralComposer.trainingData.length);
                NeuralComposer.trainingDataModels[0].logger.logInput(note);

                NeuralComposer.trainingDataAction = NeuralComposer.trainingDataModels[0].outputNote;
            },

            outputNote: function(note) {
                // Not within range
                if (!NeuralComposer.trainingDataModels[0].isNoteWithinRange(note)) {
                    return false;
                }

                NeuralComposer.log('Output note: ' + note + '. Entries in data set: ' + NeuralComposer.trainingData.length);

                NeuralComposer.trainingDataModels[0].logger.logOutput(note);

                NeuralComposer.trainingDataAction = NeuralComposer.trainingDataModels[0].inputNote;
            },

            default: (note) => NeuralComposer.trainingDataModels[0].setBaseNote(note)
        }
    };

NeuralComposer.startTrainingData = function(e) {
    e.preventDefault();

    NeuralComposer.trainingDataModel = $('#dataModel').find('option:selected');

    // Disable Start button, enable stop button
    $('#btnTrainingDataStart').attr('disabled', true);
    $('#btnTrainingDataStop').attr('disabled', false);

    NeuralComposer.trainingDataAction = NeuralComposer.trainingDataModels[NeuralComposer.trainingDataModel.data('model-id')].default;

    // Save button functions
    $('#btnTrainingDataSave').on('click', function(e) {
        e.preventDefault();

        // Save previous by editing a new entry in logger
        NeuralComposer.trainingData.push({});

        if (NeuralComposer.trainingData.length > 1) $('#btnTrainingDataUndo').attr('disabled', false);

        // Save button mustn't work on new incomplete entry
        $('#btnTrainingDataSave').attr('disabled', true);
    });

    // Undo button functions
    $('#btnTrainingDataUndo').on('click', function(e) {
        e.preventDefault();

        // Save previous by editing a new entry in logger
        NeuralComposer.trainingData.pop();

        if (NeuralComposer.trainingData.length === 0) {
            $('#btnTrainingDataUndo').attr('disabled', true);
            $('#btnTrainingDataSave').attr('disabled', true);

            NeuralComposer.trainingData = [{}];
        }
    });

    NeuralComposer.log('Listening for training data. Start to play the first note');
};

NeuralComposer.stopTrainingData = function(e) {
    e.preventDefault();

    NeuralComposer.trainingDataModel = null;

    // Disable Start button, enable stop button
    $('#btnTrainingDataTake').unbind();
    $('#btnTrainingDataSave').attr('disabled', true);
    $('#trainerDataSettings').find('.btn.taster').attr('disabled', true);
    $('#btnTrainingDataStart').attr('disabled', false);

    NeuralComposer.log('Training data collection ended');
};