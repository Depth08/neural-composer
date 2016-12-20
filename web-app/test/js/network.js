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

    var response = NeuralComposer.network.activate(NeuralComposer.networkActions.humanInput);

    var midi = NeuralComposer.networkActions[NeuralComposer.network.dataModel].outputToMidi(response);
    console.log('midi: ' + midi);

    NeuralComposer.playNote(midi);

    setTimeout(() => NeuralComposer.stopNote(midi), 500);

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
    }
};

NeuralComposer.networkActions = {
    humanInput: [],
    'Primitive Octave': {
        outputToMidi: function(output) {
            var indexOfMaxValue = output.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
            console.log('index of max is: '+ indexOfMaxValue);

            return NeuralComposer.networkActions['Primitive Octave'].baseNote + indexOfMaxValue;
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
    }
};