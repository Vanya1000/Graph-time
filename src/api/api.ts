import axios from "axios";




const local = 'http://localhost:5000'
const global = 'https://serene-caverns-54014.herokuapp.com'

const instance = axios.create({
	baseURL: local
})


instance.interceptors.request.use((config: any) => {
	//@ts-ignore
	config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("token"))}`
	console.log(config);
	return config
})

export default instance;