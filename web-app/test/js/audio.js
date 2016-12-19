/**
 * Created by Rafael on 19/12/2016.
 */
/**
 * WEB Audio
 */

NeuralComposer.audioContext = new AudioContext();

NeuralComposer.convertMidiToFrequency = function(note) {
    return Math.pow(2, ((note - 69) / 12)) * NeuralComposer.oscillatorTune;
};

// Defaults
NeuralComposer.oscillatorType = 'sawtooth';
NeuralComposer.oscillatorTune = 440; // Standard Concert Pitch

NeuralComposer.oscillators = {};

NeuralComposer.mixer = {
    gain: null
};

NeuralComposer.changeOscTuning = function(value) {
    NeuralComposer.oscillatorTune = 440 + ((value - 50) / 2);
};

NeuralComposer.changeGain = function(value) {
    NeuralComposer.mixer.gain.gain.value = value / 100;
};

NeuralComposer.changeOscillatorType = function(value) {
    if (value < 25) {
        // Set Sine wave
        NeuralComposer.oscillatorType = 'sine';
        $('.oscillator .screen img').attr('src','img/sine.svg');
    }
    else if (value < 50) {
        NeuralComposer.oscillatorType = 'triangle';
        $('.oscillator .screen img').attr('src','img/triangle.svg');
    }
    else if (value < 75) {
        NeuralComposer.oscillatorType = 'sawtooth';
        $('.oscillator .screen img').attr('src','img/saw.svg');
    }
    else {
        NeuralComposer.oscillatorType = 'square';
        $('.oscillator .screen img').attr('src','img/square.svg');
    }
};