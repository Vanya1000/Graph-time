
import { Dispatch } from "redux";
import { authAPI } from "../api/auth-api";
import { SignInFormType } from "../types";
import { initializeApp } from "./app-reducer";
import { BaseThunkType, InferActionTypes } from "./redux-store";


let initialState = {
	id: null as string | null,
	user: null as string | null,
	isAuth: false
};

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case 'auth/SET_USER_DATA':
			return {
				...state, ...action.payload
			}
		default:
			return state;
	}

}

type ActionsTypes = InferActionTypes<typeof actions>


export const actions = {
	setAuthUserData: (id: string | null, user: string | null, isAuth: boolean) => ({ type: 'auth/SET_USER_DATA', payload: { id, user, isAuth } } as const)
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
		}
	}	
}

export const login = (loginData: SignInFormType): ThunkType => async (dispatch: any) => {
	let resLoginData = await authAPI.login(loginData);
	if (resLoginData.token) {
		await localStorage.setItem('token', JSON.stringify(resLoginData.token));
		dispatch(getAuthUserData())
	}
}



export default authReducer;