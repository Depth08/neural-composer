/**
 * Created by Rafael on 19/12/2016.
 */
/**
 * Training-data assembler
 */
NeuralComposer.trainingData = [{}];
NeuralComposer.trainingDataModel = null;

NeuralComposer.checkIfDataValid = function(trainingData) {
    try {
        parsedData = JSON.parse(trainingData);

        console.log(parsedData);

        parsedData.forEach(function(entry, i) {
            // An entry contains ONLY inputs and outputs, nothing in between is allowed!
            var keys = Object.keys(entry);
            if (!(keys.length <= 2 && keys.includes('input') && keys.includes('output'))) throw new Error('Data contains more properties, or does not have { inputs: & outputs: } at entry: ' + (i+1));

            // Check length conformity
            if (entry.input.length !== entry.output.length) throw new Error('Data length mismatch -> input vs output at entry '+ (i+1));
        });

        return true;
    }
    catch (err) {
        NeuralComposer.log('File loading interrupted: ' + err.message);
    }
};

NeuralComposer.trainingDataModels = {
    'Primitive Octave': {
        baseNote: -1,

        isNoteWithinRange: function(note) {
            if (note >= NeuralComposer.trainingDataModels['Primitive Octave'].baseNote && note < NeuralComposer.trainingDataModels['Primitive Octave'].baseNote + 12) {
                return true;
            }
            else {
                NeuralComposer.log('The note: ' + note + ' is not within expected range!');
                return false;
            }
        },

        setBaseNote: function(note) {
            NeuralComposer.log('Base-note selected: ' + note);

            NeuralComposer.trainingDataModels['Primitive Octave'].baseNote = note;

            NeuralComposer.trainingDataAction = NeuralComposer.trainingDataModels['Primitive Octave'].inputNote;
        },

        logger: {
            formatData: function(note) {
                var result = [0,0,0,0,0,0,0,0,0,0,0,0];

                var bn = NeuralComposer.trainingDataModels['Primitive Octave'].baseNote;

                result[note - bn] = 1;

                return result;
            },

            logInput: function(note) {
                NeuralComposer.trainingData[NeuralComposer.trainingData.length - 1].input = NeuralComposer.trainingDataModels['Primitive Octave'].logger.formatData(note);

                console.log(NeuralComposer.trainingData);
            },

            logOutput: function(note) {
                NeuralComposer.trainingData[NeuralComposer.trainingData.length - 1].output = NeuralComposer.trainingDataModels['Primitive Octave'].logger.formatData(note);

                // Allow saving if not already allowed
                $('#btnTrainingDataSave').attr('disabled', false);

                console.log(NeuralComposer.trainingData);
            }
        },

        inputNote: function(note) {
            // Not within range
            if (!NeuralComposer.trainingDataModels['Primitive Octave'].isNoteWithinRange(note)) {
                return false;
            }

            NeuralComposer.log('Input note: ' + note + '. Entries in data set: ' + NeuralComposer.trainingData.length);
            NeuralComposer.trainingDataModels['Primitive Octave'].logger.logInput(note);

            NeuralComposer.trainingDataAction = NeuralComposer.trainingDataModels['Primitive Octave'].outputNote;
        },

        outputNote: function(note) {
            // Not within range
            if (!NeuralComposer.trainingDataModels['Primitive Octave'].isNoteWithinRange(note)) {
                return false;
            }

            NeuralComposer.log('Output note: ' + note + '. Entries in data set: ' + NeuralComposer.trainingData.length);

            NeuralComposer.trainingDataModels['Primitive Octave'].logger.logOutput(note);

            NeuralComposer.trainingDataAction = NeuralComposer.trainingDataModels['Primitive Octave'].inputNote;
        },

        default: (note) => NeuralComposer.trainingDataModels['Primitive Octave'].setBaseNote(note)
    },

    'Optimized 8-fingered': {
        noteSet: {
            'input': [],
            'output': []
        },
        setSide: '',

        checkNoteInSet: function(note) {
            for (var i = 0; i < NeuralComposer.trainingDataModels['Optimized 8-fingered'].noteSet[NeuralComposer.trainingDataModels['Optimized 8-fingered'].setSide].length; i++) {
                console.log(note / 88);
                if (note / 88 === NeuralComposer.trainingDataModels['Optimized 8-fingered'].noteSet[NeuralComposer.trainingDataModels['Optimized 8-fingered'].setSide][i]) return { inSet: true, index: i};
            }

            return { inSet: false };
        },

        collectNote: function(note) {
            var noteInSet = NeuralComposer.trainingDataModels['Optimized 8-fingered'].checkNoteInSet(note);

            if (noteInSet.inSet) {
                // Remove that note and notify
                NeuralComposer.trainingDataModels['Optimized 8-fingered'].noteSet[NeuralComposer.trainingDataModels['Optimized 8-fingered'].setSide].splice(noteInSet.index, 1);
                NeuralComposer.log('Removed note ' + note + ' from set. Current set size: ' + NeuralComposer.trainingDataModels['Optimized 8-fingered'].noteSet[NeuralComposer.trainingDataModels['Optimized 8-fingered'].setSide].length);
            }
            else if (NeuralComposer.trainingDataModels['Optimized 8-fingered'].noteSet[NeuralComposer.trainingDataModels['Optimized 8-fingered'].setSide].length < 8) {
                NeuralComposer.trainingDataModels['Optimized 8-fingered'].noteSet[NeuralComposer.trainingDataModels['Optimized 8-fingered'].setSide].push(note / 88);
                NeuralComposer.log('Added note ' + note + ' to ' + NeuralComposer.trainingDataModels['Optimized 8-fingered'].setSide + ' set.  Current set size: ' + NeuralComposer.trainingDataModels['Optimized 8-fingered'].noteSet[NeuralComposer.trainingDataModels['Optimized 8-fingered'].setSide].length);
            }
            else {
                NeuralComposer.log('This set is full, remove other notes before making new ones');
            }

            // Always sort from low to high
            NeuralComposer.trainingDataModels['Optimized 8-fingered'].noteSet[NeuralComposer.trainingDataModels['Optimized 8-fingered'].setSide].sort(function(a,b) {
                return a - b;
            });

            console.log(NeuralComposer.trainingDataModels['Optimized 8-fingered'].noteSet[NeuralComposer.trainingDataModels['Optimized 8-fingered'].setSide]);

            // Log this input
            if (NeuralComposer.trainingDataModels['Optimized 8-fingered'].setSide == 'input') NeuralComposer.trainingDataModels['Optimized 8-fingered'].logger.logInput();
            else NeuralComposer.trainingDataModels['Optimized 8-fingered'].logger.logOutput();

            $('#btnTrainingDataSave').attr('disabled', false);
        },

        setFunctionKeyToInput: function() {
            // Start button turns into IN Button
            $('#btnTrainingDataStart').html('In').attr('disabled',false).unbind().on('click', function(e) {
                e.preventDefault();

                NeuralComposer.trainingDataModels['Optimized 8-fingered'].setSide = 'input';

                NeuralComposer.trainingDataModels['Optimized 8-fingered'].setFunctionKeyToOutput();
            });
        },

        setFunctionKeyToOutput: function() {
            // Start button turns into OUT Button
            $('#btnTrainingDataStart').html('Out').attr('disabled',false).unbind().on('click', function(e) {
                e.preventDefault();

                NeuralComposer.trainingDataModels['Optimized 8-fingered'].setSide = 'output';

                NeuralComposer.trainingDataModels['Optimized 8-fingered'].setFunctionKeyToInput();
            });
        },

        logger: {
            formatData: function(set) {
                var result = [0,0,0,0,0,0,0,0];

                for (var i = 0; i < set.length; i++) {
                    result[i] = set[i];
                }

                return result;
            },

            logInput: function() {
                NeuralComposer.trainingData[NeuralComposer.trainingData.length - 1].input = NeuralComposer.trainingDataModels['Optimized 8-fingered'].logger.formatData(NeuralComposer.trainingDataModels['Optimized 8-fingered'].noteSet.input);
            },

            logOutput: function() {
                NeuralComposer.trainingData[NeuralComposer.trainingData.length - 1].output = NeuralComposer.trainingDataModels['Optimized 8-fingered'].logger.formatData(NeuralComposer.trainingDataModels['Optimized 8-fingered'].noteSet.output);
            }
        },

        default: function() {
            NeuralComposer.log('8-fingered optimized data collection...');
            NeuralComposer.log('Play notes to add them to the set. Switch from input to output set using button');
            NeuralComposer.log('Play a note again to remove it from the set');

            NeuralComposer.trainingDataModels['Optimized 8-fingered'].setFunctionKeyToOutput();

            NeuralComposer.trainingDataModels['Optimized 8-fingered'].setSide = 'input';

            NeuralComposer.trainingDataAction = NeuralComposer.trainingDataModels['Optimized 8-fingered'].collectNote;

            $('#btnTrainingDataSave').on('click', function() {
                NeuralComposer.trainingDataModels['Optimized 8-fingered'].noteSet = {
                    'input': [],
                    'output': []
                }
            });
        }
    }
};

