/**
 * 
 * 
 */

// Init map
var mymap = L.map('mapid', {
  maxBounds: [
    [47.7097615426664, 24.675292968750004],
    [34.542762387234845, 0.7250976562500001]
  ],
  // zoomControl: false,
  maxZoom: 15,
  minZoom: 6
}).setView([41.459, 12.700], 6);

//#region Tiles

// Wikimedia tile
var Wikimedia = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
  attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
  minZoom: 1,
  maxZoom: 19
});

//mapbox tile
var Mapbox = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  minZoom: 6,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1Ijoic3Bpbm85MzMwIiwiYSI6ImNqb2gzMXFtaTAwMDIzdnFkMGlsOG1iZGUifQ.udQVi4fDBh0cKQO9CxC5gQ'
})

// Thunderforest
var Thunderforest_SpinalMap = L.tileLayer('https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey={apikey}', {
  attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  apikey: '<your apikey>',
  maxZoom: 22
});

//#endregion

$('#txt_selected').text('Italy')

updateMeanItaly()
updateCulturalPlacesItaly()

// Add tile
mymap.addLayer(Wikimedia)

// Init school array
var bologna_school_group = L.featureGroup()
var bologna_school = []

// Add GeoJson layer online from the url
var url_regions = "https://raw.githubusercontent.com/stefanocudini/leaflet-geojson-selector/master/examples/italy-regions.json"

// Define provinces url
var url_provinces = {
  piemonte: "https://raw.githubusercontent.com/Dataninja/geo-shapes/master/italy/regions/1/provinces.geojson",
  valle_d_aosta: "https://raw.githubusercontent.com/Dataninja/geo-shapes/master/italy/regions/2/provinces.geojson",
  liguria: "https://raw.githubusercontent.com/Dataninja/geo-shapes/master/italy/regions/3/provinces.geojson",
  lombardia: "https://raw.githubusercontent.com/Dataninja/geo-shapes/master/italy/regions/4/provinces.geojson",
  veneto: "https://raw.githubusercontent.com/Dataninja/geo-shapes/master/italy/regions/5/provinces.geojson",
  emilia_romagna: "https://raw.githubusercontent.com/Dataninja/geo-shapes/master/italy/regions/6/provinces.geojson",
  toscana: "https://raw.githubusercontent.com/Dataninja/geo-shapes/master/italy/regions/7/provinces.geojson",
  umbria: "https://raw.githubusercontent.com/Dataninja/geo-shapes/master/italy/regions/8/provinces.geojson",
  marche: "https://raw.githubusercontent.com/Dataninja/geo-shapes/master/italy/regions/9/provinces.geojson",
  lazio: "https://raw.githubusercontent.com/Dataninja/geo-shapes/master/italy/regions/10/provinces.geojson",
  abruzzo: "https://raw.githubusercontent.com/Dataninja/geo-shapes/master/italy/regions/11/provinces.geojson",
  molise: "https://raw.githubusercontent.com/Dataninja/geo-shapes/master/italy/regions/12/provinces.geojson",
  campania: "https://raw.githubusercontent.com/Dataninja/geo-shapes/master/italy/regions/13/provinces.geojson",
  puglia: "https://raw.githubusercontent.com/Dataninja/geo-shapes/master/italy/regions/14/provinces.geojson",
  basilicata: "https://raw.githubusercontent.com/Dataninja/geo-shapes/master/italy/regions/15/provinces.geojson",
  calabria: "https://raw.githubusercontent.com/Dataninja/geo-shapes/master/italy/regions/16/provinces.geojson",
  sicilia: "https://raw.githubusercontent.com/Dataninja/geo-shapes/master/italy/regions/17/provinces.geojson",
  // Sardegna updated 2018
  // sardegna: "https://raw.githubusercontent.com/sebucci/sebucci.github.io/master/dataset/geo/sardegna_prov01012018.geojson"
  sardegna: "https://raw.githubusercontent.com/Dataninja/geo-shapes/master/italy/regions/18/provinces.geojson"
}

var region_style = {
  style: {
    fillColor: '#797187',
    weight: 2,
    opacity: .5,
    color: '#5C546B',
    fillOpacity: 0.5
  }
}

var province_style = {
  style: {
    fillColor: '#4FC1E9',
    opacity: 1,
    color: '#434A54',
    fillOpacity: 0.5
  }
}

// Define regions layer
var region_layer = new L.GeoJSON.AJAX(url_regions, region_style)

