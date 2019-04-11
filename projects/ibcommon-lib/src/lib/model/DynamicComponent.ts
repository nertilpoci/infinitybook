import { Input } from '@angular/core';

export class DynamicComponent<T> {
  
  @Input()
  context: T;
}
