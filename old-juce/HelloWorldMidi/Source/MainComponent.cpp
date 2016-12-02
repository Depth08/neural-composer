/*
  ==============================================================================

    This file was auto-generated!

  ==============================================================================
*/

#include "MainComponent.h"
#include "IncomingMessageCallback.h"


//==============================================================================
MainContentComponent::MainContentComponent()
{
    setSize (600, 400);

	// Combo Box
	addAndMakeVisible(comboBoxMidiList);
	comboBoxMidiList.setTextWhenNoChoicesAvailable("No devices found!");

	lastInputIndex = 0;

	// Get all devices
	const StringArray inputDevices(MidiInput::getDevices());
	comboBoxMidiList.addItemList(inputDevices, 1);
	comboBoxMidiList.addListener(this);

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

	if (comboBoxMidiList.getSelectedId() == 0)
	{
		setMidiInput(0);
	}
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
	this->comboBoxMidiList.setBounds(20, 20, getWidth() - 40, 30);
}

void MainContentComponent::handleIncomingMidiMessage(MidiInput * source, const MidiMessage & message)
{
	(new IncomingMessageCallback(this, message, source->getName()))->post();
}

void MainContentComponent::updateMessageText(const MidiMessage & message, const String & source)
{
	const String description(getMidiMessageDescription(message));

	labelCentreText = description;
	repaint();
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
	comboBoxMidiList.setSelectedId(index + 1, dontSendNotification);

	labelCentreText = "Selected: " + list[index];
	this->repaint();

	lastInputIndex = index;
}

void MainContentComponent::comboBoxChanged(ComboBox * box)
{
	if (box == &comboBoxMidiList)
	{
		setMidiInput(comboBoxMidiList.getSelectedItemIndex());
	}
}
