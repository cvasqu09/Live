export class ToasterNotification{
	static readonly SUCCESS = 1;
	static readonly ERROR = 2;
	static readonly CLEAR = 3;
	constructor(public title: string, public message: string, public type: number){}
}