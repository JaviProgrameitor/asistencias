import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { CategoryScale, Filler, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

function GraficoLinea(props) {
  const { nombresDatos, primerosDatos, segundosDatos, labelPrimeroDatos, labelSegundosDatos } = props

  const miData = {
    labels: nombresDatos,
    datasets: [
      {
        label: labelPrimeroDatos,
        data: primerosDatos,
        tension: 0.5,
        fill: true,
        borderColor: 'rgba(225, 99, 132)',
        backgroundColor: 'rgba(225, 99, 132, 0.5)',
        pointRadius: 5,
        pointBorderColor: 'rgba(255, 99, 132)',
        pointBackgroundColor: 'rgba(255, 99, 132)'
      },
      {
        label: labelSegundosDatos,
        data: segundosDatos,
        tension: 0.5,
        fill: true,
        borderColor: 'rgba(100, 225, 132)',
        backgroundColor: 'rgba(99, 225, 99, 0.5)',
        pointRadius: 5,
        pointBorderColor: 'rgba(100, 225, 132)',
        pointBackgroundColor: 'rgba(100, 225, 132)',
      }
    ]
  }

  const opciones = {
    scales: {
      y : {
        min: 0
      },
      x: {
        ticks: {color: 'black'}
      }
    },
    plugins: {
      title: {
        display: true
      },
      legend: {
        display: true
      }
    }
  }
  
  return (
    <Line
      data={miData}
      options={opciones}
    />
  )
}

export default GraficoLinea