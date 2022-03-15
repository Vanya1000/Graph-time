import { Autocomplete, Button, Input, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export type Inputs = {
	date: string,
	hour: string
};

type FormPropsType = {
	setSendData: (data: Inputs) => void
}

const Form: React.FC<FormPropsType> = ({ setSendData }) => {
	const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = data => {
		setSendData(data)
		reset();
	}
	
	return <div>
		{/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input  error={errors.date && true} color='primary' type='date' {...register("date", { required: true })} />
			<Input sx={{ m: 2 }} error={errors.hour && true} type='time' {...register("hour", { required: true })} />
			{/* errors will return when field validation fails  */}
			<Button sx={{ m: 4 }} variant="contained" type="submit" color={errors.hour || errors.date  ? 'error' : 'primary'}>
				Send
			</Button>
		</form>
	</div>
}

export default Form

