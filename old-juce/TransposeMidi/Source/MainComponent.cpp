/*
  ==============================================================================

    This file was auto-generated!

  ==============================================================================
*/

#include "MainComponent.h"


//==============================================================================
MainContentComponent::MainContentComponent()
	: virtualKeyboard(this->virtualKeyboardState, MidiKeyboardComponent::horizontalKeyboard)
{
    setSize (600, 200);

	addAndMakeVisible(comboBoxDevices);
	addAndMakeVisible(virtualKeyboard);
	addAndMakeVisible(sliderTransposeStep);

	// Prepare gui components
	this->comboBoxDevices.setTextWhenNoChoicesAvailable("No Hardware Devices Available");
	this->comboBoxDevices.setTextWhenNothingSelected("Select device to get started");
	
	this->sliderTransposeStep.setEnabled(false);
	this->sliderTransposeStep.setSliderStyle(Slider::LinearHorizontal);
	this->sliderTransposeStep.setRange(0, 12, 1);

	// Let this component listen for changes in the virtual Midi Keyboard
	this->virtualKeyboardState.addListener(this);

	// Populate comboBox list with connected MIDI devices
	refreshMidiInputsAndPushToList(&this->comboBoxDevices);
	this->comboBoxDevices.addListener(this); // Listen for changes
}

MainContentComponent::~MainContentComponent()
{
}

void MainContentComponent::paint (Graphics& g)
{
    g.fillAll (Colour (0xff890099));
}

void MainContentComponent::resized()
{
	Rectangle<int> screenSpace(this->getBounds());

	this->comboBoxDevices.setBounds(screenSpace.removeFromTop(50).reduced(10));
	this->virtualKeyboard.setBounds(screenSpace.removeFromTop(100).reduced(10));
	this->sliderTransposeStep.setBounds(screenSpace.removeFromTop(50).reduced(10));
}

void MainContentComponent::comboBoxChanged(ComboBox * comboBoxThatHasChanged)
{
	if (comboBoxThatHasChanged == &this->comboBoxDevices)
	{
		int selectedIndex = comboBoxDevices.getSelectedItemIndex();

		setInputDevice(comboBoxDevices.getItemText(selectedIndex));
	}
}

void MainContentComponent::handleNoteOn(MidiKeyboardState * source, int midiChannel, int midiNoteNumber, float velocity)
{
}

void MainContentComponent::handleNoteOff(MidiKeyboardState * source, int midiChannel, int midiNoteNumber, float velocity)
{
}

void MainContentComponent::handleIncomingMidiMessage(MidiInput * source, const MidiMessage & message)
{
	this->virtualKeyboardState.processNextMidiEvent(message);
	this->virtualKeyboardState.processNextMidiEvent(transposeMidiMessage(message));
}

void MainContentComponent::refreshMidiInputsAndPushToList(ComboBox * list)
{
	const StringArray devices(MidiInput::getDevices());

	list->clear();
	list->addItemList(devices, 1);
}

void MainContentComponent::setInputDevice(const String newDevice)
{
	midiDeviceManager.removeMidiInputCallback(currentDevice, this);

	if (!midiDeviceManager.isMidiInputEnabled(newDevice))
		midiDeviceManager.setMidiInputEnabled(newDevice, this);

	midiDeviceManager.addMidiInputCallback(newDevice, this);

	currentDevice = newDevice;
	this->sliderTransposeStep.setEnabled(true);
}

MidiMessage MainContentComponent::transposeMidiMessage(const MidiMessage & message)
{
	MidiMessage newMessage;

	if (this->sliderTransposeStep.getValue() > 0)
	{
		int transpose = sliderTransposeStep.getValue();

		if (message.isNoteOn())
		{
			newMessage = MidiMessage::noteOn(message.getChannel(), message.getNoteNumber() + (transpose), message.getVelocity());
		}

		if (message.isNoteOff())
		{
			newMessage = MidiMessage::noteOff(message.getChannel(), message.getNoteNumber() + (transpose), message.getVelocity());
		}

	}

	return newMessage;
}
