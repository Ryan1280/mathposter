function calculate() {
    // 입력값 받아오기
    const input = document.getElementById("returns").value;
    const returns = input.split(",").map(Number);

    // 산술 평균 계산
    const arithmeticMean = returns.reduce((a, b) => a + b, 0) / returns.length;

    // 기하 평균 계산
    const geometricMean =
        Math.pow(returns.reduce((a, b) => a * (1 + b), 1), 1 / returns.length) - 1;

    // 결과 출력
    document.getElementById("results").innerHTML = `
        산술 평균: ${(arithmeticMean * 100).toFixed(2)}%<br>
        기하 평균: ${(geometricMean * 100).toFixed(2)}%
    `;

    // 데이터 시각화
    drawChart(returns, arithmeticMean, geometricMean);
}

function drawChart(returns, arithmeticMean, geometricMean) {
    const ctx = document.getElementById("chart").getContext("2d");

    // 기존 차트 제거
    if (window.myChart) {
        window.myChart.destroy();
    }

    // 차트 생성
    window.myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: returns.map((_, i) => `Year ${i + 1}`),
            datasets: [
                {
                    label: "수익률",
                    data: returns,
                    borderColor: "blue",
                    fill: false,
                },
                {
                    label: "산술 평균",
                    data: Array(returns.length).fill(arithmeticMean),
                    borderColor: "green",
                    borderDash: [5, 5],
                    fill: false,
                },
                {
                    label: "기하 평균",
                    data: Array(returns.length).fill(geometricMean),
                    borderColor: "red",
                    borderDash: [10, 5],
                    fill: false,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: (value) => `${(value * 100).toFixed(0)}%`,
                    },
                },
            },
        },
    });
}
