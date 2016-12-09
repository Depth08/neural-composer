/**
 * Created by Rafael on 1/12/2016.
 */

'use strict';

var NeuralComposer = {
    init: function() {
        // Set Terminal to work
        NeuralComposer.$console = $('#console');

        // Audio init
        NeuralComposer.mixer.gain = NeuralComposer.audioContext.createGain();
        NeuralComposer.mixer.gain.connect(NeuralComposer.audioContext.destination);

        NeuralComposer.mixer.gain.gain.value = 0.5;

        // Midi
        navigator.requestMIDIAccess().then(midi => {
            NeuralComposer.midi = midi;
            NeuralComposer.log('Browser supports MIDI!');

            NeuralComposer.initMidi();
        }, () => NeuralComposer.log('Could not initialize MIDI!'));
    },

    /**
     * MIDI
     */

    midi: null,

    initMidi: function() {
        var inputs = NeuralComposer.midi.inputs.values();

        for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
            input.value.onmidimessage = NeuralComposer.onMidiMessage;
        }
    },

    onMidiMessage: function(msg) {
        // { msg.data[2] > 0 } Some devices don't send stop-notes, but 0-velocity instead
        if (msg.data[0] === 144 && msg.data[2] > 0) NeuralComposer.playNote(msg.data[1]);
        if (msg.data[0] === 128 || msg.data[2] === 0) NeuralComposer.stopNote(msg.data[1]);
    },

    log: function(txt) {
        if (NeuralComposer.$console != null) {
            NeuralComposer.$console.append('<p>' + txt + '</p>');
            NeuralComposer.$console.get(0).scrollTop = NeuralComposer.$console.get(0).scrollHeight;
        }
    },

    playNote: function(note) {
        NeuralComposer.oscillators[note] = NeuralComposer.audioContext.createOscillator();
        NeuralComposer.oscillators[note].type = NeuralComposer.oscillatorType;
        NeuralComposer.oscillators[note].frequency.value = NeuralComposer.convertMidiToFrequency(note);
        NeuralComposer.oscillators[note].connect(NeuralComposer.mixer.gain);
        NeuralComposer.oscillators[note].start();

        if (NeuralComposer.trainingDataModel !== null) {
            $('#midiInputLedForTrainingData').addClass('active');
        }
    },

    stopNote: function(note) {
        NeuralComposer.oscillators[note].stop();
        NeuralComposer.oscillators[note].disconnect();

        if (NeuralComposer.trainingDataModel !== null) {
            $('#midiInputLedForTrainingData').removeClass('active');

            NeuralComposer.trainingDataAction(note);
        }
    },

    /**
     * App specific parameters
     */

    logParameterChanges: false,
    logEvents: true,

    /**
     * Training-data assembler
     */

    trainingData: [{}],
    trainingDataModel: null,

    trainingDataModels: {
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

                NeuralComposer.log('Input note: ' + note);
                NeuralComposer.trainingDataModels[0].logger.logInput(note);

                NeuralComposer.trainingDataAction = NeuralComposer.trainingDataModels[0].outputNote;
            },

            outputNote: function(note) {
                // Not within range
                if (!NeuralComposer.trainingDataModels[0].isNoteWithinRange(note)) {
                    return false;
                }

                NeuralComposer.log('Output note: ' + note);
                NeuralComposer.trainingDataModels[0].logger.logOutput(note);

                NeuralComposer.trainingDataAction = NeuralComposer.trainingDataModels[0].inputNote;
            },

            default: (note) => NeuralComposer.trainingDataModels[0].setBaseNote(note)
        }
    },

    startTrainingData: function(e) {
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
    },

    stopTrainingData: function(e) {
        e.preventDefault();

        NeuralComposer.trainingDataModel = null;

        // Disable Start button, enable stop button
        $('#btnTrainingDataTake').unbind();
        $('#btnTrainingDataSave').attr('disabled', true);
        $('#trainerDataSettings').find('.btn.taster').attr('disabled', true);
        $('#btnTrainingDataStart').attr('disabled', false);

        NeuralComposer.log('Training data collection ended');
    },

    /** App component behaviours
     *
     */

    makeKnob: function(component, task) {
        component.mousedown(function() {
            NeuralComposer.knobEvent.knob = $(this);

            NeuralComposer.knobEvent.event = setInterval(function() {
                var value = NeuralComposer.knobEvent.knob.val();
                var deg = (value * 3) - 150;

                task(value);

                NeuralComposer.logParameterChanges ? NeuralComposer.log('Type value: ' + value) : console.log() ;
                NeuralComposer.knobEvent.knob.parent().find('.rotor').css({'transform': 'rotate(' + deg + 'deg)'});
            }, 30);
        }).mouseup(function() {
            clearInterval(NeuralComposer.knobEvent.event);
        });
    },

    knobEvent: {
        knob: null,
        event: null
    },


    /**
     * WEB Audio
     */

    audioContext: new AudioContext(),

    convertMidiToFrequency: function(note) {
        return Math.pow(2, ((note - 69) / 12)) * NeuralComposer.oscillatorTune;
    },

    oscillatorType: 'sawtooth',
    oscillatorTune: 440,

    oscillators: {},

    mixer: {
        gain: null
    },

    changeOscTuning: function(value) {
        NeuralComposer.oscillatorTune = 440 + ((value - 50) / 2);
    },

    changeGain: function(value) {
        NeuralComposer.mixer.gain.gain.value = value / 100;
    },

    changeOscillatorType: function(value) {
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
    }

};

