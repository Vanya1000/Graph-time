import React, { useEffect, useState } from "react";

import {
	Chart as ChartJS,
	LinearScale,
	CategoryScale,
	BarElement,
	PointElement,
	LineElement,
	Legend,
	Tooltip,
} from 'chart.js';
import { Bar } from "react-chartjs-2";
import { SearchUserType } from "../../Types/types";
import faker from "@faker-js/faker";

ChartJS.register(
	LinearScale,
	CategoryScale,
	BarElement,
	PointElement,
	LineElement,
	Legend,
	Tooltip
);

type ViewType = {
	workTimeData: SearchUserType[] | undefined
}



const View: React.FC<ViewType> = React.memo(({ workTimeData }) => {

	const [date, setDate] = useState<string[]>()
	const [hour, setHour] = useState<number[]>()

	useEffect(() => {
		if (workTimeData) {
			let mapHours = workTimeData.map((item: SearchUserType) => { return Number(item.hour) })
			setHour(mapHours)
			let mapDate = workTimeData.map((item: SearchUserType) => { return item.date })
			setDate(mapDate)
		}
	}, [workTimeData])

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
				type: 'bar' as const,
				label: 'Bar',
				data: hour,
				backgroundColor: '#66B2FF',
			},
			{
				type: 'line' as const,
				label: 'Line',
				borderColor: '#9e9e9e',
				disabled: true,
				borderWidth: 3,
				fill: false,
				data: hour,
				lineTension: 0.5,
				hidden: true,
			},
		],
	};


	return <Bar
		options={options}
		//@ts-ignore
		data={data}
		height={document.documentElement.clientWidth > 768 ? 370 : 800}
		width={800} />
})

export default View;