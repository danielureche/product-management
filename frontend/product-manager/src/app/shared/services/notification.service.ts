import {Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  message = signal('');
  type = signal<'success' | 'error'>('success');
  visible = signal(false);

  show(msg: string, type: 'success' | 'error' = 'success') {
    this.message.set(msg);
    this.type.set(type);
    this.visible.set(true);

    setTimeout(() => {
      this.visible.set(false);
    }, 3000);
  }

  success(msg: string) {
    this.show(msg, 'success');
  }

  error(msg: string) {
    this.show(msg, 'error');
  }
}
