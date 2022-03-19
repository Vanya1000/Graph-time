import { Button, Input } from '@mui/material';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { sendAndSetNewItemDataTimes } from '../../../redux/learningTime-reducer.ts';
import { Inputs } from '../../../types';


type FormPropsType = {

}

const Form: React.FC<FormPropsType> = React.memo(({}) => {

	const dispatch = useDispatch()

	const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = data => {
		let revisedData = {
			"date": data.date.replace(/-/gi, '.'),
			"hour": data.hour.replace(/:/gi, '.')
		}
		dispatch(sendAndSetNewItemDataTimes(revisedData))
		reset();
	}
	
	return <div>
		<form onSubmit={handleSubmit(onSubmit)}>
			Date:<Input sx={{ m: 2 }} error={errors.date && true} color='primary' type='date' {...register("date", { required: true })} />
			Hours:<Input sx={{ m: 2 }} error={errors.hour && true} type='time' {...register("hour", { required: true })} />
			<Button sx={{ m: 4 }} variant="contained" type="submit" color={errors.hour || errors.date  ? 'error' : 'primary'}>
				Send
			</Button>
		</form>
	</div>
})

export default Form

