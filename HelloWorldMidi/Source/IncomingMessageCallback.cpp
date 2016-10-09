/*
  ==============================================================================

    IncomingMessageCallback.cpp
    Created: 9 Oct 2016 2:16:05pm
    Author:  Rafael

  ==============================================================================
*/

#include "IncomingMessageCallback.h"

IncomingMessageCallback::IncomingMessageCallback(MainContentComponent* o, const MidiMessage& m, const String& s)
	: owner(o), message(m), source(s)
{}

void IncomingMessageCallback::messageCallback()
{
	if (owner != nullptr)
		owner->updateMessageText(message, source);
}
