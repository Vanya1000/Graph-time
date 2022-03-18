import axios from "axios";


export const instance = axios.create({
	baseURL: 'https://serene-caverns-54014.herokuapp.com/api/hoursADay'
})