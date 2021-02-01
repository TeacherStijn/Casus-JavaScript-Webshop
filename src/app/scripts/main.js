import { Artikel } from './artikel.js';
import { bestelModule } from './bestelling.js';

function setup()
{
    /* Het MAIN element bevat een met JavaScript gegenereerde verzameling aan producten
   die besteld kunnen worden, met achter de schermen een voorraad die
   aangepast kan worden door te bestellen. Maak deze productlijst middels een Map()
   met het product en de bijbehorende voorraad. */

    // eerst array maken om zo Map mee te vullen
    let tempLijst = [
        new Artikel('Lego Batmobile', 215),
        new Artikel('Doppler waterfles', 10),
        new Artikel('Logitech C922 webcam', 75),
        new Artikel('IKEA Kerstboom', 20)
    ];

    const productLijst = new Map();

    // map van de array maken en deze mergen met random VOORRAAD
    tempLijst.forEach(
        (elem) => {
            let rng = Math.ceil(Math.random()*10);
            console.log(`Random nummer: ${rng}`);
            productLijst.set(elem, rng)
        }
    );

    tempLijst = null;

    // Initialiseer bestelling module:
    const bestelling = bestelModule(productLijst);

    // BONUSPUNTEN:
    // Alternatief voor: Array.from(verzameling);
    // forEach beschikbaar maken op HTMLCollection;
    // niet nodig op bijv NodeList (met querySelectorAll)
    HTMLCollection.prototype.forEach = function(e) {
        // This is hier de NodeList in betrekking
        Array.prototype.forEach.call(this, e);
    }

    // Functie voor het tonen van de winkel producten op de hoofdpagina
    //
    function toonProducten() {
        productLijst.forEach(
            (e,i,reeks) => { productRij(i) }
        );

        function productRij(item) {
            // Bootstrap CSS way:
            const form = document.querySelector('#formBestelling');
            form.innerHTML += `
                <div class="card" style="width:400px">
                  <!-- Zoek per product ook een toepasselijke afbeelding op. Toon deze netjes op het scherm middels bijvoorbeeld cards van de Bootstrap library. -->
                  <img class="card-img-top" src="./images/${ item.image }.webp" alt="Card image">
                  <div class="card-body">
                    <h4 class="card-title">${ item.naam }</h4>
                    <p class="card-text">
                        ${ item.prijs }
                        <br/>
                        <!-- Ieder product moet bestelbaar zijn, dus krijgt ook een Knop om het huidige product toe te voegen OF een dubbelklik even handler. -->
                        <button class="btn btn-primary" id="${item.naam}">
                            <span class="material-icons">add_shopping_cart</span>
                        </button>
                    </p>
                  </div>
                </div>
            `
        }

        // Event listeners aan button PER product toevoegen:
        document.querySelectorAll('#formBestelling button').forEach(
            (btn) => {
                btn.addEventListener('click', (ev) => {
                    ev.preventDefault();

                    // bestel m.b.v. bestelling module
                    const naam = ev.target.getAttribute('id');
                    let result;
                    productLijst.forEach(
                        (i, el) => {
                            if (el.naam == naam) {
                                result = el;
                            }
                        }
                    );

                    // Na klik op knop per product, item toevoegen aan winkelwagen middels bestelling module
                    bestelling.add(result);
                });
            }
        );

        document.querySelector('#saveCart').addEventListener('click', (ev)=>{
            ev.preventDefault();
            bestelling.save();
            alert('Bestelling opgeslagen voor later');
        });
    }

    toonProducten();
}

// ophalen bestaande bestelling check met localStorage nog doen.

// Evt foutafhandeling met custom event doen:
// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events

// Nu stopt hij al te vroeg
try {
    setup();
}
catch(err){
    const foutLog = localStorage.getItem('foutlog');
    const fout = new Date() + '@' + err + '\n';
    const foutTekst = foutLog==undefined?fout:foutLog+fout;
    localStorage.setItem('foutlog', foutTekst);

    // if datum = laatste v/d maand? schrijf naar back-end ;)
}
