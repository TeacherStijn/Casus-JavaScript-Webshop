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
        if (bedrag >= 1) {
            this._prijs = bedrag;
        } else {
            throw new Error("Bedrag is te laag, moet minimaal 1 (één) euro zijn", new Date().getUTCMilliseconds);
        }
    }

    get image() {
        return this._image
    }

    get totaal() {
        return this._prijs * this._aantal;
    }
}