document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("lab-financial-data-graphing JS imported successfully!");
  },
  false
);

axios({
  method: "GET",
  url: `http://api.coindesk.com/v1/bpi/historical/close.json`
})
  .then(function (response) {
    console.log("ok", response.data);
  })
  .catch(err => console.log(err))