NeuralComposer.startTrainingData = function(e) {
    e.preventDefault();

    NeuralComposer.trainingDataModel = $('#dataModel').find('option:selected');

    // Disable Start button, enable stop button
    $('#btnTrainingDataStart').attr('disabled', true);
    $('#btnClearTrainingData').attr('disabled', true);
    $('#btnTrainingDataStop').attr('disabled', false);

    NeuralComposer.trainingDataAction = NeuralComposer.trainingDataModels[NeuralComposer.trainingDataModel.val()].default;

    // Save button functions
    $('#btnTrainingDataSave').on('click', function(e) {
        e.preventDefault();

        // Save previous by editing a new entry in logger
        NeuralComposer.trainingData.push({});

        if (NeuralComposer.trainingData.length > 1) $('#btnTrainingDataUndo').attr('disabled', false);

        // Save button mustn't work on new incomplete entry
        $('#btnTrainingDataSave').attr('disabled', true);

        console.log(NeuralComposer.trainingData);
    });

    // Undo button functions
    $('#btnTrainingDataUndo').on('click', function(e) {
        e.preventDefault();

        // Save previous by editing a new entry in logger
        NeuralComposer.trainingData.pop();

        if (NeuralComposer.trainingData.length === 0) {
            $('#btnTrainingDataUndo').attr('disabled', true);
            $('#btnTrainingDataSave').attr('disabled', true);

            NeuralComposer.trainingData = [];
            NeuralComposer.trainingData.push({});
            $('#trainingDataLoadedLed').removeClass('active');
        }
    });

    NeuralComposer.log('Listening for training data. Start to play the first note');
};

NeuralComposer.stopTrainingData = function(e) {
    e.preventDefault();

    NeuralComposer.trainingDataModel = null;

    // Disable Start button, enable stop button
    $('#btnTrainingDataSave').attr('disabled', true).unbind();
    $('#trainerDataSettings').find('.btn.taster').attr('disabled', true);
    $('#btnTrainingDataStart').attr('disabled', false).html('Start').unbind().on('click', NeuralComposer.startTrainingData);
    $('#btnClearTrainingData').attr('disabled', false);

    NeuralComposer.log('Training data collection ended');
};