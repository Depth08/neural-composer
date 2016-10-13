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

	this->comboBoxMidiDevices.setTextWhenNoChoicesAvailable("No MIDI devices available");
	addAndMakeVisible(this->comboBoxMidiDevices);

	// Get all devices
	const StringArray inputDevices(MidiInput::getDevices());
	comboBoxMidiDevices.addItemList(inputDevices, 1);
	comboBoxMidiDevices.addListener(this);

	bool found = false;

	// Iterate over devices and grab one that is enabled
	for (int i = 0; i < inputDevices.size(); ++i)
	{
		if (deviceManager.isMidiInputEnabled(inputDevices[i]))
		{
			setMidiInput(i);
			break;
		}
	}

	if (comboBoxMidiDevices.getSelectedId() == 0)
	{
		setMidiInput(0);
	}
}

MainContentComponent::~MainContentComponent()
{
}

void MainContentComponent::paint (Graphics& g)
{
    g.fillAll (Colour (0xff6202e0));
}

void MainContentComponent::resized()
{
	comboBoxMidiDevices.setBounds(20, 20, this->getWidth() - 40, 30);
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
	comboBoxMidiDevices.setSelectedId(index + 1, dontSendNotification);

	this->repaint();

	lastInputIndex = index;
}

void MainContentComponent::handleIncomingMidiMessage(MidiInput * source, const MidiMessage & message)
{

}

void MainContentComponent::prepareToPlay(int samplesPerBlockExpected, double sampleRate)
{
	currentSampleRate = sampleRate;
	updateAngleDelta();
}

void MainContentComponent::releaseResources()
{
}

void MainContentComponent::getNextAudioBlock(const AudioSourceChannelInfo & bufferToFill)
{
}

void MainContentComponent::updateAngleDelta()
{

}

void MainContentComponent::comboBoxChanged(ComboBox * box)
{

}
