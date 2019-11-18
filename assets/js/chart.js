/**
 * 
 */

var colors = {
  red: "#FE0000",
  red_orange: "#E9573F",
  orange: "#FC6E51",
  orange_yellow: "#F6BB42",
  yellow: "#FFCE54",
  yellow_green: "#A0D468",
  green: "#8CC152",
  super_green: "#37BC9B"
}

var chart
var ctx = document.getElementById('chart_autovalutazione').getContext('2d')

var background_color = [
  colors.red_orange,
  colors.orange,
  colors.orange_yellow,
  colors.yellow,
  colors.yellow_green,
  colors.green,
  colors.super_green
]

var regions_disambiguation = {
  "piemonte": "PIEMONTE",
  "lombardia": "LOMBARDIA",
  "veneto": "VENETO",
  "friuli venezia giulia": "FRIULI-VENEZIA G.",
  "liguria": "LIGURIA",
  "emilia-romagna": "EMILIA ROMAGNA",
  "umbria": "UMBRIA",
  "toscana": "TOSCANA",
  "marche": "MARCHE",
  'abruzzo': "ABRUZZO",
  'lazio': "LAZIO",
  'molise': "MOLISE",
  'campania': "CAMPANIA",
  'puglia': "PUGLIA",
  'basilicata': "BASILICATA",
  'calabria': "CALABRIA",
  'sicilia': "SICILIA",
  'sardegna': "SARDEGNA"
}

function updateChartRegion(region_name) {

  url_region_data = "https://raw.githubusercontent.com/sebucci/sebucci.github.io/master/Json/percregioni.json"

  $.ajax({
      url: url_region_data,
      type: 'GET'
    })

    // On success
    .done(function (regions) {

      regions = JSON.parse(regions)

      let data = []

      // Get right region
      for (region of regions) {
        if (region["regione"] == regions_disambiguation[region_name]) {
          data = fixData(region)
          break
        }
      }

      updateChart(data)
    })
}

function updateChartProvince(province_name) {

  url_province_data = 'https://raw.githubusercontent.com/sebucci/sebucci.github.io/master/Json/percprov.json'

  $.ajax({
      url: url_province_data,
      type: 'GET'
    })

    // On success
    .done(function (provinces) {

      provinces = JSON.parse(provinces)

      let data = []

      // Get right region
      for (province of provinces) {
        if (province["provincia"] == province_name) {
          data = fixData(province)
          break
        }
      }

      updateChart(data)
    })
}

function updateChartItaly() {

  url_italy_data = "https://raw.githubusercontent.com/sebucci/sebucci.github.io/master/Json/percitalia.json"

  // Get data
  $.ajax({
      url: url_italy_data,
      type: 'GET'
    })

    // On success
    .done(function (data) {

      updateChart(JSON.parse(data))
    })
}

function setupChart() {

  url_italy_data = "https://raw.githubusercontent.com/sebucci/sebucci.github.io/master/Json/percitalia.json"

  // Get data
  $.ajax({
      url: url_italy_data,
      type: 'GET'
    })

    // On success
    .done(function (data) {

      let real_data = []
      let school_num = 0

      for (elem of JSON.parse(data)) {

        real_data.push(Number(elem["percentuale"]).toFixed(2))
        school_num += parseInt(elem['numero'])
      }

      updateSchoolN(school_num)

      // Labels
      var labels = ["Score 1", "Score 2", "Score 3", "Score 4", "Score 5", "Score 6", "Score 7"]

      chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
          datasets: [{
            backgroundColor: background_color,
            data: real_data
          }],
          labels: labels
        },

        // Configuration options go here
        options: {
          responsive: true,
          legend: {
            display: false
          },
          title: {
            display: false,
          },
          animation: {
            animateScale: true,
            animateRotate: true
          },
          tooltips: {
            enabled: true,
            mode: 'single',
            callbacks: {
              label: function (tooltipItems, data) {
                return tooltipItems.yLabel + '% of schools';
              }
            }
          },
        }
      })
    })
}

/**
 * 
 * @param {*} data 
 */
function updateChart(data) {

  let real_data = []
  let school_num = 0
  let cultural_num = 0

  for (elem of data) {
    real_data.push(Number(elem["percentuale"]).toFixed(2))
    school_num += parseInt(elem['numero'])
  }

  updateSchoolN(school_num)

  // Remove dataset 
  chart.data.datasets.forEach((dataset) => {
    dataset.data = []
  })

  // Re-add dataset
  chart.data.datasets.forEach((dataset) => {
    dataset.data = real_data
  })

  // Update dataset
  chart.update()

}

/**
 * 
 * @param {*} element 
 */
function fixData(element) {

  return [{
    "valutazione": "1",
    "percentuale": element["1perc"],
    "numero": element["1tot"]
  }, {
    "valutazione": "2",
    "percentuale": element["2perc"],
    "numero": element["2tot"]
  }, {
    "valutazione": "3",
    "percentuale": element["3perc"],
    "numero": element["3tot"]
  }, {
    "valutazione": "4",
    "percentuale": element["4perc"],
    "numero": element["4tot"]
  }, {
    "valutazione": "5",
    "percentuale": element["5perc"],
    "numero": element["5tot"]
  }, {
    "valutazione": "6",
    "percentuale": element["6perc"],
    "numero": element["6tot"]
  }, {
    "valutazione": "7",
    "percentuale": element["7perc"],
    "numero": element["7tot"]
  }]
}

setupChart()

function updateSchoolN(num) {
  $('#txtSchoolNum').text(num)
}
