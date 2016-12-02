import {Component} from '@angular/core';
import {ChatService} from './chat.service';

@Component({
  selector: 'chat',
  templateUrl: 'app/chat/chat.template.html',
  providers: [ChatService]
})
export class ChatComponent {
	messageText: string;
	messages: Array<any>;

	constructor(private _chatService: ChatService) {}
	
	ngOnInit() {
		this.messages = new Array();
		
		this._chatService.on('chatMessage', (msg) => {
			this.messages.push(msg);
		});
	}

	sendMessage() {
		var message = {
			text: this.messageText,
		};

		this._chatService.emit('chatMessage', message);
		this.messageText = ''
	}

	ngOnDestroy() {
		this._chatService.removeListener('chatMessage');
	}
}