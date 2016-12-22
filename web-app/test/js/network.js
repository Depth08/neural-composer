/**
 * Created by Rafael on 20/12/2016.
 */
NeuralComposer.startListening = function(e) {
    e.preventDefault();

    NeuralComposer.listenForNotes = true;
    NeuralComposer.networkAction = NeuralComposer.networkActions[NeuralComposer.network.dataModel].default;

    $('#btnNetworkStop').attr('disabled', false);
    $('#btnNetworkStart').attr('disabled', true);
};

NeuralComposer.stopListening = function(e) {
    e.preventDefault();

    $('#btnNetworkStop').attr('disabled', true);
    $('#btnNetworkStart').attr('disabled', false);
    $('#btnNetworkReply').attr('disabled', true);
};

NeuralComposer.replyNetwork = function(e) {
    e.preventDefault();

    var response = NeuralComposer.networkActions[NeuralComposer.network.dataModel].activate(NeuralComposer.networkActions.humanInput);

    NeuralComposer.networkActions[NeuralComposer.network.dataModel].outputToMidi(response);

    $(this).attr('disabled', true);
};

NeuralComposer.newNetwork = function(e) {
    e.preventDefault();

    var dataModelIndex = $('#networkDataModel').val();

    // Check the option selected
    NeuralComposer.network = NeuralComposer.networks[dataModelIndex]();
    NeuralComposer.network.dataModel = dataModelIndex;
    $('#btnStartTraining').attr('disabled', false);
    $('#btnNetworkSave').attr('disabled', false);
};

NeuralComposer.networks = {
    // Primitive Octave
    'Primitive Octave': function() {
        NeuralComposer.log('Creating MLP {12-24-24-12}...');
        return new synaptic.Architect.Perceptron(12,24,24,12);
    },
    'Optimized 8-fingered': function() {
        NeuralComposer.log('Creating MLP {8-24-24-8}...');
        return new synaptic.Architect.Perceptron(8,24,24,8);
    }
};

NeuralComposer.networkActions = {
    humanInput: [],
    'Primitive Octave': {
        activate: function(input) {
            return NeuralComposer.network.activate(input);
        },

        outputToMidi: function(output) {
            var indexOfMaxValue = output.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
            var midi = NeuralComposer.networkActions['Primitive Octave'].baseNote + indexOfMaxValue;

            NeuralComposer.playNote(midi);
            setTimeout(() => NeuralComposer.stopNote(midi), 500);
        },

        baseNote: -1,

        default: function(note) {
            NeuralComposer.log('Base-note selected: ' + note);

            NeuralComposer.networkActions['Primitive Octave'].baseNote = note;

            NeuralComposer.networkAction = NeuralComposer.networkActions['Primitive Octave'].inputNote;
        },

        isNoteWithinRange: function(note) {
            if (note >= NeuralComposer.networkActions['Primitive Octave'].baseNote && note < NeuralComposer.networkActions['Primitive Octave'].baseNote + 12) {
                return true;
            }
            else {
                NeuralComposer.log('The note: ' + note + ' is not within expected range!');
                return false;
            }
        },

        inputNote: function(note) {
            // Not within range
            if (!NeuralComposer.networkActions['Primitive Octave'].isNoteWithinRange(note)) {
                return false;
            }

            NeuralComposer.log('Input note: ' + note);

            var result = [0,0,0,0,0,0,0,0,0,0,0,0];
            var bn = NeuralComposer.networkActions['Primitive Octave'].baseNote;
            result[note - bn] = 1;

            NeuralComposer.networkActions.humanInput = result;

            $('#btnNetworkReply').attr('disabled', false);
        }
    },
    'Optimized 8-fingered': {
        activate: function(input) {
            while(input.length < 8) {
                input.push(0);
            }

            return NeuralComposer.network.activate(NeuralComposer.networkActions.humanInput);
        },

        outputNotes: [],

        outputToMidi: function(output) {
            for(var i = 0; i < output.length; i++) {
                if (Math.round(output[i], 2) != 0) {
                    var midi = Math.round(output[i] * 88);
                    console.log(midi);
                    NeuralComposer.playNote(midi);
                    NeuralComposer.networkActions['Optimized 8-fingered'].outputNotes.push(midi);
                }
            }

            setTimeout(() => {
                for (var i = 0; i < NeuralComposer.networkActions['Optimized 8-fingered'].outputNotes.length; i++) {
                    NeuralComposer.stopNote(NeuralComposer.networkActions['Optimized 8-fingered'].outputNotes[i]);
                }

                NeuralComposer.networkActions['Optimized 8-fingered'].outputNotes = [];
                NeuralComposer.networkActions.humanInput = [];
            }, 500);
        },

        checkNoteInSet: function(note) {
            for (var i = 0; i < NeuralComposer.networkActions['Optimized 8-fingered'].humanInput.length; i++) {
                console.log(note / 88);
                console.log(NeuralComposer.networkActions['Optimized 8-fingered'].humanInput[i]);
                if (note / 88 == NeuralComposer.networkActions['Optimized 8-fingered'].humanInput[i]) return { inSet: true, index: i};
            }

            return { inSet: false };
        },

        inputNote: function(note) {
            var noteInSet = NeuralComposer.networkActions['Optimized 8-fingered'].checkNoteInSet(note);

            console.log(noteInSet);

            if (noteInSet.inSet) {
                // Remove that note and notify
                NeuralComposer.networkActions['Optimized 8-fingered'].humanInput.splice(noteInSet.index, 1);
                NeuralComposer.log('Removed note ' + note + ' from set. Current set size: ' + NeuralComposer.networkActions['Optimized 8-fingered'].humanInput.length);
            }
            else if (NeuralComposer.networkActions['Optimized 8-fingered'].humanInput.length < 8) {
                NeuralComposer.networkActions['Optimized 8-fingered'].humanInput.push(note / 88);
                NeuralComposer.log('Added note ' + note + ' to set.  Current set size: ' + NeuralComposer.networkActions['Optimized 8-fingered'].humanInput.length);
            }
            else {
                NeuralComposer.log('This set is full, remove other notes before making new ones');
            }

            // Always sort from low to high
            NeuralComposer.networkActions['Optimized 8-fingered'].humanInput.sort(function(a,b) {
                return a - b;
            });

            console.log(NeuralComposer.networkActions['Optimized 8-fingered'].humanInput);

            $('#btnNetworkReply').attr('disabled', false);
        },

        default: function() {
            NeuralComposer.networkActions['Optimized 8-fingered'].humanInput = [];

            NeuralComposer.networkAction = NeuralComposer.networkActions['Optimized 8-fingered'].inputNote;
            NeuralComposer.log('Next note is start of your set. Repeat note to remove it. Reply to get response for current set');
        }
    }
};