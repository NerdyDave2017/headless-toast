import { ToastT, ToastToDismiss } from "./types";

let toastCounter = 1;

class Observer {
  subscribers: Array<(toast: ToastT | ToastToDismiss) => void>;
  toasts: Array<ToastT>;
  dismissedToasts: Set<string | number>;

  constructor() {
    this.subscribers = [];
    this.toasts = [];
    this.dismissedToasts = new Set();
  }

  publish(toast: ToastT) {
    this.subscribers.forEach((subscriber) => subscriber(toast));
  }

  subscribe(subscriber: (toast: ToastT | ToastToDismiss) => void) {
    this.subscribers.push(subscriber);

    return () => {
      const index = this.subscribers.indexOf(subscriber);
      this.subscribers.splice(index, 1);
    };
  }

  dismiss = (id?: number | string) => {
    if (!id) {
      this.toasts.forEach((toast) => {
        this.dismissedToasts.add(toast.id);
        this.subscribers.forEach((subscriber) =>
          subscriber({ id: toast.id, dismiss: true })
        );
      });
      return;
    }

    this.dismissedToasts.add(id);

    this.subscribers.forEach((subscriber) => subscriber({ id, dismiss: true }));
    return id;
  };

  addToast(toast: ToastT) {
    this.publish(toast);
    this.toasts = [...this.toasts, toast];
  }
}

export const ToastState = new Observer();

const toastFunction = (toast: Omit<ToastT, "id">) => {
  const id = toastCounter++;

  ToastState.addToast({
    id,
    ...toast,
  });
};

export const toast = toastFunction;
