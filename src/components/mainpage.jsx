import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import data from './data.json'; // Adjust the path if needed

const SalesGraph = () => {
  const [chartData, setChartData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [highestSalesIndividual, setHighestSalesIndividual] = useState({ name: '', totalSales: 0 });

  useEffect(() => {
    if (data && Array.isArray(data.salesByIndividual)) {
      const salesData = data.salesByIndividual;

      // Calculate total sales per individual
      const totalSalesByIndividual = salesData.map(individual => {
        const totalSales = individual.sales.reduce((acc, sale) => acc + sale.totalSales, 0);
        return { name: individual.name, totalSales };
      });

      // Sort by totalSales in descending order and take the top 5 individuals
      const topSalesData = totalSalesByIndividual.sort((a, b) => b.totalSales - a.totalSales).slice(0, 5);

      const chartData = [
        ['Individual', 'Total Sales'],
        ...topSalesData.map(individual => [individual.name, individual.totalSales])
      ];

      const totalSales = topSalesData.reduce((acc, individual) => acc + individual.totalSales, 0);
      const highestSales = topSalesData.reduce((max, individual) => (individual.totalSales > max.totalSales ? individual : max), topSalesData[0]);

      setChartData(chartData);
      setTotalSales(totalSales);
      setHighestSalesIndividual(highestSales);
    }
  }, []);

  if (!data || !Array.isArray(data.salesByIndividual)) {
    return <div>Loading data...</div>;
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '75%', padding: '20px' }}>
        <div style={{ height: '300px' }}> {/* Set a fixed height for the chart */}
          <Chart
            chartType="Bar"
            width="100%"
            height="300px"
            data={chartData}
            options={{
              chart: {
                title: 'Total Sales by Individual',
              },
              hAxis: {
                title: 'Total Sales',
                minValue: 0,
              },
              vAxis: {
                title: 'Individual',
              },
            }}
          />
        </div>
        <div style={{ marginTop: '20px' }}>
          <h3>Total Sales: {totalSales}</h3>
        </div>
      </div>
      <div style={{ width: '25%'}} className='p-2 bg-blue-200'>
        <h3 className='text-2xl font-bold'>Highest Sales Individual</h3>
        <div className='p-6'>
        <p>Name: {highestSalesIndividual.name}</p>
        <p>Total Sales: {highestSalesIndividual.totalSales}</p>
        </div>
        <h3 className='text-2xl font-bold '>All Individuals Sales</h3>
        <div className='p-6'>
        {
          data.salesByIndividual.map((individual, index) => (
            <div key={index} className='border-b-4 p-3'>
              {individual.name}: {individual.sales.reduce((acc, sale) => acc + sale.totalSales, 0)}
            </div>
          ))
        }
        </div>
      </div>
    </div>
  );
};

export default SalesGraph;
