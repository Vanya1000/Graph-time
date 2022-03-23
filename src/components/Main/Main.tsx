import React from "react";
import Preloader from "../common/Preloader";
import Progress from "./Progress/Progress";
import View from "./View/View";
import Form from "./Form/Form";
import SelectAllCards from "./Controls/SelectAllCards";
import { useSelector } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import SignIn from "../../Login/SignIn";





const Main = React.memo(() => {
	
	const isFetching = useSelector((state: AppStateType) => state.lerningTime.isFetching)

	return <main>
		<div className="_container">
			<SignIn/>
			{/* <>
				<Progress />
				{isFetching && <div className="isFetching"><Preloader /></div>}
				<View />
				<Form />
				<SelectAllCards />
			</> */}
		</div>
	</main>

})

export default Main;