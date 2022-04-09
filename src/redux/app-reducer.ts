import { getAuthUserData } from "./auth-reducer";
import { getworkTimeData } from "./learningTime-reducer.ts";
import { BaseThunkType, InferActionTypes } from "./redux-store";

let initialState = {
	initialized: false,
	darkTheme: false
}

export type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case 'auth/INITIALIZED_SUCCES':
			return {
				...state,
				initialized: true
			}
		case 'auth/CHANGE_THEME':
			return {
				...state,
				darkTheme: action.payload
			}
		default:
			return state;
	}
}



type ActionsTypes = InferActionTypes<typeof actions>

export const actions = {
	initializedSuccess: () => ({ type: 'auth/INITIALIZED_SUCCES' } as const),
	setTheme: (payload: boolean) => ({ type: 'auth/CHANGE_THEME', payload } as const)
}


type ThunkType = BaseThunkType<ActionsTypes>

export const initializeApp = () => {
	return async (dispatch: any) => {
		if (localStorage.getItem('theme')) {
			let theme = await JSON.parse(localStorage.getItem("theme") || '{}')
			dispatch(actions.setTheme(theme));
		}
		let authMe = await dispatch(getAuthUserData())// Веруть auth false если токен умер!
		Promise.all([authMe]).then(() => {
			dispatch(actions.initializedSuccess());
		});
	}
}

export const setAndSaveThemeLocalStorage = (theme: boolean): ThunkType => async (dispatch) => {
	dispatch(actions.setTheme(theme));
	await localStorage.setItem('theme', JSON.stringify(theme));
}


export default appReducer;