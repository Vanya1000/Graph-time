import { newItemDataTimesTypes, SearchUserType } from '../types';
import { instance } from "./api";


export const dataTimesAPI = {
	getDataTimes() {
		return instance.get<SearchUserType[]>('')
			.then(res => {
				return res.data;
			})
	},
	saveNewItemDataTimes(newItemDataTimes: newItemDataTimesTypes) {
		return instance.post<SearchUserType>('', newItemDataTimes)
			.then(res => {
				return res.data;
			})
	},
	editItemDataTimes(oneItemDataTimes: SearchUserType) {
		return instance.put<SearchUserType>('', oneItemDataTimes)
			.then(res => {
				return res.data;
			})
	},
	deleteItemDataTimes(id: string) {
		return instance.delete<SearchUserType>(`/${id}`)
			.then(res => {
				return res.data;
			})
	},
	
}