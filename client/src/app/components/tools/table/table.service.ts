import { Injectable, ApplicationRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class TableService {
	public updates = new BehaviorSubject<void>(undefined);

	constructor(private appRef: ApplicationRef) {}

	public refresh() {
		this.appRef.tick();
		this.updates.next();
	}
}
