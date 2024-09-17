export interface MasterType {
	firstName: string;
	id: string;
	lastName: string;
	password: string | null;
	phoneNumber: string;
	role: string;
	userStatus: string;
}
export interface KeysType {
	key: string;
	title: string;
}
export interface StatType {
	icon: JSX.Element;
	number: string;
	title: string;
}
export type ClassNameType = string;