$(document).ready(function() {
    /* Setup */
    NeuralComposer.init();

    // Init Osc Components
    NeuralComposer.makeKnob($('#oscType'), NeuralComposer.changeOscillatorType);
    NeuralComposer.makeKnob($('#oscDetune'), NeuralComposer.changeOscTuning);
    NeuralComposer.makeKnob($('#oscGain'), NeuralComposer.changeGain);

    // Init Training Data Module
    $('#btnTrainingDataStart').on('click', NeuralComposer.startTrainingData);
    $('#btnTrainingDataStop').on('click', NeuralComposer.stopTrainingData);

/*
    NeuralComposer.log('Starting Synaptic.js...');
    NeuralComposer.log('Creating MLP {12-24-24-12}...');

    var network = new synaptic.Architect.Perceptron(12,24,24,12);

    NeuralComposer.log('Creating trainer for Network...');
    var trainer = new synaptic.Trainer(network);

    NeuralComposer.log('Generating training set for Trainer...');
    var trainingSet = [
        {
            //      C C#D D#E F F#G G#A A#B
            input: [1,0,0,0,0,0,0,0,0,0,0,0],
            output:[0,0,0,0,1,0,0,0,0,0,0,0]
        },
        {
            //      C C#D D#E F F#G G#A A#B
            input: [1,0,0,0,0,0,0,0,0,0,0,0],
            output:[0,0,0,0,0,0,0,1,0,0,0,0]
        },
        {
            //      C C#D D#E F F#G G#A A#B
            input: [0,0,0,0,1,0,0,0,0,0,0,0],
            output:[0,0,0,0,0,0,0,1,0,0,0,0]
        },
        {
            //      C C#D D#E F F#G G#A A#B
            input: [0,0,0,0,0,0,0,1,0,0,0,0],
            output:[1,0,0,0,0,0,0,0,0,0,0,0]
        },
        {
            //      C C#D D#E F F#G G#A A#B
            input: [0,0,0,0,1,0,0,0,0,0,0,0],
            output:[1,0,0,0,0,0,0,0,0,0,0,0]
        },
        {
            //      C C#D D#E F F#G G#A A#B
            input: [0,0,1,0,0,0,1,0,0,0,1,0],
            output:[0,0,0,0,0,0,0,0,0,0,0,0]
        },
        {
            //      C C#D D#E F F#G G#A A#B
            input: [0,0,0,0,0,0,0,0,0,0,0,0],
            output:[0,0,0,0,0,0,0,0,0,0,0,0]
        },
        {
            //      C C#D D#E F F#G G#A A#B
            input: [0,0,0,0,0,0,0,0,0,0,0,0],
            output:[1,0,0,0,0,0,0,0,0,0,0,0]
        },
        {
            //      C C#D D#E F F#G G#A A#B
            input: [0,1,0,0,0,0,0,0,0,0,0,0],
            output:[0,0,0,0,0,1,0,0,0,0,0,0]
        },
        {
            //      C C#D D#E F F#G G#A A#B
            input: [0,0,0,0,0,1,0,0,0,0,0,0],
            output:[0,0,0,0,0,0,0,0,0,1,0,0]
        }
    ];

    trainer.trainAsync(trainingSet,{
        rate: 0.001,
        iterations: 50000,
        error: 0.05,
        shuffle: true,
        schedule: {
            every: 100,
            do: function(data) {
                NeuralComposer.log('Current Error: ' + data.error);
            }
        },
        cost: synaptic.Trainer.cost.CROSS_ENTROPY()
    }).then(results => console.log('done', results));

*/
});