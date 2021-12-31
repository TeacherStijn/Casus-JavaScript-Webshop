window.addEventListener('load', function () {

        console.group('Niet zo belangrijk');

        let naam = 'Qwin';
        naam += ' Janssen';

        let leeftijd = 6;

        let hobby = 'Lego bouwen';

        console.log('Hij heet ' + naam + ' en is ' + leeftijd + ' jaar oud en zijn hobby is ' + hobby + '.');
        let verhaaltje = `Hij heet ${naam} en is ${leeftijd} jaar oud en zijn hobby is ${hobby}.`;

        let x = 3;
        let y = 4;

        console.log('uitkomst is: ' + (x + y))

        const mijnAuto = {
            merk: 'Toyota',
            type: 'Avensis',
            pk:   140,
            rijden: function(){
                return 'ik rijd';
            }
        };

        console.log(mijnAuto['merk']);
        console.log(mijnAuto.rijden());

        document.body.innerHTML += `<h2>Hack!</h2><p>${verhaaltje}</p>`;

        maakMuziek2();

        let maakMuziek = function () {
            console.log('Ik ga eerst wat toonladders oefenen');
        }

        function maakMuziek2 () {
            console.log('Ik ga eerst wat toonladders oefenen');
        }






        function verwerk(data){
            // data is als het goed is een Array...
            // Die willen we per item even in de console.log zien
            for (let item of data) {
                //
            }
        }

        console.groupEnd();





        const verhoog = (function() {
            let waarde = 0;

            return function() {
                    waarde++;
                    console.log(waarde);
                }
        })();

        verhoog();
        verhoog();
        verhoog();




        fetch('https://api.spacexdata.com/v2/launches/').then(
            inp=>inp.json()
        ).then(data=>vluchtBeheer.init(data));

        const vluchtBeheer = (function() {
            let data = [];

            return {
                init: function(input) {
                    data = input;
                    this.toon();
                },
                voegToe: function(v) {
                    data.push(v)
                },
                toon: function() {
                    document.body.innerHTML += '<ul>';
                    for (let vlucht of data) {
                        document.body.innerHTML += `<li>${vlucht.mission_name} (${vlucht.launch_year})</li>`;
                    }
                    document.body.innerHTML += '</ul>';
                }
            }
        })();























    }
);



