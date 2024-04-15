window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2",
        exportEnabled: true,
        title: {
            text: "비트코인 30일 캔들 차트"
        },
        axisY: {
            title: "가격",
            includeZero: false,
            prefix: "$"
        },
        data: [{
            type: "candlestick",
            yValueFormatString: "$#,##0.00",
            dataPoints: []
        }]
    });

    fetch('https://api.coindesk.com/v1/bpi/historical/close.json?start=2023-03-01&end=2023-03-30')
        .then(response => response.json())
        .then(data => {
            const bpiData = data.bpi;
            const dataPoints = chart.options.data[0].dataPoints;
            for (let date in bpiData) {
                dataPoints.push({
                    x: new Date(date),
                    y: [bpiData[date], bpiData[date], bpiData[date], bpiData[date]] // 일반적인 캔들 데이터 구조: [open, high, low, close]
                });
            }
            chart.render();
        })
        .catch(error => console.error('Error fetching data:', error));
};
