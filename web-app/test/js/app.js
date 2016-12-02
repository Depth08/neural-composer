/**
 * Created by Rafael on 1/12/2016.
 */

'use strict';

var NeuralComposer = {
    init: function() {
        // Set UI init
        $('input').val(0);

        // Set Terminal to work
        NeuralComposer.$console = $('#console');

        // Set neural network
        NeuralComposer.network = null;

        // Set Audio
        NeuralComposer.audioContext = new AudioContext();
        NeuralComposer.oscillators.oscOne = NeuralComposer.audioContext.createOscillator();
        NeuralComposer.mixer.gain = NeuralComposer.audioContext.createGain();
        NeuralComposer.mixer.panning = NeuralComposer.audioContext.createPanner();

        NeuralComposer.oscillators.oscOne.type = 'sine';

        NeuralComposer.oscillators.oscOne.connect(NeuralComposer.audioContext.destination);

        //NeuralComposer.oscillators.oscOne.start();

        if (navigator.requestMIDIAccess) {
            NeuralComposer.log('Browser supports MIDI!');
        }
        else {
            NeuralComposer.log('Browser does not support MIDI! Use Google Chrome 38+');
        }
    },

    log: function(txt) {
        if (NeuralComposer.$console != null) {
            NeuralComposer.$console.append('<p>' + txt + '</p>');
            NeuralComposer.$console.get(0).scrollTop = NeuralComposer.$console.get(0).scrollHeight;
        }
    },

    logParameterChanges: true,
    logEvents: true,

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

    audioContext: null,

    oscillators: {
        oscOne: null,
        oscTwo: null
    },

    mixer: {
        gain: null,
        panning: null
    },

    controlOscOneType: function(value) {
        if (value < 25) {
            // Set Sine wave
            NeuralComposer.oscillators.oscOne.type = 'sine';
            $('.oscillator .screen img').attr('src','img/sine.svg');
        }
        else if (value < 50) {
            NeuralComposer.oscillators.oscOne.type = 'triangle';
            $('.oscillator .screen img').attr('src','img/triangle.svg');
        }
        else if (value < 75) {
            NeuralComposer.oscillators.oscOne.type = 'sawtooth';
            $('.oscillator .screen img').attr('src','img/saw.svg');
        }
        else {
            NeuralComposer.oscillators.oscOne.type = 'square';
            $('.oscillator .screen img').attr('src','img/square.svg');
        }
    }


};

$(document).ready(function() {
    /* Setup */
    NeuralComposer.init();

    NeuralComposer.makeKnob($('#oscOneType'), NeuralComposer.controlOscOneType);

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