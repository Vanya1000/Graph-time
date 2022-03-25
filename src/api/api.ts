import axios from "axios";




const local = 'http://localhost:5000'
const global = 'https://serene-caverns-54014.herokuapp.com'

const instance = axios.create({
	baseURL: local
})


instance.interceptors.request.use((config: any) => {
	//@ts-ignore
	config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("token"))}`
	return config
})

export default instance;

export enum ResultCodesEnum {
	Success = 0,
	Error = 1
}

export type ResponseType<D = {}, RC = ResultCodesEnum> = {//  он не точен, его нужно будет уточнить по умолчан d равен пустому типу
	data: D // generic тип D data
	messages: Array<string>
	resultCode: RC // какой то result code тип

}