
import { Dispatch } from "redux";
import { ResultCodesEnum } from "../api/api";
import { authAPI } from "../api/auth-api";
import { RegistrationDataType, SignInFormType } from "../types";
import { initializeApp } from "./app-reducer";
import { BaseThunkType, InferActionTypes } from "./redux-store";


let initialState = {
	id: null as string | null,
	user: null as string | null,
	isAuth: false,
	isSuccessRegistration: false,
	regErrorMessage: null as string | null,
	loginErrorMessage: null as string | null
};

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case 'auth/SET_USER_DATA':
			return {
				...state, ...action.payload
			}
		case 'auth/SET_IS_SUCCESS_REGISTRATION_DATA':
			return {
				...state, isSuccessRegistration: action.payload
			}
		case 'auth/SET_REGERROR_MESSAGE':
			return {
				...state, regErrorMessage: action.payload
			}
		case 'auth/SET_LOGIN_ERROR_MESSAGE':
			return {
				...state, loginErrorMessage: action.payload
			}
		default:
			return state;
	}

}

type ActionsTypes = InferActionTypes<typeof actions>


export const actions = {
	setAuthUserData: (id: string | null, user: string | null, isAuth: boolean) => ({ type: 'auth/SET_USER_DATA', payload: { id, user, isAuth } } as const),
	setIsSuccessRegistration: (payload: boolean) => ({ type: 'auth/SET_IS_SUCCESS_REGISTRATION_DATA', payload } as const),
	setregErrorMessage: (payload: string | null) => ({ type: 'auth/SET_REGERROR_MESSAGE', payload } as const),
	setLoginErrorMessage: (payload: string | null) => ({ type: 'auth/SET_LOGIN_ERROR_MESSAGE', payload } as const)
}

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = BaseThunkType<ActionsTypes>

export const getAuthUserData = (): ThunkType => async (dispatch: DispatchType) => {//для замыкания что бы thunk мог достучаться до данных переданных в getUsersThunkCreator
	if (localStorage.getItem('token')) {
		let token = JSON.parse(localStorage.getItem("token") || '{}')
		let authData = await authAPI.checksAuth();// дожидаемся именно промиса В респонсе будет сидеть результат которым зарезолвится промис 
		if (authData.user) {
			let { id, user } = authData
			dispatch(actions.setAuthUserData(id, user, true));
		} else {
			dispatch(actions.setAuthUserData(null, null, false));
		}
	}	
}

export const login = (loginData: SignInFormType): ThunkType => async (dispatch) => {
	let resLoginData = await authAPI.login(loginData);
	if (resLoginData.resultCode === ResultCodesEnum.Success) {
		await localStorage.setItem('token', JSON.stringify(resLoginData.data.token));
		dispatch(getAuthUserData())
		dispatch(actions.setLoginErrorMessage(null))
	}
	else {
		dispatch(actions.setLoginErrorMessage(resLoginData.messages[0]))
	}
}

export const logout = (): ThunkType => async (dispatch) => {
	localStorage.removeItem('token');
	dispatch(actions.setAuthUserData(null, null, false));
}

export const registration = (registrationData: RegistrationDataType): ThunkType => async (dispatch) => {
	let resRegistrationData = await authAPI.registration(registrationData);
	if (resRegistrationData.resultCode === ResultCodesEnum.Success) {
		dispatch(actions.setIsSuccessRegistration(true))
		dispatch(actions.setregErrorMessage(null))
	} else {
		dispatch(actions.setregErrorMessage(resRegistrationData.messages[0]))
	}
}

export default authReducer;