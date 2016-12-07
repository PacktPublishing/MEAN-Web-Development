import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ChatRoutes } from './chat.routes';
import { ChatService } from './chat.service';
import { ChatComponent } from './chat.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ChatRoutes),
  ],
  declarations: [
    ChatComponent,
  ],
  providers: [
    ChatService
  ]
})
export class ChatModule {}
