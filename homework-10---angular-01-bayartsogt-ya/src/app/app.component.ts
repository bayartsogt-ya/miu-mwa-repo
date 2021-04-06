import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <p>AppComponent</p>
    <app-counter-component
      [counterValue]="counterValue"
      (counterValueEmmitter)="getDataFromChildComponent($event)"
    >
    </app-counter-component
    ><br />
    <app-counter-component
      [counterValue]="counterValue"
      (counterValueEmmitter)="getDataFromChildComponent($event)"
    >
    </app-counter-component
    ><br />
    <app-counter-component
      [counterValue]="counterValue"
      (counterValueEmmitter)="getDataFromChildComponent($event)"
    >
    </app-counter-component>
    <p>Counter Value: {{ counterValue }}</p>
  `,
})
export class AppComponent {
  counterValue = 2;
  title = 'homework10';

  getDataFromChildComponent(data) {
    this.counterValue = data;
  }
}
