import { SignInFormType, loginApiType, chechAuthType } from './../types';
import { instance } from "./api";




export const authAPI = {

	checksAuth() {
		return instance.get<chechAuthType>('auth/me').then(res => res.data)// возвращает промис и мы его ретурним // когда мы делаем запрос мы ожидаем получить тип
	},// достать из local storage и в head

	login(loginData: SignInFormType) {
		return instance.post<loginApiType>('auth/login', loginData).then(res => res.data)
	}
}