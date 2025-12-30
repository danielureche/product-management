import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationService } from './shared/services/notification.service';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent],
  template: `
    <main>
      <app-toast
        [message]="notify.message()"
        [type]="notify.type()"
        [visible]="notify.visible()"
      />
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {
  title = 'product-manager';
  notify = inject(NotificationService);
}
