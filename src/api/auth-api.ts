import { SignInFormType, chechAuthType, RegistrationDataType, LoginResponseType } from './../types';
import instance, { ResponseType, ResultCodesEnum } from './api';




export const authAPI = {

	checksAuth() {
		return instance.get<chechAuthType>('auth/me').then(res => res.data)// возвращает промис и мы его ретурним // когда мы делаем запрос мы ожидаем получить тип
	},// достать из local storage и в head

	login(loginData: SignInFormType) {
		return instance.post<ResponseType<LoginResponseType, ResultCodesEnum>>('auth/login', loginData).then(res => res.data)
	},
	registration(registrationData: RegistrationDataType ) {
		return instance.post<ResponseType<{}, ResultCodesEnum>>('auth/registration', registrationData).then(res => res.data)
	}
}
