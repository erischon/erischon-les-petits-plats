export class Event {
  constructor() {
    this.handlers = new Map();
    this.count = 0;
  }

  subscribe(handler) {
    this.handlers.set(++this.count, handler);
    return this.count;
  }

  unsubsribe(index) {
    this.handlers.delete(index);
  }

  fire(sender, args) {
    this.handlers.forEach((v, k) => v(sender, args));
  }
}

export class PropertyChangedArgs {
  constructor(name, newValue) {
    this.name = name;
    this.newValue = newValue;
  }
}
