import axios from "axios";


const getToken = () => {
	if (localStorage.getItem('token')) {
		return JSON.parse(localStorage.getItem("token") || '{}')
	}
}
getToken()

const local = 'http://localhost:5000'
const global = 'https://serene-caverns-54014.herokuapp.com'
export const instance = axios.create({
	baseURL: local,
	headers: {
		'Authorization': `Bearer ${getToken()}`
	}
})