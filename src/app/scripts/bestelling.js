// wegens plaatsing van deze module in APARTE file die we elders
// kunnen importeren, staat er hiervoor: export const ...
//
// Zouden wij deze module gewoon in MAIN.JS hebben gemaakt,
// dan zou de schrijfwijze zijn:
//
// const bestelModule = (function() {})()
//
export const bestelModule =
  function(productLijst){
     let data = [];
    
     return {
        add: function(artikel) {
            // Voorraadcheck; kijk in de Map bij het bijbehorende artikel (key) wat de waarde (voorraad) is:
            const voorraad = productLijst.get(artikel);
            if (voorraad > 0) {
                // Als artikel nog niet in winkelwagen zit, dan toevoegen
                if (data.indexOf(artikel) == -1) {
                    artikel.aantal = 1;
                    data.push(artikel);
                } else {
                    artikel.aantal++;
                }

                // Voorraad aanpassen:
                productLijst.set(artikel, voorraad-1);

            } else {
                alert('Niet voldoende op voorraad van dit product');
                console.log('Huidige voorraad nu: ' + voorraad);
                throw new Error('Onvoldoende voorraad van product');
            }

            // View even bijwerken
            this.toRows();
        },

        remove: function(index) {
            const product = data[index];
            const voorraad = productLijst.get(product);

            console.log('Index: ' + index);
            if (data[index].aantal > 1){
                data[index].aantal--;
            } else {
                console.log('Geen meer; haal maar uit de array');
                data[index].aantal = 0;
                data.splice(index,1);
            }

            // Voorraad aanpassen:
            productLijst.set(product, voorraad+1);
            console.log('Huidige voorraad nu: ' + voorraad);
            this.toRows();
        },

        rekenTotaal: function(){
            let totaal = 0;
            data.forEach((e) => totaal += (e.prijs*e.aantal));
            return totaal;
        },

        toRows: function() {
            /*
               Recursieve functie om dichtsbijzijnde TR
               op te halen van huidige element
            */

            function getTR (currElement) {
                // Fail-safe; is TR geen parent uberhaupt?
                if ('tagName' in currElement) {

                    if (currElement.tagName.toLowerCase() == 'body' || currElement.tagName.toLowerCase() == 'html') {
                        return new Error('Rij tot aan body niet gevonden in getTR');
                    } else {
                        if (currElement.tagName.toLowerCase() == 'tr') {
                            return currElement;
                        } else {
                            return getTR(currElement.parentNode);
                        }
                    }
                } else {
                    return new Error('Rij tonen in getTR lukt niet');
                }
            }

            /*
             **************************************
             HTML winkelwagen bouwen en vullen:
             **************************************
            */

            let winkelwagen = document.querySelector('aside');
            winkelwagen.innerHTML = '';
            let table = document.createElement('table');
            table.setAttribute('id', 'winkelwagen');
            let tr, td, img, content;

            data.forEach(
                (el, index) =>{
                    tr = document.createElement('tr');
                    img = document.createElement('img');

                    // cel1:
                    td = document.createElement('td');
                    img.setAttribute('src', `./images/${ el.image }.webp`);
                    img.classList.add('wwimage');
                    td.appendChild(img);
                    tr.appendChild(td);
                    // cel2:
                    td = document.createElement('td');
                    content = document.createTextNode(el.prijs);
                    td.appendChild(content);
                    tr.appendChild(td);
                    // cel3:
                    td = document.createElement('td');
                    content = document.createTextNode(el.aantal);
                    td.appendChild(content);
                    tr.appendChild(td);

                    // rij:
                    tr.classList.add('productRij');
                    tr.setAttribute('data-nr', index);
                    table.appendChild(tr);
                }
            );

            // cel1
            let eindRij, eindCel;
            eindRij = document.createElement('tr');
            eindRij.classList.add('eindRij');
            eindCel = document.createElement('td');
            eindRij.appendChild(eindCel);

            // cel2
            content = document.createTextNode('Totaal');
            eindCel = document.createElement('td');
            eindCel.appendChild(content);
            eindRij.appendChild(eindCel);

            // cel3
            console.log('Totaal winkelwagen = ' + this.rekenTotaal());
            content = document.createTextNode(this.rekenTotaal());
            eindCel = document.createElement('td');
            eindCel.appendChild(content);
            eindRij.appendChild(eindCel);

            table.appendChild(eindRij);
            winkelwagen.appendChild(table);

            const bestelKnop = document.createElement('button');
            bestelKnop.appendChild(document.createTextNode('Bestel!'));
            bestelKnop.setAttribute('id', 'bestelKnop');
            winkelwagen.appendChild(bestelKnop);


            /* quick 'n easy way :
            winkelwagen.innerHTML = `
                <table id="winkelwagen">
            `;
            winkelwagen.innerHTML += data.map(
                (el) => `
                    <tr>
                        <td><img class="wwimage" src="./images/${ el.image }.webp" /></td>
                        <td>${el.prijs}</td>
                        <td>${el.aantal}</td>
                    </tr>`
            ).join('');

            winkelwagen.innerHTML += `
                    <tr>
                        <td>&nbsp;</td>
                        <td><strong>Totaal:</strong></td>
                        <td><strong>${this.rekenTotaal()}</strong></td>
                    </tr>
                </table>
            `
            */

            /*
             **************************************
             JS EventListeners winkelwagen maken:
             **************************************
            */
            const productRijen = document.getElementsByClassName('productRij');
            // gebruikt de custom definitie van forEach:
            let that = this;
            productRijen.forEach(
                el=>{
                    el.addEventListener(
                        'dblclick', function(ev){
                            let index;
                            let rij = getTR(ev.target);
                            console.log('Rij: ' + rij);
                            index = rij.getAttribute('data-nr');
                            that.remove(index);
                        }
                    );
                }
            );

            document.querySelector('#bestelKnop').addEventListener(
                'click', function(ev) {
                    ev.preventDefault();
                    that.bestel();
                }
            )
        },

        save() {
            const tijdstip = new Date();
            window.localStorage.setItem('winkelwagen_' + tijdstip,JSON.stringify(data));
            if (!window.localStorage.getItem('winkelwagen_' + tijdstip)){
                throw new Error('Opslaan winkelwagen voor later mislukt');
            }
        },

        bestel() {
            const URL = 'http://localhost:1234/bestel';
            fetch(URL, {
                    method: 'POST',
                    body: JSON.stringify(data)
                }
            ).then(
                // noodzakelijke parse naar json toe middels .json() methode. Levert zelf ook promise op..
                prom=>prom.json()
            ).then(
                resp=> {
                    alert('Bestelling verzonden!');
                    console.dir(resp);
                }
            );
        }
     }
  };