// Define provinces layers
var piemonte_layer = new L.GeoJSON.AJAX(url_provinces.piemonte, province_style)
var valle_d_aosta_layer = new L.GeoJSON.AJAX(url_provinces.valle_d_aosta, province_style)
var liguria_layer = new L.GeoJSON.AJAX(url_provinces.liguria, province_style)
var lombardia_layer = new L.GeoJSON.AJAX(url_provinces.lombardia, province_style)
var veneto_layer = new L.GeoJSON.AJAX(url_provinces.veneto, province_style)
var emilia_romagna_layer = new L.GeoJSON.AJAX(url_provinces.emilia_romagna, province_style)
var toscana_layer = new L.GeoJSON.AJAX(url_provinces.toscana, province_style)
var umbria_layer = new L.GeoJSON.AJAX(url_provinces.umbria, province_style)
var marche_layer = new L.GeoJSON.AJAX(url_provinces.marche, province_style)
var lazio_layer = new L.GeoJSON.AJAX(url_provinces.lazio, province_style)
var abruzzo_layer = new L.GeoJSON.AJAX(url_provinces.abruzzo, province_style)
var molise_layer = new L.GeoJSON.AJAX(url_provinces.molise, province_style)
var campania_layer = new L.GeoJSON.AJAX(url_provinces.campania, province_style)
var puglia_layer = new L.GeoJSON.AJAX(url_provinces.puglia, province_style)
var basilicata_layer = new L.GeoJSON.AJAX(url_provinces.basilicata, province_style)
var calabria_layer = new L.GeoJSON.AJAX(url_provinces.calabria, province_style)
var sicilia_layer = new L.GeoJSON.AJAX(url_provinces.sicilia, province_style)
var sardegna_layer = new L.GeoJSON.AJAX(url_provinces.sardegna, province_style)


// Add default layer
mymap.addLayer(region_layer)

//#region Map events

// Handle click event
region_layer.on('click', function (e) {

  removeProvinceLayer()

  // Zoom over the region
  mymap.fitBounds(e.layer.getBounds())

  // Take name
  let region_name = e.layer.feature.properties.name

  showCardInfo()
  $('#txt_selected').text(region_name)

  // Update chart
  updateChartRegion(region_name)
  updateMeanRegion(region_name)
  updateCulturalPlacesRegion(region_name)


  // Add province layer
  switch (region_name) {

    case 'valle d\'aosta':
      // TODO remove
      break

    case 'piemonte':
      mymap.addLayer(piemonte_layer)
      break

    case 'liguria':
      mymap.addLayer(liguria_layer)
      break

    case 'lombardia':
      mymap.addLayer(lombardia_layer)
      break

    case 'veneto':
      mymap.addLayer(veneto_layer)
      break

    case 'emilia-romagna':
      mymap.addLayer(emilia_romagna_layer)
      break

    case 'umbria':
      mymap.addLayer(umbria_layer)
      break

    case 'toscana':
      mymap.addLayer(toscana_layer)
      break

    case 'marche':
      mymap.addLayer(marche_layer)
      break

    case 'abruzzo':
      mymap.addLayer(abruzzo_layer)
      break

    case 'lazio':
      mymap.addLayer(lazio_layer)
      break

    case 'molise':
      mymap.addLayer(molise_layer)
      break

    case 'campania':
      mymap.addLayer(campania_layer)
      break

    case 'puglia':
      mymap.addLayer(puglia_layer)
      break

    case 'basilicata':
      mymap.addLayer(basilicata_layer)
      break

    case 'calabria':
      mymap.addLayer(calabria_layer)
      break

    case 'sicilia':
      mymap.addLayer(sicilia_layer)
      break

    case 'sardegna':
      mymap.addLayer(sardegna_layer)
      break
  }

}).addTo(mymap)

// Set click events over provinces
piemonte_layer.on('click', handleProvinceClick)
valle_d_aosta_layer.on('click', handleProvinceClick)
lombardia_layer.on('click', handleProvinceClick)
veneto_layer.on('click', handleProvinceClick)
liguria_layer.on('click', handleProvinceClick)
emilia_romagna_layer.on('click', handleProvinceClick)
toscana_layer.on('click', handleProvinceClick)
umbria_layer.on('click', handleProvinceClick)
marche_layer.on('click', handleProvinceClick)
lazio_layer.on('click', handleProvinceClick)
abruzzo_layer.on('click', handleProvinceClick)
molise_layer.on('click', handleProvinceClick)
campania_layer.on('click', handleProvinceClick)
puglia_layer.on('click', handleProvinceClick)
basilicata_layer.on('click', handleProvinceClick)
calabria_layer.on('click', handleProvinceClick)
sicilia_layer.on('click', handleProvinceClick)
sardegna_layer.on('click', handleProvinceClick)

