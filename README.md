# Sensor-combo
M2M solution


# Oppgavebeskrivelse
Skolen har akkurat flyttet inn i nytt bygg og vi har opplevd at luften noen ganger er dårlig i klasserommene. Målet for eksamen i M2M er å ende opp med noe som kan bli
en permanent løsning for å overvåke læringsmiljøet, slik at man på sikt kan få det bedre. Dataene som løsningen samler inn skal brukes av elevene på M2M faget, men
også av Driftsavdelingen og andre linjer ved skolen. Det må derfor publiseres på en plattform som er enkelt tilgjengelig for alle som ønsker tilgang.
Sensor-nodene skal samle inn data om temperatur, fuktighet, lysnivå, bevegelse og CO2-nivå målt i PPM. Å sørge for at sensorene produserer riktige data er en del av
oppgaven, så om man trenger å gjøre kalibrering eller andre tilpasninger må dette dokumenteres. Hvordan man tenker å bygge og plassere nodene bør også
dokumenteres.

Sensor-noden skal lages med enten LoRa radio eller Particle Photon:
- Velger man LoRa radio, må man skrive en liten Gateway som kan sende dataene videre til internett. Om noen av dere trenger å låne en ekstra LoRa radio som Gateway,
gi meg beskjed så snart som mulig. Det er ikke krav om å bruke PubSub for LoRa, da jobbing med Gateway er forventet å ta litt ekstra tid.
- Velger man Particle Photon må man basere klienten på en PubSub løsning (f.eks. MQTT).
Du må argumentere for hvorfor du velger den ene fremfor den andre løsningen. Det at vi har mer erfaring med Photon bør ikke være et argument.
I tillegg til en radio, skal man ha med følgende sensorer i noden:
- DHT11 sensor
- Photoresistor
- PIR sensor
- MH-Z19 CO2 sensor (ikke MQ7 som er en CO-sensor!)
Sensor-nodene skal rapportere og lagre dataene på en valgfri skytjeneste. Det skal lages en klient som bør fungere på enten mobil eller stasjonær PC. Her skal man
kunne lese av status for mer enn ett rom og det bør også være mulig å kunne se historiske data. Klienten bør minimum ha en grafisk fremstilling av dataene over tid.
Det må lages en trinnvis dokumentasjon for hvordan man setter opp både klient og server. Denne skal være enkel å følge for en som ikke har samme erfarings-grunnlag
som vi har bygget opp i løpet av skoleåret. Den dere skriver dokumentasjonen for er altså en som ikke har brukt Photon eller LoRa Feather noe særlig før. Alle valg av
tjenester må begrunnes og det må dokumenteres hvordan løsningen skal kunne skaleres til å dekke både Fjerdingen og Vulkan Campus. Utover selve oppgaven skal det
leveres dokumentasjon og kode som beskriver:
- Sensornode m/nødvendige biblioteker
- Skytjeneste
- Klient
- Skalering av løsningen utover en enkelt node
- Sikkerhet
- Valg av radio-løsning

Dokumentasjonen skal inneholde en video som viser hele løsningen i bruk. Den skriftlige dokumentasjonen bør være såpass god at andre skoler også kan sette opp en
tilsvarende løsning.
OBS!

Sensor-delen av denne oppgaven har dere langt på vei allerede gjort, men det holder ikke å lagre data til Particle Cloud. Denne oppgaven bygger videre på den første og
målet er at dere har bygget en komplett ende til ende implementasjon av et sensor-nettverk. Hvis dere skrev god dokumentasjon på sensor-noden i Oppgave 1, kan dere
gjerne gjenbruke noe av dette, men både klient og server-løsning er annerledes og må dokumenteres skikkelig. I tillegg skal kommunikasjonen med server-tjenesten være
annerledes enn i forrige løsning, så det bør være litt av hvert å bryne seg på her!
