import { Switch } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { dataTimesAPI } from "../../../api/dataTimes";
import Form from "../../Form";
import { Inputs, SearchUserType } from "../../Types/types";
import AllCards from "./AllCards/AllCards";

type SelectAllCardsPropsType = {
	setIsFetching: (bolean: boolean) => void
	workTimeData: SearchUserType[] | undefined
	setWorkTimeData: (value: React.SetStateAction<SearchUserType[] | undefined>) => void
}

const SelectAllCards: React.FC<SelectAllCardsPropsType> = React.memo(({ workTimeData, setWorkTimeData, setIsFetching  }) => {
	const [isCard, setIsCard] = useState(false)
	const [editCard, setEditCard] = useState<SearchUserType | null>(null)
	const [deleteCard, setDeleteCard] = useState<string | null>(null)

	useEffect(() => {
		if (editCard) {
			(async function () {
				setIsFetching(true)
				let data = await dataTimesAPI.editItemDataTimes(editCard);
				setWorkTimeData((actual) => actual!.map(p => p._id === editCard._id ? { ...p, ['date']: data.date, ['hour']: data.hour } : p))
				setIsFetching(false)
			}());
		}
	}, [editCard])

	useEffect(() => {
		if (deleteCard) {
			(async function () {
				setIsFetching(true)
				let data = await dataTimesAPI.deleteItemDataTimes(deleteCard);
				setWorkTimeData((actual) => actual!.filter(p => p._id !== deleteCard))
				setIsFetching(false)
			}());
		}
	}, [deleteCard])

	return <>
		<Switch onChange={() => { setIsCard(isCard ? false : true) }} />
		<span>Edit and view all card time</span>
		{isCard && <AllCards setDeleteCard={setDeleteCard} workTimeData={workTimeData} setEditCard={setEditCard} />}
		</>
})

export default SelectAllCards;