Project 2 - opvolgingsdocument Academiejaar 2016-2017
=====================================================

### Student:	Rafaël Mindreau

### Mentor:		Joris Maervoet

## Beschrijving
#### @rafael.mindreau - 23/09/2016

#### Onderwerp:

> Een VST/Instrument schrijven in JUCE (C++ Framework) die MIDI input van de gebruiker leest, en daarop verder kan improviseren.
> De gebruiker speelt bij voorkeur op een externe MIDI controller (reeds voorzien) een aantal akkoorden. De plugin leest de noten,
> improviseert er verder op a.d.h.v. een reeks vooringestelde parameters, en sluist het door als MIDI output. Men kan bij het gewenste
> instrument (waar MIDI omgezet wordt naar geluid) kiezen voor de MIDI input van de plugin.

#### Einddoelen:

1. De student ontwikkelt een VST/Audio-testapplicatie met Juce in C++. De toepassing kan MIDI-input verwerken en terug uitvoeren.
2. De student ontwikkelt een proof-of-concept VST/Audio-toepassing met Juce in C++. Deze A.I.-toepassing luistert naar een sequentie noten via MIDI input en gebruikt een neuraal netwerk om op basis van een aantal parameters verder te improviseren op de muzikale compositie, en voegt deze MIDI output samenvoegen met de input.
3. Hij maakt in een kort rapport een kritische evaluatie van de uitgewerkte demonstrator en kadert future work.

#### Motivatie - betrokkenheid:

```
Ik ben begeesterd door de muziek en al zijn facetten. Ik experimenteer vaak met nieuwe vormen. Instrumenten kunnen schrijven is een mooie volgende stap.
```

#### Motivatie - grenzen verleggen:

```
C++ is en blijft een serieuze uitdaging. Een artificiële intelligentie schrijven lijkt mij een zéér interessant onderwerp waarin ik ook verder wilde groeien.
```

#### Motivatie - professioneel profiel:

```
Verschillende facetten van dit project kunnen mij later in mijn voordeel pleiten. C++, VST's ontwikkelen, en zelfs AI.
```

#### Kerndoelen:

> 1.a, 2.a, 2.b, 6.e, 8.i, 8.j, 10.n

#### Werkvormen:

* De **Tutorials** op de website van https://www.juce.com/ volgen om tot een succesvolle eerste applicatie te komen.
* Uitwerken hoe er binnen het JUCE framework, of binnen VST3 (Steinberg) **met MIDI kan gewerkt worden.**
* C++ bij schaven waar het nodig is met **http://www.cplusplus.com/doc/tutorial/**.
* Onderzoeken hoe **neurale netwerken** gebruikt kunnen worden voor de improvisatie van muziek.
* Onderzoeken hoe deze neurale netwerken te laten werken **waar het tijdsdomein van belang is**
* Neurale netwerken gebruiken binnen de demonstrator.
* Grondig **rapporteren** hoe de implementatie van **algoritmen, en neurale netwerken** in de toepassingen verliepen.

<!--
#### @joris.maervoet - <28/09/2016>
> Rafael, een topvoorstel! En bovendien heb je niet zoveel werk meer aan de beschrijving.
> Alleen moet je je einddoelen één voor één nog eens afchecken of ze concreet en meetbaar (voor ons) zijn. Voor alle duidelijkheid: de einddoelen zijn de realisaties 
> waar wij je aan het einde van de rit op zullen evalueren. Niet alle (studie-)activiteiten hoeven noodzakelijk in de einddoelen verwerkt te zitten. Een voorbeeld:
>  - de student maakt een proof-of-concept VST/Audio-toepassing met JUCE in C++. Deze toepassing leest de noten die binnenkomen via een externe MIDI controller, transponeert ze en sluist ze door naar een MIDI-output.
>  - de student maakt een rapport van de mogelijke A.I.-technieken die kunnen gebruikt worden voor het vervolledigen van of het verder improviseren op een muzikale compositie. Hij maakt een inschatting hoe de technieken kunnen worden ingezet voor polyfonie en bij online/offline leren.
>  - de student maakt een demonstrator met JUCE die ... ... ... (werk af en wees concreet).
>  - de student maakt in een kort rapport een kritische evaluatie van de uitgewerkte demonstrator en kadert future work
>
> Probeer bij de werkvormen zo volledig mogelijk te zijn: hoe ga je C++ leren? Misschien kan je je huidige einddoelen 2/3/4 ook verhuizen naar de werkvormen. 
>
> ps: wat betreft de A.I.-setup is het me nog niet duidelijk of de gebruiker volledig stopt met spelen, of of hij nog verder doet tijdens of na de improvisatie door de computer - dit maakt algoritmisch-technisch weldegelijk een verschil
>
> pps: ik stuur je al wat info via e-mail

