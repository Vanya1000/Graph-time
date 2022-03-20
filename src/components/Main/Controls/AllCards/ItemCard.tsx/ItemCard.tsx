import { Button, Card, CardActions, CardContent, Input, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import React, { useState } from 'react';
import { SearchUserType } from '../../../../../types';
import { useDispatch } from 'react-redux';
import { deleteAndSetNewItemDataTimes, editAndSetNewItemDataTimes } from '../../../../../redux/learningTime-reducer.ts';
import { SubmitHandler, useForm } from 'react-hook-form';


type ItemCardPropsType = {
	card: SearchUserType
}

const ItemCard: React.FC<ItemCardPropsType> = React.memo(({card}) => {
	const dispatch = useDispatch()

	const [editMode, setEditMode] = useState(false)
	const [idEditMode, setIdEditMode] = useState<string>('')


	const deleteCard = (id: string) => {
		dispatch(deleteAndSetNewItemDataTimes(id))
	}


	const { register, setValue, handleSubmit, formState: { errors } } = useForm<SearchUserType>();
	
	const onSubmit: SubmitHandler<SearchUserType> = data => {
		const editData = {
			"_id": idEditMode,
			"date": data.date.replace(/\-/gi, '.'),
			"hour": data.hour.replace(/\:/gi, '.'),
			"__v": 0
		}
		dispatch(editAndSetNewItemDataTimes(editData))
		setEditMode(false)
		setIdEditMode('')
	}




	return <form onSubmit={handleSubmit(onSubmit)}>
		<Card sx={{ minWidth: 345, m: 2 }}>
			<CardContent >
				{(editMode && (idEditMode === card._id)) &&
					<div>
						<div>
							Date: <Input error={errors.date && true} color='primary' type='date' {...register("date", { required: true })} />
						</div>
						<div>
							Count hours: <Input sx={{ m: 2 }} error={errors.hour && true} type='time' {...register("hour", { required: true })} />
						</div>
					</div>}
				{!(editMode && (idEditMode === card._id)) &&
					<div>
						<Typography variant="subtitle1" >
							Date: {card.date}
						</Typography>
						<Typography variant="subtitle1">
							Count hours: {card.hour}
							<br />
						</Typography>
					</div>}
				<CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
					{(editMode && (idEditMode === card._id)) && <Button type="submit" onClick={() => {
					}} startIcon={<SaveIcon />} size="small" >save</Button>}
					{!(editMode && (idEditMode === card._id)) && <Button onClick={() => {
						setIdEditMode(card._id)
						setEditMode(true)
						setValue('date', card.date.replace(/\./gi, '-'))
						setValue('hour', card.hour.replace(/\./gi, ':'))
					}} startIcon={<EditIcon />} size="small" disabled={editMode && true}>Edit</Button>}
					<Button onClick={() => { deleteCard(card._id) }} color="error" startIcon={<DeleteIcon />} size="small">Delite</Button>
				</CardActions>
			</CardContent>
		</Card>
		</form>
	
})

export default ItemCard