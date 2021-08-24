import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { api, getUserId } from '../services/api';

const options = {
    maintainAspectRatio: true,
    responsive: true,
    scales: {
        y: {
            beginAtZero: true,
        },
    },
}

function DashboardChart(props){
    const type = props.type;
    const [receber, setReceber] = useState([]);
    const [pagar, setPagar] = useState([]);
    const [labels, setLabels] = useState([]);
    
    useEffect(() => {
        api.get('/contas/home/chart/'+getUserId())
            .then((response) => {
                console.log(response.data)
                setReceber(response.data.contas_receber);
                setPagar(response.data.contas_pagar);
                setLabels(response.data.nomes_banco);
            })
    }, []);

    const data = {
        labels: labels,
    
        datasets: [{
            categoryPercentage: 0.5,
            barPercentage: 0.8,
            label: type == 'pagar' ? 'Valores a pagar (Neste mês)' : 'Valores a receber (Neste mês)',
            data: type == 'pagar' ? pagar : receber,
            backgroundColor: [
                type == 'pagar' ? 'rgba(179, 18, 23, 0.7)' : 'rgba(0, 153, 51, 0.7)',
            ],
            borderColor: [
                type == 'pagar' ? 'rgba(179, 18, 23, 1)' : 'rgba(0, 153, 51, 1)',
            ],
            borderWidth: 1
        }]
    }

    if (type === 'green') {
        return(
            <Bar data={data} options={options} />
        );
    }else{
        return(
            <Bar data={data} options={options} />
        );
    }
}

export default DashboardChart;