#### @rafael.mindreau - <29/09/2016>
> Beste meneer Maervoet, 
> 
> Je merkt ook vast wel dat dit document plotseling de README.md is geworden, en dat onze ogen nu in de zachtheid van Markdown mogen vallen. Hopelijk vind je dit OK.
> 
> Ik heb uw e-mail goed ontvangen, en ben zeer tevreden met het duwtje in de juiste richting! Ik wist eerst niet goed hoe ik de AI zou uitwerken, maar nu je met neurale netwerken kwam zag ik het beeld opklaren. Ik heb getracht om de einddoelen zo veel mogelijk te concretiseren, maar omdat ik er nog zo weinig van afweet is dat tricky. Bij de werkvormen heb ik genoteerd wat er bij elke speciefiek is en dus concreet naar gewerkt moet worden.
> 
> C++ leren is niet zo evident. Zeker tegenwoordig. We zijn tegenwoordig als jongeren zo gewend aan higher level languages. Gelukkig ben ik al een paar jaar zo hier en daar wat bezig geweest met classic C++, in de mate dat ik pointers volledig versta, en kan gebruiken. Ik ben het al wat gewend van bij te leren via tutorials. Ik heb geprobeerd met boeken maar, wel het is vooral te wijten aan een conditie in mijn ogen die boeken lezen onnoemelijk ambetant maakt, maar het heeft ook te maken met de langdradigheid en volledigheid van boeken die mij langs de kant slingeren in no-time. Memory management op schaal van iets grotere applicaties heb ik nog nooit gedaan. Ik weet dat memory leaks de n°1 enemy zijn in C++, en weet hoe ik ze moet vermijden (deconstructors schrijven en delete gebruiken, althans op heap). Maar ik ben het heel zeker dat ik nog veel moet bijleren in C++, over de dingen die ik hier nog niet heb opgesomd wel te verstaan. Omdat ik met een framework moet werken wil ik mij gezien de tijd enkel beperken tot wat zeker nodig is.
> 
> Wat betreft neurale netwerken ben ik enorm "excited" als je zegt dat deze out-of-the-box kunnen worden gebruikt. Ik had inderdaad al een paar libraries gevonden op het net voor C++ specifiek. Ik ga inderdaad in het tijdsdomein iets moeten verzinnen als een soort ven schedueling voor deze rap te doen reageren op zo'n optimaal mogelijk niveau. Ergens dacht ik ook nog om GPU computing te gebruiken met OpenCL maar dan kan ik evengoed een UFO gaan bouwen, ik denk dat ik het realistisch ga moeten houden.

#### @joris.maervoet - <03/10/2016>
> Rafael, je bent er echt bijna.
> - Als een einddoel echt een complex systeem beschrijft, splits je het beter op in (chronologische) deelstappen. Dat heb jij ook proberen doen, maar je einddoel 1 is al heel jouw systeem. Einddoel 3 en 4 zijn in feite hetzelfde. Vandaar mijn voorstel hierboven (feedback 28/09/2016) om einddoelen te formuleren die stapje voor stapje het systeem opbouwen: (1) JUCE verkennen en aan MIDI hangen, (2) studie A.I. technieken (3) integratie A.I. techniek (4) kort rapport. Doe jij nog eens een poging?
> - "De gebruiker kan nog steeds spelen, waardoor de AI rap moet kunnen inspelen op veranderingen." -> misschien moet je de lat voor jezelf niet zo hoog leggen en dit weglaten?
> - einddoel 6 is niet toetsbaar en mag inderdaad weg. Maak je maar niet teveel zorgen over C++. Het is een trouwens een taal die je toelaat high level en low level te programmeren - dus het kan in JUCE nog alle kanten op.
> - schrijf je nog bij de werkvorm dat je een neuraal netwerk zal kiezen en integreren in je demonstrator?
>
> Als dit in orde is, keur ik goed.
>
> ps: UFOs hoef je inderdaad niet te bouwen
>
> pps: het zou kunnen dat je je testen aanvankelijk zuiver melodisch start en dat je pas daarna ritme toevoegt als een nieuwe dimensie, maar dat zijn zorgen voor later

