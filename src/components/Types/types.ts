export type SearchUserType = {
	_id: string
	date: string
	hour: string
	__v: number
}

export type SearchResult = {
	items: SearchUserType[]
}

export type Inputs = {
	date: string,
	hour: string
};