/*
  ==============================================================================

    This file was auto-generated!

  ==============================================================================
*/

#include "MainComponent.h"


//==============================================================================
MainContentComponent::MainContentComponent()
{
    setSize (600, 400);

	lastInputIndex = 0;

	// Get all devices
	const StringArray inputDevices(MidiInput::getDevices());
	bool found = false;
	
	// Iterate over devices and grab one that is enabled
	for (int i = 0; i < inputDevices.size(); ++i)
	{
		if (deviceManager.isMidiInputEnabled(inputDevices[i]))
		{
			setMidiInput(i);
			found = true;
			break;
		}
	}

	if (!found) this->labelCentreText = "No devices found!";
}

MainContentComponent::~MainContentComponent()
{
}

void MainContentComponent::paint (Graphics& g)
{
    g.fillAll (this->backgroundColor);

    g.setFont (Font (16.0f));
    g.setColour (Colours::azure);
    g.drawText (labelCentreText, getLocalBounds(), Justification::centred, true);
}

void MainContentComponent::resized()
{
    // This is called when the MainContentComponent is resized.
    // If you add any child components, this is where you should
    // update their positions.

	this->backgroundColor = Colour((getWidth() / 1092.0) * 255, 50, 100);
}

void MainContentComponent::handleIncomingMidiMessage(MidiInput * source, const MidiMessage & message)
{
	labelCentreText = "Pressed: " + message.getNoteNumber();
}

void MainContentComponent::setMidiInput(int index)
{
	// Get the same list? Not DRY?! Will figure this out later
	const StringArray list(MidiInput::getDevices());

	deviceManager.removeMidiInputCallback(list[this->lastInputIndex], this);

	const String newInput(list[index]);

	if (!deviceManager.isMidiInputEnabled(newInput))
	{
		deviceManager.setMidiInputEnabled(newInput, true);
	}

	deviceManager.addMidiInputCallback(newInput, this);

	lastInputIndex = index;
}