// Handle zoom
mymap.on('zoomend', function () {

  // Zoom level
  let zoom_level = mymap.getZoom()

  // Italy level, Remove all layer
  if (zoom_level <= 7) {
    removeProvinceLayer()
    hideBolognaSchools()
  }
})

//#endregion

//#region functions

/**
 * Remove all layers
 */
function removeProvinceLayer() {
  mymap.removeLayer(piemonte_layer)
  mymap.removeLayer(valle_d_aosta_layer)
  mymap.removeLayer(lombardia_layer)
  mymap.removeLayer(veneto_layer)
  mymap.removeLayer(liguria_layer)
  mymap.removeLayer(emilia_romagna_layer)
  mymap.removeLayer(toscana_layer)
  mymap.removeLayer(umbria_layer)
  mymap.removeLayer(marche_layer)
  mymap.removeLayer(lazio_layer)
  mymap.removeLayer(umbria_layer)
  mymap.removeLayer(lazio_layer)
  mymap.removeLayer(abruzzo_layer)
  mymap.removeLayer(molise_layer)
  mymap.removeLayer(campania_layer)
  mymap.removeLayer(puglia_layer)
  mymap.removeLayer(basilicata_layer)
  mymap.removeLayer(calabria_layer)
  mymap.removeLayer(sicilia_layer)
  mymap.removeLayer(sardegna_layer)
}

/**
 * 
 * @param {*} e 
 */

/** 
 * 
 */
function reset() {
  selectItaly()
}

/**
 * 
 */
function getBolognaSchools() {

  let bologna_school_url = 'https://raw.githubusercontent.com/sebucci/sebucci.github.io/master/dataset/geo/scuole_bologna.json'

  $.ajax({
      url: bologna_school_url,
      type: 'GET'
    })

    .done(function (schools) {

      schools = JSON.parse(schools)
      bologna_school = schools

      for (let school of schools) {

        L.circle([school.posizione.lat, school.posizione.lon], {
            color: '#434A54',
            fillColor: '#AC92EC',
            fillOpacity: 0.5,
            radius: 50,
            codice_scuola: school.codice_scuola
          }).on('click', function (e) {
            showCardSchool(e.sourceTarget.options.codice_scuola)
          })
          .addTo(bologna_school_group)

      }
    })
}

/**
 * 
 */
function showBolognaSchools() {
  mymap.addLayer(bologna_school_group)
}

/**
 * 
 */
function hideBolognaSchools() {
  mymap.removeLayer(bologna_school_group)
}

//#endregion

$(document).ready(function () {

  getBolognaSchools()
})

function updateMeanItaly() {

  let url_mean_italy = 'https://raw.githubusercontent.com/sebucci/sebucci.github.io/master/Json/mediaediliziaitalia.json'

  $.ajax({
      url: url_mean_italy,
    })

    .done(function (rows) {

      rows = JSON.parse(rows)

      let mean = Number(rows[0].perc).toFixed(1)

      $('#txtConstructionMean')[0].outerHTML = getRightTrafficLight(mean)

      $('[data-toggle="tooltip"]').tooltip()
    })
}

function updateCulturalPlacesItaly() {

  let url_cultural_italy = 'https://raw.githubusercontent.com/sebucci/sebucci.github.io/master/Json/italialuoghiperkm2.json'

  $.ajax({
      url: url_cultural_italy,
    })

    .done(function (rows) {

      rows = JSON.parse(rows)

      let number = Number(rows[0].cikm2).toFixed(4)

      $('#txtCulturalNum')[0].outerHTML = getRightCulturalPlaces(number)

      $('[data-toggle="tooltip"]').tooltip()
    })
}

function updateMeanRegion(region_name) {

  let url_mean_region = 'https://raw.githubusercontent.com/sebucci/sebucci.github.io/master/Json/mediaediliziaregione.json'

  $.ajax({
      url: url_mean_region,
    })

    .done(function (rows) {

      rows = JSON.parse(rows)

      let mean

      for (let region of rows) {
        if (region['regione'] == region_name)
          mean = Number(region['mediaperc']).toFixed(1)
      }

      $('#txtConstructionMean')[0].outerHTML = getRightTrafficLight(mean)

      $('[data-toggle="tooltip"]').tooltip()
    })
}

function updateCulturalPlacesRegion(region_name) {

  let url_cultural_region = 'https://raw.githubusercontent.com/sebucci/sebucci.github.io/master/Json/regioniluoghiperkm2.json'

  $.ajax({
      url: url_cultural_region,
    })

    .done(function (rows) {

      rows = JSON.parse(rows)

      let number

      for (let region of rows)
        if (region['regione'] == region_name)
          number = Number(region.cikm2).toFixed(4)

      $('#txtCulturalNum')[0].outerHTML = getRightCulturalPlaces(number)
      $('[data-toggle="tooltip"]').tooltip()
    })
}

