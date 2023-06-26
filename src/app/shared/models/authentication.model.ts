export type LoginDTO = {
	email: string;
	password: string;
};
export type RegisterDTO = LoginDTO & {
	restaurantId?: string;
	isAdmin: boolean;
	name: string;
};
export type UserDTO = RegisterDTO & {
	id: string;
};
export type LoggedUserDTO = {
	id: string;
	date: Date;
};
