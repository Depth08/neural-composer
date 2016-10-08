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
	public MidiInputCallback
{
public:
    //==============================================================================
    MainContentComponent();
    ~MainContentComponent();

    void paint (Graphics&) override;
    void resized() override;

	void handleIncomingMidiMessage(MidiInput* source, const MidiMessage& message) override;

private:
    //==============================================================================
	JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(MainContentComponent);

	String labelCentreText = "No MIDI strokes yet!";
	Colour backgroundColor = Colour(0xff222222);

	AudioDeviceManager deviceManager;
	TextEditor midiLogger;

	int lastInputIndex;

	void setMidiInput(int index);
};


#endif  // MAINCOMPONENT_H_INCLUDED
