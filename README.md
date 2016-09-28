Project 2 - opvolgingsdocument Academiejaar 2016-2017
=====================================================

## Student:	Rafaël Mindreau

## Mentor:		Joris Maervoet

Beschrijving - @rafael.mindreau - 23/09/2016
-------------------------

#### Onderwerp:

> Een VST/Instrument schrijven in JUCE (C++ Framework) die MIDI input van de gebruiker leest, en daarop verder kan improviseren.
> De gebruiker speelt bij voorkeur op een externe MIDI controller (reeds voorzien) een aantal akkoorden. De plugin leest de noten,
> improviseert er verder op a.d.h.v. een reeks vooringestelde parameters, en sluist het door als MIDI output. Men kan bij het gewenste
> instrument (waar MIDI omgezet wordt naar geluid) kiezen voor de MIDI input van de plugin.

#### Einddoelen:

1. De student ontwikkelt een proof-of-concept VST/Audio-toepassing met Juce in C++. De toepassing luistert naar een sequentie noten via MIDI input. De toepassing zal op basis van een aantal parameters verder improviseren, en de MIDI output samenvoegen met de input. De gebruiker kan nog steeds spelen, waardoor de AI rap moet kunnen inspelen op veranderingen.
2. Hij schrijft een rapport over de ontwikkeling van de AI binnen het project. De mogelijke implementaties, het gekozen traject, waarom, en de verslaggeving van verschillende soorten testen in detail.
3. Hij schrijft een toepassing die gebruik maakt van neurale netwerken voor de improvisatie.
4. Hij schrijft een demonstrator in JUCE die duidelijk aantoont dat de AI in staat is om op tempo van de gebruiker, verder te improviseren op de gespeelde noten, met tal van instellingen om het rapporteren van verschillende testen te kaderen.
5. Hij maakt in een kort rapport een kritische evaluatie van de uitgewerkte demonstrator en kadert future work.
6. Hij leert C++ op een moderne en flexiebele manier via tutorials op http://www.cplusplus.com/doc/tutorial/ **__Overbodig?__**

```
Ik denk dat ik bij C++ niet echt van nul hoef te beginnen, ik heb al iets meer dan gewoon de elementaire kennis ervan opgedaan tijdens de vakanties. Van een boek ga ik niet veel leren, ik zie ook niet goed hoe je gaat meten of ik al dan niet een boek heb gelezen, of tutorials heb gevolgd. Het lijkt mij allemaal nogal wat vaag. Ik hoop dat de einddoelen hiermee beter geschetst zijn. Ik heb deze ook beter in de werkvormen vervat!
```

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

* De **Tutorials** op de website van https://www.juce.com/ volgen om tot een succesvolle eerste applicatie te komen.
* Uitwerken hoe er binnen het JUCE framework, of binnen VST3 (Steinberg) **met MIDI kan gewerkt worden.**
* C++ bij schaven waar het nodig is met **http://www.cplusplus.com/doc/tutorial/**.
* Onderzoeken hoe **neurale netwerken** gebruikt kunnen worden voor de improvisatie van muziek.
* Onderzoeken hoe deze neurale netwerken te laten werken **waar het tijdsdomein van belang is**.
* Grondig **rapporteren** hoe de implementatie van **algoritmen, en neurale netwerken** in de toepassingen verliepen.

