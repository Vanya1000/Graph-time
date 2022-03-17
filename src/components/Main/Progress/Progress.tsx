import { Card, CardContent, Typography } from "@mui/material";
import { type } from "os";
import React, { useEffect, useState } from "react";
import { SearchUserType } from "../../Types/types";

type ProgressPropsType = {
	workTimeData: SearchUserType[] | undefined
}

const Progress: React.FC<ProgressPropsType> = React.memo(({ workTimeData}) => {
	const [allminutes, setAllMinutes] = useState<number>(0)
	const [average, setAverage] = useState<number>(0)

	useEffect(() => {
		if (workTimeData) {
			setAllMinutes(workTimeData?.reduce((previous: number, item: any) => {
				let hourArr = (item.hour).split('.');
				let minutes = Number(hourArr[0]) * 60 + Number(hourArr[1]);
				return minutes + previous
			}, 0))
		}
	}, [workTimeData])

	useEffect(() => {
		if (workTimeData) {
			setAverage((allminutes / workTimeData.length) / 60)
		}
	}, [allminutes])

	return <>
		<Card >
			<CardContent >
				<Typography variant="subtitle1" >
					Total training time: {`${(allminutes / 60).toFixed(0)}h  ${(allminutes % 60)}min`}
				</Typography>
				<Typography variant="subtitle1" >
					Average learning time: {average.toFixed(1)}h per day.
				</Typography>
			</CardContent>
		</Card>
	</>
})


export default Progress;