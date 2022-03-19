import { getworkTimeData } from "./learningTime-reducer.ts";
import { InferActionTypes } from "./redux-store";

let initialState = {
	initialized: false
}

export type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case 'auth/INITIALIZED_SUCCES':
			return {
				...state,
				initialized: true
			}
		default:
			return state;
	}
}

type ActionsTypes = InferActionTypes<typeof actions>

export const actions = {
	initializedSuccess: () => ({ type: 'auth/INITIALIZED_SUCCES' } as const)
}

export const initializeApp = () => {
	return (dispatch: any) => {
		let promise = dispatch(getworkTimeData());
		Promise.all([promise]).then(() => {// если несколько 
			dispatch(actions.initializedSuccess());
		});
	}
}

export default appReducer;