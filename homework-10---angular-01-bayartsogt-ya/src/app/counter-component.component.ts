import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-counter-component',
  template: `
    <p>CounterComponent</p>
    <button (click)="decrement()">-</button>
    <input type="number" value="{{ counterValue }}" disabled />
    <button (click)="increment()">+</button>
  `,
  styles: [],
})
export class CounterComponentComponent implements OnInit {
  @Input() counterValue;
  @Output() counterValueEmmitter = new EventEmitter();

  emitMessageToParent = () => {
    this.counterValueEmmitter.emit(this.counterValue);
  };

  decrement = () => {
    this.counterValue--;
    this.emitMessageToParent();
  };

  increment = () => {
    this.counterValue++;
    this.emitMessageToParent();
  };

  constructor() {}

  ngOnInit(): void {}
}
