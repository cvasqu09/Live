export class Event {
	constructor(public eventName: string,
							public categories: Array<string>,
							public numPeople: number,
							public location: Array<number>,
							public start: Date,
							public end: Date,
							public description: string,
							public eventOwner: string,
							public _id: string = null,
							public rsvps: { numRsvps: number, rsvpUsers: Array<string> },
							public reports?: number){}
}