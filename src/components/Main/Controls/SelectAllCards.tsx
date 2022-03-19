import { Switch } from "@mui/material";
import React, { useState } from "react";
import AllCards from "./AllCards/AllCards";

type SelectAllCardsPropsType = {

}

const SelectAllCards: React.FC<SelectAllCardsPropsType> = React.memo(({}) => {
	const [isCard, setIsCard] = useState(false)

	return <>
		<Switch onChange={() => { setIsCard(isCard ? false : true) }} />
		<span>Edit and view all card time</span>
		{isCard && <AllCards />}
		</>
})

export default SelectAllCards;