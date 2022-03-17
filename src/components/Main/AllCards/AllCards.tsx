import { Button, Card, CardContent, Typography, CardActions, Input } from '@mui/material';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import s from "./AllCards.module.css";
import { SubmitHandler, useForm } from 'react-hook-form';
import { SearchUserType } from '../../Types/types';



type FormPropsType = {
	workTimeData: SearchUserType[] | undefined
	setEditCard: (editData: SearchUserType) => void
	setDeleteCard: (id: string) => void
}

const AllCards: React.FC<FormPropsType> = React.memo(({ workTimeData, setEditCard, setDeleteCard }) => {
	const [editMode, setEditMode] = useState(false)
	const [idEditMode, setIdEditMode] = useState<string | null>(null)

	const { register, setValue, handleSubmit, formState: { errors } } = useForm<SearchUserType>();
	const onSubmit: SubmitHandler<SearchUserType> = data => {
		
		const editData = {
			"_id": idEditMode,
			"date": data.date.replace(/\-/gi, '.'),
			"hour": data.hour.replace(/\:/gi, '.'),
			"__v": 0
		}
		//@ts-ignore string _id  maybe not
		setEditCard(editData);
		setEditMode(false)
		setIdEditMode(null)
	}

	return <div className={s.wrapper} >
		<form onSubmit={handleSubmit(onSubmit)}>
			{workTimeData?.slice().reverse().map(u => <Card key={u._id} sx={{ minWidth: 345, m: 2 }}>
				<CardContent >
					{(editMode && (idEditMode === u._id)) &&
						<div>
							<div>
								Date: <Input error={errors.date && true} color='primary' type='date' {...register("date", { required: true })} />
							</div>
							<div>
								Count hours: <Input sx={{ m: 2 }} error={errors.hour && true} type='time' {...register("hour", { required: true })} />
							</div>
						</div>}
					{!(editMode && (idEditMode === u._id)) &&
						<div>
							<Typography variant="subtitle1" >
								Date: {u.date}
							</Typography>
							<Typography variant="subtitle1">
								Count hours: {u.hour}
								<br />
							</Typography>
						</div>}
					<CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
						{(editMode && (idEditMode === u._id)) && <Button type="submit" onClick={() => {
						}} startIcon={<SaveIcon />} size="small" >save</Button>}
						{!(editMode && (idEditMode === u._id)) && <Button onClick={() => {
							setIdEditMode(u._id)
							setEditMode(true)
							setValue('date', u.date.replace(/\./gi, '-'))
							setValue('hour', u.hour.replace(/\./gi, ':'))
						}} startIcon={<EditIcon />} size="small" disabled={editMode && true}>Edit</Button>}
						<Button onClick={() => { setDeleteCard(u._id)}} color="error" startIcon={<DeleteIcon />} size="small">Delite</Button>
					</CardActions>
				</CardContent>
			</Card>)}
			</form>
	</div>
})

export default AllCards