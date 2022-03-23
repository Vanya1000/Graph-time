import { newItemDataTimesTypes, SearchUserType } from '../types';
import { instance } from "./api";



export const dataTimesAPI = {
	getDataTimes() {
		return instance.get<SearchUserType[]>('/api/hoursADay')
			.then(res => {
				return res.data;
			})
	},
	saveNewItemDataTimes(newItemDataTimes: newItemDataTimesTypes) {
		return instance.post<SearchUserType>('/api/hoursADay', newItemDataTimes)
			.then(res => {
				return res.data;
			})
	},
	editItemDataTimes(oneItemDataTimes: SearchUserType) {
		return instance.put<SearchUserType>('/api/hoursADay', oneItemDataTimes)
			.then(res => {
				return res.data;
			})
	},
	deleteItemDataTimes(id: string) {
		return instance.delete<SearchUserType>(`/api/hoursADay/${id}`)
			.then(res => {
				return res.data;
			})
	},
	
}