# Casus JavaScript

## Omschrijving

Maak een eenvoudige HTML5, CSS en JavaScript webwinkel met:

- Een class Artikel met een naam, een prijs en een aantal. De naam en de prijs worden aan de constructor meegegeven.
- Zorg ervoor dat de prijs van een artikel nooit minder dan 1 euro mag zijn.
- Artikel heeft ook een functie totaal(): die geeft de prijs * aantal terug.
- De HTML pagina dient een BODY met daarin HEADER, MAIN en FOOTER te bevatten. 
- Het MAIN element bevat een met JavaScript gegenereerde verzameling aan producten die besteld kunnen worden, met achter de schermen een voorraad die aangepast kan worden door te bestellen. Maak deze productlijst middels een Map() met het product en de bijbehorende voorraad.
  Het Map object: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map 

- Zoek per product ook een toepasselijke afbeelding op. Toon deze netjes op het scherm middels bijvoorbeeld cards van de Bootstrap library.
- Ieder product moet bestelbaar zijn, dus krijgt ook een Knop om het huidige product toe te voegen OF een dubbelklik even handler. 
- Als een gebruiker een artikel selecteert, wordt deze toegevoegd aan het "boodschappenmandje": een rij van een tabel, waarin naam, aantal, prijs en prijs * aantal vermeld staan. Pas ook direct voor dit voorbeeld de voorraad aan. Zet deze ‘winkelwagen’ onderaan of aan de rechterzijde van je pagina.
- Bonuspunten: gebruik miniatuur afbeelding ipv productnamen
- Maak gebruik van een module object (var module = { ... } ) waarin de bestellingen als array worden bijgehouden, 
- Met een add(artikel) functie die een bestelling toevoegt, of als het artikel al besteld is, het aantal ophoogt. Zorg er ook voor dat de voorraad veranderd.
- Een remove(index) functie, die wordt aangeroepen als wordt dubbelgeklikt op een rij. Dan wordt het aantal met één verminderd, of als het aantal op 1 staat wordt de bestelling verwijderd uit de array. (gebruik slice() met index of find met object). Zorg er ook voor dat de voorraad veranderd.
- Een toRows() functie maakt de winkelwagen (table rows) van alle artikelen die in bestelling zijn en wordt aangeroepen na toevoegen van items. Deze wordt na elke wijziging (dubbelklik op gekozen artikel) gebruikt om de code (elementen of innerHTML) van de table aan te passen.
- Een save() functie aan het object: deze slaat de bestelling als JSON string in de localStorage op.
- Een bestel() functie die de bestelling als JSON POST bericht doorstuurt naar een NodeJS back-end
- Maak een aparte Verzameling (Map() of Array) met producten en de aanwezige voorraad ervan. Dan kun je van een bestelling per product vergelijken of er voldoende voorraad is.
- Zorg ervoor dat je een fout opgooit indien het aantal producten niet op voorraad is of wanneer je een té lage prijs voor een product instelt.
- Vang je fouten af en schrijf die samen met het moment van optreden en een duidelijke omschrijving weg naar een verzameling in de localStorage.

## Inhoud

**Main files:**

- index.html
- scripts/main.js
- styles/main.css
