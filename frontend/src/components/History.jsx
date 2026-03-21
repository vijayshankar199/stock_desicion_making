import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { useLocation } from "react-router-dom";
import "../style/history.css";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

function History() {

  const location = useLocation();
  const stock = location.state;
  console.log(stock)

  const [chartData, setChartData] = useState(null);

  useEffect(() => {

    if (!stock) return;

    const fetchData = async () => {
      try {

        const res = await axios.get(
          "http://127.0.0.1:8000/stock/stock/data/" + stock + "/"
        );
        console.log("Stock:", stock);

        const { dates, close } = res.data;

        setChartData({
          labels: dates,
          datasets: [
            {
              label: stock + " Price",
              data: close,
              borderColor: "#00f7ff",
              backgroundColor: "rgba(0,247,255,0.2)",
              borderWidth: 3,
              tension: 0.4,
              pointRadius: 0,
              fill: true
            }
          ]
        });

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

  }, [stock]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false
    },
    plugins: {
      legend: {
        labels: {
          color: "#fff"
        }
      }
    },
    scales: {
      x: {
        ticks: { color: "#aaa" },
        grid: { color: "rgba(255,255,255,0.05)" }
      },
      y: {
        ticks: { color: "#aaa" },
        grid: { color: "rgba(255,255,255,0.05)" }
      }
    }
  };

  return (
    <div className="history-page">
      <div className="dashboard-container">
        <div className="chart-card">
          <h2 className="chart-title">
            {stock} PAST HISTORY
          </h2>

          <div className="chart-wrapper">
            {chartData && <Line data={chartData} options={options} />}
          </div>

        </div>

      </div>

    </div>
  );
}

export default History;