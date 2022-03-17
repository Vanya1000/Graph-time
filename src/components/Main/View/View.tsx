import React, { useEffect, useState } from "react";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from "react-chartjs-2";
import { SearchUserType } from "../../Types/types";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
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
})

export default View;