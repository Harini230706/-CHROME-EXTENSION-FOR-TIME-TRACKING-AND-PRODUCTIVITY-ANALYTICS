const ctx = document.getElementById('chart').getContext('2d');

// Step 1: Initial dummy chart
const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Hours Worked ',
      data: [2, 4, 3, 5, 6, 1, 0],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// Step 2: Fetch real data and update chart
fetch("http://localhost:3000/api/data")
  .then(res => res.json())
  .then(data => {
    const labels = Object.keys(data);
    const values = Object.values(data).map(seconds => seconds / 60); // convert to minutes
    const colors = labels.map(site =>
      site.includes("youtube") ? "red" : "green"
    );

    // Update existing chart with real data
    myChart.data.labels = labels;
    myChart.data.datasets[0].label = 'Minutes Spent';
    myChart.data.datasets[0].data = values;
    myChart.data.datasets[0].backgroundColor = colors;
    myChart.update();
  })
  .catch(err => {
    console.error("Failed to fetch productivity data:", err);
  });
