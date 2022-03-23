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

export type newItemDataTimesTypes = {
	date: string;
	hour: string;
}


export type SignInFormType = {
	username: string;
	password: string;
	rememberMe: boolean;
}

export type loginApiType = {
	token: string;
	id: string;
	user: string;
}

export type chechAuthType = {
	id: string;
	user: string;
}