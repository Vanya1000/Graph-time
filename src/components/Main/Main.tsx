import React from "react";
import Preloader from "../common/Preloader";
import Progress from "./Progress/Progress";
import View from "./View/View";
import Form from "./Form/Form";
import SelectAllCards from "./Controls/SelectAllCards";
import { useSelector } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import SignIn from "../../Login/SignIn";
import { Route, Routes } from "react-router-dom";
import SignUp from "../../Login/SignUp";





const Main = React.memo(() => {// из за мемо?
	
	const isFetching = useSelector((state: AppStateType) => state.lerningTime.isFetching)


	return <main>
		<div className="_container">
			<Routes>
				<Route path="/" element={
					<>
						<Progress />
						{isFetching && <div className="isFetching"><Preloader /></div>}
						<View />
						<Form />
						<SelectAllCards />
					</>
				}/>
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route
					path="*"
					element={
						<main style={{ padding: "1rem" }}>
							<p>There's nothing here!</p>
						</main>
					}
				/>
			</Routes>
		</div>
	</main>

})

export default Main;