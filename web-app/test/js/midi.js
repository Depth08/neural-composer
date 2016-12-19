/**
 * Created by Rafael on 19/12/2016.
 */

/**
 * MIDI
 */

NeuralComposer.midi = null;

NeuralComposer.initMidi = function() {
    var inputs = NeuralComposer.midi.inputs.values();

    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        input.value.onmidimessage = NeuralComposer.onMidiMessage;
    }
};

NeuralComposer.onMidiMessage = function(msg) {
    // { msg.data[2] > 0 } Some devices don't send stop-notes, but 0-velocity instead
    if (msg.data[0] === 144 && msg.data[2] > 0) NeuralComposer.playNote(msg.data[1]);
    if (msg.data[0] === 128 || msg.data[2] === 0) NeuralComposer.stopNote(msg.data[1]);
};

NeuralComposer.playNote = function(note) {
    NeuralComposer.oscillators[note] = NeuralComposer.audioContext.createOscillator();
    NeuralComposer.oscillators[note].type = NeuralComposer.oscillatorType;
    NeuralComposer.oscillators[note].frequency.value = NeuralComposer.convertMidiToFrequency(note);
    NeuralComposer.oscillators[note].connect(NeuralComposer.mixer.gain);
    NeuralComposer.oscillators[note].start();

    if (NeuralComposer.trainingDataModel !== null) {
        $('#midiInputLedForTrainingData').addClass('active');
    }
};

NeuralComposer.stopNote = function(note) {
    NeuralComposer.oscillators[note].stop();
    NeuralComposer.oscillators[note].disconnect();

    if (NeuralComposer.trainingDataModel !== null) {
        $('#midiInputLedForTrainingData').removeClass('active');

        NeuralComposer.trainingDataAction(note);
    }
};
