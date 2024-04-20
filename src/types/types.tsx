export type notandi = {
	avatar?: string;
	group_id?: number;
	id: number;
	isadmin: boolean;
	password?: string;
	username: string
}

export type project = {
	status: number,
	title: string,
	group_id: number,
	creator_id: number,
	assigned_id?: number,
	description?: string
};

export type group = {
	id: number,
	admin_id: number,
	name: string
}
