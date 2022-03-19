import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import appReducer from "./app-reducer";
import learningTimeReducer from "./learningTime-reducer.ts";


let rootReducer = combineReducers({
	lerningTime: learningTimeReducer,
	app: appReducer

});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType> // спец команда TS




export  type InferActionTypes<T> = T extends {[key: string]: (...arg: any[])=> infer U } ? U : never// для reducer


export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>// вынесли вверх


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
