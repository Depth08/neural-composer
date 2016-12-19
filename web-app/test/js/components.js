/**
 * Created by Rafael on 19/12/2016.
 */
/** App component behaviours
 *
 */

NeuralComposer.makeKnob = function(component, task) {
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
};

NeuralComposer.knobEvent = {
    knob: null,
    event: null
};