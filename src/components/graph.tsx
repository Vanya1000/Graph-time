import React, { useEffect, useState } from 'react';

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from '@faker-js/faker';
import { SearchUserType } from '../App';


ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);



type GraphType = {
	date: string[] | undefined
	hour: number[] | undefined
}

const Graph: React.FC<GraphType> = ({ date, hour}) => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const,
			},
			title: {
				display: true
			},
		},
	};


	
	const labels = date

	const data = {
		labels,
		datasets: [
			{
				label: 'Programming',
				data: hour,
				backgroundColor: '#66B2FF',
			}
		],
	};


	return <Bar 
	options={options} 
	data={data}
	height={600}
	width={800} />
}

export default Graph