import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[cmsDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') isOpen = false;

  constructor() { }

  @HostListener('click') toggleOpen() {
    // console.log("The dropdown was clicked.");
    this.isOpen = !this.isOpen;
    // console.log("The isOpen variable is now " + this.isOpen);
  }

}
