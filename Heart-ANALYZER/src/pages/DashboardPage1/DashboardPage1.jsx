


// // Importing 'database' directly from 'firebase' instead of 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database';
// import { fire } from '../../config/firebase';
import fire from '../../config/firebase';
import React, { useRef,useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
Chart.register(CategoryScale);
// import Graph from './graph';

const DashboardPage1 = () => {
  const [arrayX, setArrayX] = useState([]);
  const [arrayY, setArrayY] = useState([]);
  const chartRef = useRef(); // Create a ref for the chart

  useEffect(() => {
    // Function to destroy the previous chart
    const destroyChart = () => {
      if (chartRef.current) {
        const chartInstance = chartRef.current.chartInstance;
        if (chartInstance) {
          chartInstance.destroy();
        }
      }
    };

    destroyChart(); // Destroy any existing chart
  }, []);

  //console.log(data.ecgData.ecgValue);
  useEffect(() => {
    const fetchData = () => {
      const database = getDatabase(fire);
      const databaseRef = ref(database, '/ecgData');

      onValue(databaseRef, (snapshot) => {
        const data = snapshot.val();

        const ecgValues = data.ecgValue || {};
        const timestamps = data.timeStamp || {};

        const x = Object.values(timestamps);//.map((key) => parseInt(key.replace('data_', ''), 10));
        const key = Object.keys(timestamps);
        const y = Object.values(ecgValues);

        setArrayX(x);
        setArrayY(y);
      });
    };
    console.log(arrayX);
    console.log(arrayY);
    fetchData();
    return () => {
      const database = getDatabase(fire);
      const databaseRef = ref(database, '/ecgData');
    };
  }, []);

  return (
    <>
      <Line
        ref={chartRef}
        style={{ width: "auto", height: "900px" }}
        datasetIdKey="id"
        data={{
          labels: arrayX,
          datasets: [
            {
              id: 1,
              label: "",
              data: arrayY,
            },
          ],
        }}
      />
    </>
  );
};

export default DashboardPage1;


