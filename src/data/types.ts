type StadiumDtoListType = null | {
	id: string;
	name: string;
	number: number;
	lat: number;
	lang: number;
	price: number;
	initialPay: number;
	length: number;
	widhth: number;
	description: string;
	startHour: number;
	startMinute: number;
	endHour: number;
	endMinute: number;
	attachmentIds: [string, string];
	isAttachmentId: string;
	shower: boolean;
	shopping: boolean;
	toilet: boolean;
};

export interface MasterType {
	firstName: string;
	id: string;
	lastName: string;
	password: string | null;
	phoneNumber: string;
	role: string;
	userStatus: string;
	stadiumDtoList: StadiumDtoListType;
}
export interface KeysType {
	key: string;
	title: string;
}
export interface StatType {
	icon: JSX.Element;
	number?: number;
	title: string;
}
export type ClassNameType = string;

export interface TableType {
	data: MasterType[];
	keys: KeysType[];
	type: string;
}
