import { Artikel } from './artikel.js';
import { bestelModule } from './bestelling.js';

function setup()
{
    // eerst array maken
    let tempLijst = [
        new Artikel('Lego Batmobile', 215),
        new Artikel('Doppler waterfles', 10),
        new Artikel('Logitech C922 webcam', 75),
        new Artikel('IKEA Kerstboom', 20)
    ];

    const productLijst = new Map();

    // map van de array maken en deze mergen met random voorraad
    tempLijst.forEach(
        (key) => {
            let rng = Math.ceil(Math.random()*10);
            console.log(`Random nummer: ${rng}`);
            productLijst.set(key, rng)
        }
    );

    tempLijst = null;

    // Initialiseer bestelling module:
    const bestelling = bestelModule(productLijst);

    // forEach beschikbaar maken op NodeList's zoals een HTMLCollection,
    NodeList.prototype.forEach = function(e) {
        // This is hier de NodeList in betrekking
        Array.prototype.forEach.call(this, e);
    }

    function toonProducten() {
        productLijst.forEach(
            (e,i,reeks) => { orderRij(i) }
        );

        function orderRij(item) {
/*            const tabel = document.querySelector("#productOverzicht");
            const rij = document.createElement("tr");
            const celProduct = document.createElement("td");
            const celAantal = document.createElement("td");
            const product = document.createElement("span");
            const productText = document.createTextNode(item.naam);
            const aantal = document.createElement("input");
            aantal.setAttribute("type", "number");
            aantal.setAttribute("min", 0);
            // bewust geen max instelling om voorraad dus te kunnen overschrijven ;)
            //aantal.setAttribute("max", ??)

            product.appendChild(productText);
            celProduct.appendChild(product);
            celAantal.appendChild(aantal);
            rij.appendChild(celProduct);
            rij.appendChild(celAantal);
            tabel.appendChild(rij);*/

            // Bootstrap CSS way:
            const form = document.querySelector("#formBestelling");
            form.innerHTML += `
                <div class="card" style="width:400px">
                  <img class="card-img-top" src="./images/${ item.image }.webp" alt="Card image">
                  <div class="card-body">
                    <h4 class="card-title">${ item.naam }</h4>
                    <p class="card-text">
                        ${ item.prijs }
                        <br/>
                        <button class="btn btn-primary" id="${item.naam}">
                            <span class="material-icons">add_shopping_cart</span>
                        </button>
                    </p>
                  </div>
                </div>
            `
        }

        document.querySelectorAll("#formBestelling button").forEach(
            (btn) => {
                btn.addEventListener('click', (ev) => {
                    ev.preventDefault();

                    // bestel m.b.v. bestelling module
                    const naam = ev.target.getAttribute("id");
                    let result;
                    productLijst.forEach(
                        (e,i) => {
                            if (i.naam == naam) {
                                result = i;
                            }
                        }
                    );

                    try {
                        bestelling.add(result);
                    } catch (err) {
                        document.querySelector("footer").innerHTML = err;
                    }

                    document.querySelector("footer").innerHTML = "";
                })
            }
        );

        document.querySelector("#saveCart").addEventListener('click', (ev)=>{
            try {
                ev.preventDefault();
                bestelling.save();
            } catch (err) {
                document.querySelector("footer").innerHTML = err;
            }

            document.querySelector("footer").innerHTML = "";
            alert("Bestelling opgeslagen voor later");
        })
    }

    toonProducten();
}

// ophalen bestaande bestelling check met localStorage nog doen.

setup();

