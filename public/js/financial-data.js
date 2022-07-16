let arr = [];
const ctx = document.getElementById("canvas").getContext("2d");
let fromDate = getActualDate(true)
inputFromDate.value = fromDate

let toDate = getActualDate(false)
inputToDate.value = toDate

let chart = null
let currency = "EUR"

callGraph()

// Format la date
function getActualDate(isFrom){
    day = new Date().getDate()
    if (isFrom){
        month = new Date().getMonth() // Mois actuel - 1
    }else {
        month = new Date().getMonth() + 1 // Mois actuel
    }
    
     // Rajoute un 0 avant le mois s'il en en dessous de 10 pour formater la date
    if (month.toString().length === 1){ month = `0${month}`}
    year = new Date().getFullYear()

    return `${year}-${month}-${day}`
}

 // Creer et affiche le graphique
function callGraph(){
    axios({
        method: "GET",
        url: `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=${currency}`,
      })
        .then(function (response) {
          console.log("ok", response.data);
          Object.keys(response.data.bpi).forEach((key) => {
            const value = response.data.bpi[key];
            arr.push(value);
            //console.log("arr = ", arr);
          });

          if (chart !== null){ chart.destroy()}
          chart = new Chart(ctx, {
            type: "line",
            data: {
              labels: Object.keys(response.data.bpi),
              datasets: [
                {
                  label: `Valeur BTC en ${currency}`,
                  data: arr,
                  fill: true,
                  borderColor: "rgb(75, 192, 192)",
                  tension: 0.1,
                },
              ],
            },
          });
        })
        .catch((err) => console.log(err));
}

  inputFromDate = document.querySelector("#inputFromDate")
  inputFromDate.addEventListener("change",event =>{
    updateGraph()
  })
  
  inputToDate = document.querySelector("#inputToDate")
  inputToDate.addEventListener("change",event =>{
    updateGraph()
  })
  
  // Met à jour le graphique pour chaque changement de date
  function updateGraph(){ 
    fromDate = inputFromDate.value
    toDate = inputToDate.value
    ctx.clearRect(0,0,300,150)
    callGraph()
  }