#### @joris.maervoet - <05/10/2016>
> Rafael, aiai je einddoelen zijn niet meer concreet+toetsbaar !!!
> Kan je misschien gewoon volgende einddoelen overnemen? Dan keur ik het goed.
>   1. De student ontwikkelt een VST/Audio-testapplicatie met Juce in C++. De toepassing kan MIDI-input verwerken en terug uitvoeren.
>   2. De student ontwikkelt een proof-of-concept VST/Audio-toepassing met Juce in C++. Deze A.I.-toepassing luistert naar een sequentie noten via MIDI input en gebruikt een neuraal netwerk om op basis van een aantal parameters verder te improviseren op de muzikale compositie, en voegt deze MIDI output samenvoegen met de input.
>   3. Hij maakt in een kort rapport een kritische evaluatie van de uitgewerkte demonstrator en kadert future work.
-->

#### @joris.maervoet - <06/10/2016>
> goedgekeurd

Planning - <08/10/2016> (op te stellen nadat je voorstel is goedgekeurd)
-------------------------------------------------------------------------------------

https://docs.google.com/spreadsheets/d/1XgQruoB_ySyDcglsJhUwQYiG0AE8MQ-1FZjhBDiEDrQ/edit?usp=sharing

```
Voor de planning word gebruik gemaakt van google sheets. De planning is daar overzichtelijker dan het te proberen gieten in een tabel in markdown of text. Commentaar kan worden toegevoegd, maar indien het vereist is kan full permission met een link doorgegeven worden (don't share it with other students)
```

Logboek
-------

> Noteer hier je activiteiten, gevonden informatie, behaalde milestones, 
> belangrijke gebeurtenissen, problemen, oplossingen...
> Zet voor elke nieuwe entry op een aparte lijn je naam en de datum.
> Als je dat wil, mag je de zuiver technische informatie in een aanvullend 'technisch logboek'
> bijhouden (binnen je repository). In dat geval kan je hier bij de verschillende entries verwijzen
> naar dat technisch logboek.

| Datum    | Activiteit       |
| -------- | ---------------- |
| 09/10    | Juce Test-applicatie aangemaakt, hello world werkt, apparaten kunnen worden weergegeven en geselecteerd. MIDI messages worden doorgegeven. Het proces ging niet zo heel moeizaam ondanks C++. JUCE is vrij High-level. De tutorials van op de site compileerden niet meer, wat mij forceerde diep in te gaan op de code-voorbeelden. De Hello World die geschreven werd heeft een combo-box die de apparaten oplijst met MidiInput::getDevices(). Om de messages van de MIDI toestellen op het scherm te krijgen was wat meer handwerk nodig. Deze kwamen van een OS-thread die in een soort message pump naar de GUI moesten worden gebracht. Voor de rest lijkt JUCE mij het ideale framework! Veel tijd uitgespaard! |
| 13/10    | Het 88-toetsen keyboard laat het van zich afweten. Dit maakt development tests in het basregister moeilijk met het 49-toetsen keyboard dat mij nog rest... |
| 13/10    | Aanmaak van de Transpose-Test is gebeurd. Deze test toetst het aanmaken van custom Midi Messages in conjunctie met bestaande input van een extern keyboard. De bedoeling is om met een slider de stap tussen de gespeelde noot te maken. Seconde, terts, tot en met octaaf. Om dit goed weer te geven zal de output voorlopig als sinusgolf binnen de applicatie blijven. Complicaties liggen op mijn weg om de MIDI door te voeren naar een andere applicatie. Het zou in de toekomst slim zijn om een debug checkbox toe te voegen die de MIDI als sinusgolven zal weergeven. De test is nog niet af. |
| 18/10    | Afwerking van de Transpose-Test. De applicatie gebruikt uiteindelijk een on-board midi keyboard component in plaats van de eerder geplande sinusgolven (dewelke het eerder moeilijker maakten). Let wel op dat enkel input van externe instrumenten worden getransponeerd en weergegeven in de GUI. Je kan ook drukken op toetsen in de GUI, maar deze worden niet getransponeerd. Met een slider kan je kiezen hoeveel semi-tonen je transponeert. ![Image of Transpose Test](img/Milestone1.jpg) |