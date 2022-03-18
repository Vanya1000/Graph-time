import axios from "axios";
import React, { useEffect, useState } from "react";
import AllCards from "./Controls/AllCards/AllCards";
import Preloader from "../common/Preloader";
import { Inputs, SearchUserType } from "../Types/types";
import s from "./Main.module.css";
import Progress from "./Progress/Progress";
import View from "./View/View";
import Controls from "./Controls/SelectAllCards";
import Form from "../Form";
import Header from "../Header/Header";
import SelectAllCards from "./Controls/SelectAllCards";
import { dataTimesAPI } from "../../api/dataTimes";


const Main = React.memo(() => {
	const [isFetching, setIsFetching] = useState<boolean>(false)
	const [workTimeData, setWorkTimeData] = useState<SearchUserType[]>()

	useEffect(() => {
		(async function () {
			setIsFetching(true)
			let data = await dataTimesAPI.getDataTimes();
			setWorkTimeData(data)
			setIsFetching(false)
		}());
	}, [])

	return <main>
		<div className="_container">
			 <Progress workTimeData={workTimeData} />
			{isFetching && <div className="isFetching"><Preloader /></div>}
			<View workTimeData={workTimeData} />
			<Form setIsFetching={setIsFetching} setWorkTimeData={setWorkTimeData} />
			<SelectAllCards workTimeData={workTimeData} setWorkTimeData={setWorkTimeData} setIsFetching={setIsFetching} />
		</div>
	</main>

})

export default Main;