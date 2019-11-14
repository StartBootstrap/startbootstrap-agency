$(document).ready(function(){

    var provinciaProporzioni = {};

    function calculateDensita(){
        $.each(provinceLombardia.features, function(index, provincia){
            sigla = provincia.properties.SIGLA;
            provinciaProporzioni[sigla] = {};
            provinciaProporzioni[sigla]["area"] = provincia.properties.SHAPE_AREA;

            provinciaProporzioni[sigla]["fattoriedidattiche"] = jsonMashup[sigla]["fattorie_didattiche"];
            provinciaProporzioni[sigla]["densitafattoriedidattiche"] = (provinciaProporzioni[sigla]["fattoriedidattiche"] / provinciaProporzioni[sigla]["area"]) * 500000000;

            provinciaProporzioni[sigla]["operatoribiologici"] = jsonMashup[sigla]["operatori_biologici"];
            provinciaProporzioni[sigla]["densitaoperatoribiologici"] = (provinciaProporzioni[sigla]["operatoribiologici"] / provinciaProporzioni[sigla]["area"]) * 50000000;

            provinciaProporzioni[sigla]["falde"] = jsonMashup[sigla]["acque_sotterranee_parametri_sopra_limite_legge"];
            provinciaProporzioni[sigla]["densitafalde"] = (provinciaProporzioni[sigla]["falde"] / provinciaProporzioni[sigla]["area"]) * 3000000;

        });
        console.log(provinciaProporzioni)
    }

    calculateDensita();

    function filterDensita(){
        mymap.removeLayer(geoJSON);
        makegeoJSON()
    }

    $("input[name='mapfilter']").change(function(){
        filterDensita();
    });

    function polygonStyle(feature){
        //if densitafattorie
        var densitafattoriedidattiche = provinciaProporzioni[feature.properties.SIGLA]["densitafattoriedidattiche"];
        var densitaoperatoribiologici = provinciaProporzioni[feature.properties.SIGLA]["densitaoperatoribiologici"];
        var densitafalde = provinciaProporzioni[feature.properties.SIGLA]["densitafalde"];

        var selectedMapFilter = $('input[name=mapfilter]:checked').val();

        var fillVariable = "";
        var colorVariable = "";

        switch (selectedMapFilter) {
            case 'fattorie': {
                if(densitafattoriedidattiche > 9){
                    fillVariable = "#05c900"
                } else if (densitafattoriedidattiche > 4) {
                    fillVariable = "#4ed854"
                } else {
                    fillVariable = "#acffc2"
                }
                colorVariable = "#082b0e";
                break;
            }
            case 'operatori': {
                if(densitaoperatoribiologici > 8){
                    fillVariable = "#ff5200"
                } else if (densitaoperatoribiologici > 3) {
                    fillVariable = "#ff8153"
                } else {
                    fillVariable = "#ffc3af"
                }
                colorVariable = "#631200";
                break;
            }
            case 'falde': {
                if(densitafalde > 8){
                    fillVariable = "#0067ff"
                } else if (densitafalde > 3) {
                    fillVariable = "#5e96ff"
                } else {
                    fillVariable = "#a0bdff"
                }
                colorVariable = "#002257";
                break;
            }
        }

        return {
            fillOpacity: 0.5,
            color: colorVariable,
            fillColor: fillVariable
        }
    }

    var provinceNomi = {
        "BG":"Bergamo",
        "BS":"Brescia",
        "CO":"Como",
        "CR":"Cremona",
        "LC":"Lecco",
        "LO":"Lodi",
        "MN":"Mantova",
        "MI":"Milano",
        "MB":"Monza e della Brianza",
        "PV":"Pavia",
        "SO":"Sondrio",
        "VA":"Varese"
    }

    function highlight(layer) {
        layer.setStyle({
            color: "#6b1912",
            fillColor: "white",
            weight: 2
        });
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    }

    function dehighlight(layer) {
        if (selected === null || selected._leaflet_id !== layer._leaflet_id) {
            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                layer.bringToBack();
            }
            geoJSON.resetStyle(layer);
        }
    }

    function select(layer) {
        if (selected !== null) {
            var previous = selected;
        }
        selected = layer;
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
        if (previous) {
            dehighlight(previous);
        }
    }

    var selected = null;

    function onEachFeature(feature, layer) {
        var provinciaSigla = feature.properties.SIGLA
        layer.bindPopup(provinceNomi[provinciaSigla]);
        layer.on({
            'mouseover': function(e) {
                highlight(e.target);
            },
            'mouseout': function(e) {
                dehighlight(e.target);
            },
            'click': function(e) {
                select(e.target);
                console.log(feature.properties.SHAPE_AREA);
                createFaldePieChart(provinciaSigla);
                createFattoriePolarChart(provinciaSigla);
                createOperatoriLineChart(provinciaSigla);
                $('#provinciaSelezionata').html(provinceNomi[provinciaSigla]);
            }
        });
    }

    function createFaldePieChart(provincia){
        $('#faldeChart').remove();
        $('.pieChartContainer').append('<canvas id="faldeChart" class="chart"></canvas>');

        var faldepiechartCtx = $('#faldeChart');
        var labelDictionary = {
            "acque_sotterranee_parametri_nella_norma": "Nella norma",
            "acque_sotterranee_parametri_sopra_limite_attenzione": "Sopra il limite di Attenzione",
            "acque_sotterranee_parametri_sopra_limite_legge": "Sopra il limite di Legge"
        };
        var labels = [];
        var valoriDonut = [];
        $.each(labelDictionary, function(key,value){
            labels.push(value);
            valoriDonut.push(jsonMashup[provincia][key]);
        });


        datiPolar = {
            datasets: [{
                data: valoriDonut,
                backgroundColor: [
                    "#8bdee2",
                    "#6bc2b9",
                    "#0b7895"

                ]
            }],
            labels: labels
        };

        var faldepiechart = new Chart(faldepiechartCtx, {
            type: 'doughnut',
            data: datiPolar,
            options: {
                responsive: true
            }
        });
    }

    function createFattoriePolarChart(provincia) {
        $('#fattorieChart').remove();
        $('.polarChartContainer').append('<canvas id="fattorieChart" class="chart"></canvas>');

        var labelDictionary = {
            "fattorie_didattiche_servizi_asilo_nido": "Asilo nido",
            "fattorie_didattiche_servizi_scuola_infanzia": "Scuola dell'infanzia",
            "fattorie_didattiche_servizi_scuola_primaria": "Scuola primaria",
            "fattorie_didattiche_servizi_scuola_secondaria_i_grado": "Scuola secondaria I grado",
            "fattorie_didattiche_servizi_scuola_secondaria_ii_grado": "Scuola secondaria II grado",
            "fattorie_didattiche_servizi_adulti": "Adulti",
            "fattorie_didattiche_servizi_disabili": "Disabili",
            "fattorie_didattiche_servizi_anziani": "Anziani",
            "fattorie_didattiche_servizi_ristorazione": "Ristorazione",
            "fattorie_didattiche_servizi_attivita_sportive": "Attività sportive",
            "fattorie_didattiche_servizi_pernottamento": "Pernottamento",
            "fattorie_didattiche_servizi_punto_vendita": "Punto vendita",
            "fattorie_didattiche_servizi_azienda_bio": "Azienda Bio",
            "fattorie_didattiche_servizi_accessibilita_disabili": "Accessibilità disabili"
        };

        var labels = [];
        var valoriPolar = [];

        $.each(labelDictionary, function (key, value) {
            labels.push(value);
            valoriPolar.push(jsonMashup[provincia][key]);
        });

        console.log(valoriPolar);

        datiPolar = {
            datasets: [{
                data: valoriPolar,
                backgroundColor: [
                    "#002c28",
                    "#003430",
                    "#003e39",
                    "#003816",
                    "#003c16",
                    "#003f18",
                    "#004b1c",
                    "#00661c",
                    "#00721f",
                    "#00721f",
                    "#129f05",
                    "#129f05",
                    "#13f000",
                    "#6df350"
                ]
            }],
            labels: labels
        };
        var polarChartContainer = $('#fattorieChart');

        var fattoriePolarChart = new Chart(polarChartContainer, {
            data: datiPolar,
            type: 'polarArea',
            options: {
                layout: {
                    padding: {
                        top: 5,
                        bottom: 10
                    }
                },
                responsive: true,
                legend: {
                    display: false,
                    position: 'left'
                }
            }
        });
    }

    function createOperatoriLineChart(provincia) {
            $('#operatoriChart').remove();
            $('.barChartContainer').append('<canvas id="operatoriChart" class="chart"></canvas>');

            var labelDictionary = {
                "operatori_biologici": "Operatori biologici Totali",
                "operatori_biologici_produzione_vegetale": "Produzione Vegetale",
                "operatori_biologici_produzione_zootecnica": "Produzione Zootecnica",
                "operatori_biologici_tipologia_non_specificata": "Tipologia non specificata",
                "operatori_biologici_produttori": "Produttori",
                "operatori_biologici_preparatori": "Preparatori",
                "operatori_biologici_importatore": "Importatori",
                "operatori_biologici_esportatore": "Esportatori"
            };

            var labels = [];
            var valoriBar = [];

            $.each(labelDictionary, function (key, value) {
                labels.push(value);
                valoriBar.push(jsonMashup[provincia][key]);
            });


            datiBar = {
                datasets: [{
                    data: valoriBar,
                    backgroundColor: [
                        "#ffd7a4",
                        "#f6bd84",
                        "#fd8e53",
                        "#eb824d",
                        "#cc5d3b",
                        "#c34d2e",
                        "#c85240",
                        "#b84b3b",
                        "#99332f",
                        "#712522"
                    ]
                }],
                labels: labels
            };

        var barChartContainer = $('#operatoriChart');

        var operatoriBarChart = new Chart(barChartContainer, {
            data: datiBar,
            type: 'bar',
            options: {
                responsive: true,
                legend : {
                    display: false
                },
                scaleShowValues: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            autoSkip: false
                        }
                    }]
                }
            }
        });
    }

    var mymap = L.map('map').setView([45.707458, 9.930645], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mymap);

    var geoJSON;
    function makegeoJSON(){
        geoJSON = L.geoJSON(provinceLombardia, {
                style: function(feature){return polygonStyle(feature)},
                weight: 1,
                onEachFeature: onEachFeature
            }
        ).addTo(mymap);
    }
    makegeoJSON();
});