#### @joris.maervoet - <28/09/2016>
```
Rafael, een topvoorstel! En bovendien heb je niet zoveel werk meer aan de beschrijving.
Alleen moet je je einddoelen één voor één nog eens afchecken of ze concreet en meetbaar (voor ons) zijn. Voor alle duidelijkheid: de einddoelen zijn de realisaties 
waar wij je aan het einde van de rit op zullen evalueren. Niet alle (studie-)activiteiten hoeven noodzakelijk in de einddoelen verwerkt te zitten. Een voorbeeld:
 - de student maakt een proof-of-concept VST/Audio-toepassing met JUCE in C++. Deze toepassing leest de noten die binnenkomen via een externe MIDI controller, transponeert ze en sluist ze door naar een MIDI-output.
 - de student maakt een rapport van de mogelijke A.I.-technieken die kunnen gebruikt worden voor het vervolledigen van of het verder improviseren op een muzikale compositie. Hij maakt een inschatting hoe de technieken kunnen worden ingezet voor polyfonie en bij online/offline leren.
 - de student maakt een demonstrator met JUCE die ... ... ... (werk af en wees concreet).
 - de student maakt in een kort rapport een kritische evaluatie van de uitgewerkte demonstrator en kadert future work
Probeer bij de werkvormen zo volledig mogelijk te zijn: hoe ga je C++ leren? Misschien kan je je huidige einddoelen 2/3/4 ook verhuizen naar de werkvormen. 
ps: wat betreft de A.I.-setup is het me nog niet duidelijk of de gebruiker volledig stopt met spelen, of of hij nog verder doet tijdens of na de improvisatie door de computer - dit maakt algoritmisch-technisch weldegelijk een verschil
pps: ik stuur je al wat info via e-mail
```

#### @rafael.mindreau - <29/09/2016>
```
Beste meneer Maervoet, 

Je merkt ook vast wel dat dit document plotseling de README.md is geworden, en dat onze ogen nu in de zachtheid van Markdown mogen vallen. Hopelijk vind je dit OK.

Ik heb uw e-mail goed ontvangen, en ben zeer tevreden met het duwtje in de juiste richting! Ik wist eerst niet goed hoe ik de AI zou uitwerken, maar nu je met neurale netwerken kwam zag ik het beeld opklaren. Ik heb getracht om de einddoelen zo veel mogelijk te concretiseren, maar omdat ik er nog zo weinig van afweet is dat tricky. Bij de werkvormen heb ik genoteerd wat er bij elke speciefiek is en dus concreet naar gewerkt moet worden.

C++ leren is niet zo evident. Zeker tegenwoordig. We zijn tegenwoordig als jongeren zo gewend aan higher level languages. Gelukkig ben ik al een paar jaar zo hier en daar wat bezig geweest met classic C++, in de mate dat ik pointers volledig versta, en kan gebruiken. Ik ben het al wat gewend van bij te leren via tutorials. Ik heb geprobeerd met boeken maar, wel het is vooral te wijten aan een conditie in mijn ogen die boeken lezen onnoemelijk ambetant maakt, maar het heeft ook te maken met de langdradigheid en volledigheid van boeken die mij langs de kant slingeren in no-time. Memory management op schaal van iets grotere applicaties heb ik nog nooit gedaan. Ik weet dat memory leaks de n°1 enemy zijn in C++, en weet hoe ik ze moet vermijden (deconstructors schrijven en delete gebruiken, althans op heap). Maar ik ben het heel zeker dat ik nog veel moet bijleren in C++, over de dingen die ik hier nog niet heb opgesomd wel te verstaan. Omdat ik met een framework moet werken wil ik mij gezien de tijd enkel beperken tot wat zeker nodig is.

Wat betreft neurale netwerken ben ik enorm "excited" als je zegt dat deze out-of-the-box kunnen worden gebruikt. Ik had inderdaad al een paar libraries gevonden op het net voor C++ specifiek. Ik ga inderdaad in het tijdsdomein iets moeten verzinnen als een soort ven schedueling voor deze rap te doen reageren op zo'n optimaal mogelijk niveau. Ergens dacht ik ook nog om GPU computing te gebruiken met OpenCL maar dan kan ik evengoed een UFO gaan bouwen, ik denk dat ik het realistisch ga moeten houden.
```

Planning - <datum van eerste ingave> (op te stellen nadat je voorstel is goedgekeurd)
-------------------------------------------------------------------------------------

> <Hou hier je werkplanning bij, op te stellen nadat je voorstel is goedgekeurd>

Logboek
-------

> <Noteer hier je activiteiten, gevonden informatie, behaalde milestones, 
> belangrijke gebeurtenissen, problemen, oplossingen...
> Zet voor elke nieuwe entry op een aparte lijn je naam en de datum.
> Als je dat wil, mag je de zuiver technische informatie in een aanvullend 'technisch logboek'
> bijhouden (binnen je repository). In dat geval kan je hier bij de verschillende entries verwijzen
> naar dat technisch logboek.>