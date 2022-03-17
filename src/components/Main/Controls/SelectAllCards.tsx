import { Switch } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "../../Form";
import { Inputs, SearchUserType } from "../../Types/types";
import AllCards from "../AllCards/AllCards";

type SelectAllCardsPropsType = {
	setIsFetching: (bolean: boolean) => void
	workTimeData: SearchUserType[] | undefined
	setWorkTimeData: React.Dispatch<React.SetStateAction<SearchUserType[] | undefined>>
}

const SelectAllCards: React.FC<SelectAllCardsPropsType> = React.memo(({ workTimeData, setWorkTimeData, setIsFetching  }) => {
	const [isCard, setIsCard] = useState(false)
	const [editCard, setEditCard] = useState<SearchUserType | null>(null)
	const [deleteCard, setDeleteCard] = useState<string | null>(null)

	useEffect(() => {
		if (editCard) {
			setIsFetching(true)
			axios
				.put('https://serene-caverns-54014.herokuapp.com/api/hoursADay', editCard)
				.then(res => {
					setWorkTimeData((actual) => actual!.map(p => p._id === editCard._id ? { ...p, ['date']: res.data.date, ['hour']: res.data.hour } : p))
					setIsFetching(false)
				})
		}

	}, [editCard])

	useEffect(() => {
		if (deleteCard) {
			setIsFetching(true)
			axios
				.delete(`https://serene-caverns-54014.herokuapp.com/api/hoursADay/${deleteCard}`)
				.then(res => {
					setWorkTimeData((actual) => actual!.filter(p => p._id !== deleteCard))
					setIsFetching(false)
				})
		}

	}, [deleteCard])

	return <>
		<Switch onChange={() => { setIsCard(isCard ? false : true) }} />
		<span>Edit and view all card time</span>
		{isCard && <AllCards setDeleteCard={setDeleteCard} workTimeData={workTimeData} setEditCard={setEditCard} />}
		</>
})

export default SelectAllCards;