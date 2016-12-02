/*
  ==============================================================================

    IncomingMessageCallback.h
    Created: 9 Oct 2016 2:16:05pm
    Author:  Rafael

  ==============================================================================
*/

#include "../JuceLibraryCode/JuceHeader.h"
#include "MainComponent.h"

#ifndef INCOMINGMESSAGECALLBACK_H_INCLUDED
#define INCOMINGMESSAGECALLBACK_H_INCLUDED

class IncomingMessageCallback
	: public CallbackMessage
{
public:
	IncomingMessageCallback(MainContentComponent* o, const MidiMessage& m, const String& s);

	void messageCallback() override;

	Component::SafePointer<MainContentComponent> owner;
	MidiMessage message;
	String source;
};

#endif  // INCOMINGMESSAGECALLBACK_H_INCLUDED
