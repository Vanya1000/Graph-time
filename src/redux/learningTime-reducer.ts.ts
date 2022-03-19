
import { Dispatch } from "redux";
import { dataTimesAPI } from "../api/dataTimes";
import { Inputs, SearchUserType } from "../types";
import { BaseThunkType, InferActionTypes } from "./redux-store";


let initialState = {
	dataTimes: [] as Array<SearchUserType>,
	isFetching: false
};

export type InitialStateType = typeof initialState

const learningTimeReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case 'SET_DATA_TIMES':
			return {
				...state,
				dataTimes: action.dataTimes
			}
		case 'SET_NEW_ITEM_DATA_TIMES':
			return {
				...state,
				dataTimes: [...state.dataTimes, action.newItemDataTimes] 
			}
		case 'SET_EDIT_ITEM_DATA_TIMES':
			return {
				...state,
				dataTimes: state.dataTimes.map(p => p._id === action.editItemDataTimes._id ? { ...p, ['date']: action.editItemDataTimes.date, ['hour']: action.editItemDataTimes.hour } : p)
			}
		case 'SET_DELETE_ITEM_DATA_TIMES':
			return {
				...state,
				dataTimes: state.dataTimes.filter(p => p._id !== action.id)//! есть вопросы по immutable
			}
		case 'TOGGLE_IS_FETCHING':
			return {
				...state,
				isFetching: action.isFetching
			}
		default:
			return state;
	}
	
}

type ActionsTypes = InferActionTypes<typeof actions>


export const actions = {
	toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
	setdataTimes: (dataTimes: Array<SearchUserType>) => ({type: 'SET_DATA_TIMES', dataTimes} as const),
	setNewItemDataTimes: (newItemDataTimes: SearchUserType) => ({ type: 'SET_NEW_ITEM_DATA_TIMES', newItemDataTimes } as const),
	setEditItemDataTimes: (editItemDataTimes: SearchUserType) => ({ type: 'SET_EDIT_ITEM_DATA_TIMES', editItemDataTimes } as const),
	setDeleteItemDataTimes: (id: string) => ({ type: 'SET_DELETE_ITEM_DATA_TIMES', id } as const)
}

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = BaseThunkType<ActionsTypes>

export const getworkTimeData = (): ThunkType => async (dispatch) => {//для замыкания что бы thunk мог достучаться до данных переданных в getworkTimeData
	dispatch(actions.toggleIsFetching(true));
	let data = await dataTimesAPI.getDataTimes();
	dispatch(actions.setdataTimes(data));
	dispatch(actions.toggleIsFetching(false));
}

export const sendAndSetNewItemDataTimes = (revisedData: Inputs): ThunkType => async (dispatch) => {
	dispatch(actions.toggleIsFetching(true));
	let data = await dataTimesAPI.saveNewItemDataTimes(revisedData);
	dispatch(actions.setNewItemDataTimes(data))
	dispatch(actions.toggleIsFetching(false));
}

export const editAndSetNewItemDataTimes = (editCard: SearchUserType): ThunkType => async (dispatch) => {
	dispatch(actions.toggleIsFetching(true));
	let data = await dataTimesAPI.editItemDataTimes(editCard);
	dispatch(actions.setEditItemDataTimes(data))
	dispatch(actions.toggleIsFetching(false));
}

export const deleteAndSetNewItemDataTimes = (id: string): ThunkType => async (dispatch) => {
	dispatch(actions.toggleIsFetching(true));
	let data = await dataTimesAPI.deleteItemDataTimes(id);
	dispatch(actions.setDeleteItemDataTimes(data._id))
	dispatch(actions.toggleIsFetching(false));
}



export default learningTimeReducer;