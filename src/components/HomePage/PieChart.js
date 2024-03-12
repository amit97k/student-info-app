// PieChart.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data }) => {

	const peiChartRef = useRef(null);
	let myPieChart = null;

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		width: 400,
		height: 300,
		plugins: {
            title: {
                display: true,
                text: 'Student Grades Distribution',
            },
        },
	};

	const isEmpty = (obj) => {
		return Object.keys(obj).length === 0;
	};

  	const pieChartData = {
		labels: Object.keys(data),
		values: Object.values(data),
		colors : [
			'#FF6384', // Red
			'#36A2EB', // Blue
			'#FFCE56', // Yellow
			'#4BC0C0', // Cyan
			'#FF8C00', // Orange
			'#9966FF', // Purple
			'#32CD32', // Lime Green
			'#808080', // Gray
		]
	};

	

	useEffect(() => {

		if(isEmpty(data))
			return;

		if (peiChartRef && peiChartRef.current) {
			if (myPieChart) {
				myPieChart.destroy();
			}
		
			const ctx = peiChartRef.current.getContext('2d');
			myPieChart = new Chart(ctx, {
				type: 'pie',
				data: {
					labels: pieChartData.labels,
					datasets: [{
						data: pieChartData.values,
						backgroundColor: pieChartData.colors,
					}],
				},
				options: options
			});
		}
	}, [data]);

	return <canvas ref={peiChartRef} />;
};

export default PieChart;
