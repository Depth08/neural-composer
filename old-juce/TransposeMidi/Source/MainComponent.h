/*
  ==============================================================================

    This file was auto-generated!

  ==============================================================================
*/

#ifndef MAINCOMPONENT_H_INCLUDED
#define MAINCOMPONENT_H_INCLUDED

#include "../JuceLibraryCode/JuceHeader.h"


//==============================================================================
/*
    This component lives inside our window, and this is where you should put all
    your controls and content.
*/
class MainContentComponent
	: public Component,
	private ComboBox::Listener,
	private MidiKeyboardStateListener,
	private MidiInputCallback
{
public:
    //==============================================================================
    MainContentComponent();
    ~MainContentComponent();

    void paint (Graphics&) override;
    void resized() override;

private:
    //==============================================================================
	JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(MainContentComponent);

	// GUI Components
	ComboBox comboBoxDevices;
	Slider sliderTransposeStep;
	MidiKeyboardState virtualKeyboardState; // Backend part of the GUI keyboard
	MidiKeyboardComponent virtualKeyboard;
	AudioDeviceManager midiDeviceManager;
	String currentDevice;

	void comboBoxChanged(ComboBox *comboBoxThatHasChanged) override;

	void handleNoteOn(MidiKeyboardState *source, int midiChannel, int midiNoteNumber, float velocity) override;
	void handleNoteOff(MidiKeyboardState *source, int midiChannel, int midiNoteNumber, float velocity) override;

	void handleIncomingMidiMessage(MidiInput *source, const MidiMessage &message) override;

	void refreshMidiInputsAndPushToList(ComboBox* list);
	void setInputDevice(const String newDevice);

	MidiMessage transposeMidiMessage(const MidiMessage& message);
};


#endif  // MAINCOMPONENT_H_INCLUDED
