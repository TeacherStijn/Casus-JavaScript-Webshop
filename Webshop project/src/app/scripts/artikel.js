export class Artikel {
    _aantal;
    _image;

    constructor (naam, prijs) {
        this._naam = naam;
        this._prijs = prijs;
        this._aantal = 0;
        // afbeelding instellen:
        this._image = this._naam.replaceAll(' ','-').toLowerCase();
    }

    get naam () {
        return this._naam;
    }

    get aantal () {
        return this._aantal;
    }

    set aantal (hoeveelheid) {
        this._aantal = hoeveelheid;
    }

    get prijs () {
        return this._prijs;
    }

    set prijs (bedrag) {
        // Zorg ervoor dat de prijs van een artikel nooit minder dan 1 euro mag zijn.
        if (bedrag >= 1) {
            this._prijs = bedrag;
        } else {
            throw new Error('Bedrag is te laag, moet minimaal 1 (één) euro zijn');
        }
    }

    get image() {
        return this._image
    }

    // Artikel heeft ook een functie totaal(): die geeft de prijs * aantal terug.
    get totaal() {
        return this._prijs * this._aantal;
    }

    // Bonus functie om een keer de eigenschappen netjes te exporteren
    // zonder de _ underscore in de naamgeving te blijven zien.
    export() {
        return {
            naam: this.naam,
            prijs: this.prijs,
            aantal: this.aantal,
            totaal: this.totaal
        }
    }
}
