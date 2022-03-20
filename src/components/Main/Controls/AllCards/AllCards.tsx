import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import s from "./AllCards.module.css";
import { SearchUserType } from '../../../../types';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../../../redux/redux-store';
import ItemCard from './ItemCard.tsx/ItemCard';



type FormPropsType = {
}

const AllCards: React.FC<FormPropsType> = React.memo(({}) => {

	const workTimeData = useSelector((state: AppStateType) => state.lerningTime.dataTimes)

	const [pageNumber, setPageNumber] = useState(1)
	const [selectPaginationCard, setSelectpaginationCard] = useState<SearchUserType[]>(paginate(1))

	function paginate( page_number: number) {
		return [...workTimeData].reverse().slice((page_number - 1) * 10, page_number * 10);
	}

	useEffect(() => {
		setSelectpaginationCard(paginate(pageNumber))
	}, [pageNumber, workTimeData]);
	

	return <div className={s.wrapper} >
		<Pagination  count={Math.ceil(workTimeData.length / 10)} className="pagination" onChange={(e, pageN) => setPageNumber(pageN)}/>
			{selectPaginationCard.map(u => <ItemCard key={u._id}
				card={u}
				/>)}
	</div>
})

export default AllCards