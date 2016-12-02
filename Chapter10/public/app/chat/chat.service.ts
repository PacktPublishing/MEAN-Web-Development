import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '../authentication/authentication.service';

@Injectable()
export class ChatService {
	private socket: any;
	
	constructor(private _router:Router, 
				private _authenticationService: AuthenticationService) {
		if (this._authenticationService.isLoggedIn()) {
			this.socket = io();
		} else {
			this._router.navigate(['Home']);
		}
	}

    on(eventName, callback) {
		if (this.socket) {
			this.socket.on(eventName, function(data) {
				callback(data);
			});
		}
    };

    emit(eventName, data) {
		if (this.socket) {
			this.socket.emit(eventName, data);
		}
    };

    removeListener(eventName) {
		if (this.socket) {
			this.socket.removeListener(eventName);
		}
    };
}
