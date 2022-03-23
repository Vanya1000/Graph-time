import React, { useEffect, useState } from "react";

import {
	Chart as ChartJS,
	registerables as registerabl,
	LinearScale,
	CategoryScale,
	BarElement,
	PointElement,
	LineElement,
	Legend,
	Tooltip,
} from 'chart.js';

import { Chart } from 'react-chartjs-2';

import { SearchUserType } from "../../../types";
import { useSelector } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";

ChartJS.register(
	LinearScale,
	CategoryScale,
	BarElement,
	PointElement,
	LineElement,
	Legend,
	Tooltip,
	...registerabl
);

type ViewType = {
	
}

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



const View: React.FC<ViewType> = React.memo(({}) => {

	const workTimeData = useSelector((state: AppStateType) => state.lerningTime.dataTimes)

	let hour = workTimeData.map((item: SearchUserType) => { return Number(item.hour) })
	let date = workTimeData.map((item: SearchUserType) => { return item.date })


	const labels = date;

	const data = {
		labels,
		datasets: [
			{
				type: 'bar' as const,
				label: 'Bar',
				data: hour,
				backgroundColor: '#66B2FF',
				
			},
			{
				type: 'line' as const,
				label: 'Line',
				borderColor: '#9e9e9e',
				borderWidth: 3,
				data: hour,
				lineTension: 0.5,
				hidden: true,
			}
		]
	};


	return <Chart
		type='bar'
		data={data}
		options={options}
		height={document.documentElement.clientWidth > 768 ? 370 : 800}
		width={800}
		className="view" />
})

export default View;