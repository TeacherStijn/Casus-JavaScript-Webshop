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
        ).then(
            function(data){
                vluchtBeheer.init(data);
                vluchtBeheer.export();
                console.log(vluchtBeheer.zoekVlucht('FalconSat').flight_number);
            }
        );

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

                    let doel = document.getElementById('cards');

                    doel.innerHTML += '<ul>';
                    for (let vlucht of data) {
                        doel.innerHTML += `
                          <div class="card">
                                <img class="card-img-top" src="${vlucht.links.mission_patch}" alt="Card image" height="70px">
                                <div class="card-body">
                                    <h4 class="card-title">${vlucht.mission_name}</h4>
                                    <p class="card-text">${vlucht.details}</p>
                                    <a href="${vlucht.links.video_link}" target="_blank" class="btn btn-primary">Youtube</a>
                                </div>
                            </div>                     
                        `;
                    }
                    doel.innerHTML += '</ul>';
                },
                zoekVlucht: function(naam){
                    return data.find(
                                function(el){
                                    return el.mission_name == naam
                                }
                            )
                },
                export: function() {
                    window.localStorage.setItem('vluchten', JSON.stringify(data));
                }
            }
        })();

    /*
        // Filteren properties die binnen komen?

    fetch('https://api.spacexdata.com/v2/launches/').then(
        inp=>inp.json()
    ).then(data=>{

        let resultaat = data.map(el=>{ return { naam: el.mission_name, jaar: el.launch_year }});
        console.dir(resultaat);

    });
*/

    let knop = document.getElementById('btnVerwerk');

    knop.addEventListener('click', function(ev){
        console.log('klik!');
        console.dir(ev);
    });

    let veld = document.getElementById('txtUsername');

    veld.addEventListener('keypress', function(ev){
        if (ev.target.value=='JS sucks') {
            ev.target.classList.add('fout');
        }

        console.dir(ev);
        // ev.target.value='Pim wilt je dwarszitten';
    });


    }
);



