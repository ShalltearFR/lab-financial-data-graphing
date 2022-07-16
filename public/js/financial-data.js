let arr = [];
const ctx = document.getElementById("canvas").getContext("2d");

axios({
  method: "GET",
  url: `http://api.coindesk.com/v1/bpi/historical/close.json`,
})
  .then(function (response) {
    console.log("ok", response.data);
    Object.keys(response.data.bpi).forEach((key) => {
      const value = response.data.bpi[key];
      arr.push(value);
      console.log("arr = ", arr);
    });
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: Object.keys(response.data.bpi),
        datasets: [
          {
            label: "My First Dataset",
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