function updateMeanProvince(province_name) {

  let url_mean_province = 'https://raw.githubusercontent.com/sebucci/sebucci.github.io/master/Json/mediaediliziaprovincia.json'

  $.ajax({
      url: url_mean_province,
    })

    .done(function (rows) {

      rows = JSON.parse(rows)

      let mean

      for (let province of rows) {
        if (province['provincia'] == province_name.toLowerCase())
          mean = Number(province['mediaperc']).toFixed(1)
      }

      $('#txtConstructionMean')[0].outerHTML = getRightTrafficLight(mean)

      $('[data-toggle="tooltip"]').tooltip()
    })
}

function updateCulturalPlacesProvince(province_name) {

  let url_cultural_province = 'https://raw.githubusercontent.com/sebucci/sebucci.github.io/master/Json/provluoghiperkm2.json'

  $.ajax({
      url: url_cultural_province,
    })

    .done(function (rows) {

      rows = JSON.parse(rows)

      let number

      for (let province of rows)
        if (province['provincia'] == province_name.toLowerCase())
          number = Number(province.luogoperkm2).toFixed(4)

      $('#txtCulturalNum')[0].outerHTML = getRightCulturalPlaces(number)
      $('[data-toggle="tooltip"]').tooltip()
    })
}

function selectItaly() {

  showCardInfo()

  // Update text
  $('#txt_selected').text('Italy')

  // Set view
  mymap.setView([41.459, 12.700], 6)

  // Remove province
  removeProvinceLayer()

  // UpdateChartItaly
  updateChartItaly()

  // UpdateMeanItaly
  updateMeanItaly()

  // UpdateCulturalPlaces
  updateCulturalPlacesItaly()
}

function getRightTrafficLight(number) {

  let muted = 'muted'
  let red = $(`<i class="fas fa-lightbulb text-danger muted"></i>`)
  let yellow = $(`<i class="fas fa-lightbulb text-warning muted"></i>`)
  let green = $(`<i class="fas fa-lightbulb text-success muted"></i>`)

  if (number >= 0 && number <= 33.3)
    red.removeClass(muted)

  if (number > 33.3 && number <= 66.6)
    yellow.removeClass(muted)

  if (number > 66.6 && number <= 100)
    green.removeClass(muted)

  return `<span id="txtConstructionMean" data-toggle="tooltip" data-placement="top" title="${number}%">
    ${red[0].outerHTML}
    ${yellow[0].outerHTML}
    ${green[0].outerHTML}
  </span>`
}

function getRightCulturalPlaces(number) {

  let cultural_place = $(`<i class="fas fa-university"></i>`)

  number = Number(number)

  if (number > 0 && number < 0.0224)
    return `<span id="txtCulturalNum" data-html="true" data-toggle="tooltip" data-placement="top" title="${number}/km<sup>2</sup>">${cultural_place[0].outerHTML}</span>`

  if (number >= 0.0224 && number < 0.0448)
    return `<span id="txtCulturalNum" data-html="true" data-toggle="tooltip" data-placement="top" title="${number}/km<sup>2</sup>">${cultural_place[0].outerHTML}${cultural_place[0].outerHTML}</span>`

  if (number >= 0.0448)
    return `<span id="txtCulturalNum" data-html="true" data-toggle="tooltip" data-placement="top" title="${number}/km<sup>2</sup>">${cultural_place[0].outerHTML}${cultural_place[0].outerHTML}${cultural_place[0].outerHTML}</span>`

  else
    return `<span id="txtCulturalNum"></span>`
}

let cardInfo = $('#cardInfo')
let CardSchool = $('#CardSchool')
let cardChart = $('#cardChart')

function showCardInfo() {

  cardInfo.show()
  cardChart.show()
  CardSchool.hide()
}

function showCardSchool(school_code) {

  CardSchool.show()
  cardChart.hide()
  cardInfo.hide()

  for (let school of bologna_school)
    if (school_code == school.codice_scuola) {
      CardSchool.find('#school_title').text(school.nome_scuola)
      CardSchool.find('#school_address').text(school.indirizzo)

      CardSchool.find('#school_score').text(school.punteggio)
      CardSchool.find('#school_num_c').text(school.num_cultural_institute)
      CardSchool.find('#txtConstructionMean')[0].outerHTML = getRightTrafficLight(school.percentage)

      $('[data-toggle="tooltip"]').tooltip()
    }
}