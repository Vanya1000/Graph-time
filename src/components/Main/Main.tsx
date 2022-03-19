import React, { useEffect, useState } from "react";
import Preloader from "../common/Preloader";
import { SearchUserType } from "../../types";
import Progress from "./Progress/Progress";
import View from "./View/View";
import Form from "./Form/Form";
import SelectAllCards from "./Controls/SelectAllCards";
import { dataTimesAPI } from "../../api/dataTimes";


const Main = React.memo(() => {

	const [isFetching, setIsFetching] = useState<boolean>(false)//! Заменить
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
			<Progress/>
			{isFetching && <div className="isFetching"><Preloader /></div>}
			<View />
			<Form />
			<SelectAllCards />
		</div>
	</main>

})

export default Main;