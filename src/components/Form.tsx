import { Autocomplete, Button, Input, TextField } from '@mui/material';
import axios from 'axios';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { dataTimesAPI } from '../api/dataTimes';
import { Inputs, SearchUserType } from './Types/types';


type FormPropsType = {
	setIsFetching: (bolean: boolean) => void
	setWorkTimeData: (value: React.SetStateAction<SearchUserType[] | undefined>) => void
}

const Form: React.FC<FormPropsType> = React.memo(({ setIsFetching, setWorkTimeData }) => {
	const [sendData, setSendData] = useState<Inputs>()

	useEffect(() => {
		if (sendData) {
				(async function () {
					setIsFetching(true)
					let revisedData = {
						"date": sendData.date.replace(/-/gi, '.'),
						"hour": sendData.hour.replace(/:/gi, '.')
					}
					let data = await dataTimesAPI.saveNewItemDataTimes(revisedData);
					setWorkTimeData((actual) => [...actual!, data])
					setIsFetching(false)
				}());
		}
	}, [sendData])


	const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = data => {
		setSendData(data)
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

