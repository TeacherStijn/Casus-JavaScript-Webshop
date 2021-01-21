export const bestelModule =
  function(productLijst){
     const data = [];
     return {
        add: function(artikel) {
            if (productLijst.get(artikel) > 0) {
                // In ieder geval aantal van het product ophogen
                artikel.aantal++;

                // Als artikel nog niet in winkelwagen zit, dan toevoegen
                if (data.indexOf(artikel)==-1) {
                    data.push(artikel);
                }
            } else {
                throw new Error ("Product is niet meer op voorraad", new Date().getUTCMilliseconds());
            }

            // View even bijwerken
            this.toRows();
        },
        remove: function(index){

        },
        rekenTotaal: function(){
            let totaal = 0;
            data.forEach((e) => totaal += (e.prijs*e.aantal));
            return totaal;
        },
        toRows: function() {
            // winkelwagen bouwen
            let winkelwagen = document.querySelector("aside");

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
            ).join("");

            winkelwagen.innerHTML += `
                    <tr>
                        <td>&nbsp;</td>
                        <td><strong>Totaal:</strong></td>
                        <td><strong>${this.rekenTotaal()}</strong></td>
                    </tr>
                </table>
            `
        },
        save() {
            const tijdstip = new Date().getUTCMilliseconds();
            window.localStorage.setItem('winkelwagen_' + tijdstip,JSON.stringify(data));
            if (!window.localStorage.getItem('winkelwagen_' + tijdstip)){
                throw new Error("Opslaan winkelwagen voor later mislukt");
            }
        },
        bestel() {
            const URL = "";
            fetch(URL, 'POST', JSON.stringify(data));
        }
     }
  };