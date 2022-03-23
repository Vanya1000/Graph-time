import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";

type ProgressPropsType = {

}

const Progress: React.FC<ProgressPropsType> = React.memo(({ }) => {

	const allminutes = useSelector((state: AppStateType) => {
		return state.lerningTime.dataTimes.reduce((previous: number, item: any) => {
			let hourArr = (item.hour).split('.');
			let minutes = Number(hourArr[0]) * 60 + Number(hourArr[1]);
			return minutes + previous
		}, 0)
	})

	const average = useSelector((state: AppStateType) => {
		return ((allminutes / state.lerningTime.dataTimes.length) / 60)
	})
	

	return <div className="view">
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
	</div>
})


export default Progress;