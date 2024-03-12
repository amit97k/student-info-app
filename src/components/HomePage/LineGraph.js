// LineChart.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ joiners, leavers }) => {

    const lineChartRef = useRef(null);
    let myLineChart = null;

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        width: 400,
        height: 300,
        scales: {
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Count',
                },
                ticks: {
                    stepSize: 1,
                },
            },
        },
        plugins: {
            title: {
                display: true,
                text: 'Joiners and Leavers per Day',
            },
        },
    };
    
    const isEmpty = (obj) => {
	    return Object.keys(obj).length === 0;
    };

    const labels = Object.keys(joiners);
    const joinerCounts = Object.values(joiners);
    const leaverCounts = labels.map((day) => (day in leavers ? leavers[day] : 0));

    useEffect(() => {

        if(isEmpty(joiners) && isEmpty(leavers))
            return;

        if (lineChartRef && lineChartRef.current) {
            if (myLineChart) {
                myLineChart.destroy();
            }

        const ctx = lineChartRef.current.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [
                {
                    label: 'Joiners',
                    borderColor: 'blue',
                    data: joinerCounts,
                    fill: false,
                },
                {
                    label: 'Leavers',
                    borderColor: 'red',
                    data: leaverCounts,
                    fill: false,
                },
                ],
            },
            options: options,
        });
    }

        
    }, [joiners, leavers]);

    return <canvas ref={lineChartRef} />;
};

export default LineChart;
