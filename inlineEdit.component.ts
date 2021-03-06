import { Component, Input, ElementRef, ViewChild, Renderer, forwardRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INLINE_EDIT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InlineEditComponent),
  multi: true
};

@Component({
  selector: 'app-inline-edit',
  templateUrl: './inlineEdit.html',
  providers: [INLINE_EDIT_CONTROL_VALUE_ACCESSOR],
  styleUrls: ['./inlineEdit.scss']
})

export class InlineEditComponent implements ControlValueAccessor, OnInit {

  @ViewChild('inlineEditControl') inlineEditControl: ElementRef; // input DOM element
  @Input() label: string = '';  // Label value for input element
  @Input() type: string = 'text'; // The type of input element
  @Input() required: boolean = false; // Is input requried?
  @Input() disabled: boolean = false; // Is input disabled?
  @Input() fieldupdateoption: string = '';
  private _value: string = ''; // Private variable for input value
  private preValue: string = ''; // The value before clicking to edit
  private editing: boolean = false; // Is Component in edit mode?
  public onChange: any = Function.prototype; // Trascend the onChange event
  public onTouched: any = Function.prototype; // Trascend the onTouch event
  public editState: boolean = false;
  @Output() onParentSaveMethod = new EventEmitter();

  // Control Value Accessors for ngModel
  get value(): any {
    return this._value;
  }

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  constructor(element: ElementRef, private _renderer: Renderer) {
  }

  // Required for ControlValueAccessor interface
  writeValue(value: any) {
    this._value = value;
    
  }
  // Required forControlValueAccessor interface
  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  // Required forControlValueAccessor interface
  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  // // Do stuff when the input element loses focus
  onBlur($event: Event) {
    this.editing = false;
  }

  // // Start the editting process for the input element
  // edit(value) {
  //   if (this.disabled) {
  //     return;
  //   }

  //   this.preValue = value;
  //   this.editing = true;
  //   // Focus on the input element just as the editing begins
  //   setTimeout(_ => this._renderer.invokeElementMethod(this.inlineEditControl,
  //     'focus', []));
  // }

  ngOnInit() {
  }

  editIconButtonClick() {
    //alert('Edit Icon Click');
    this.editState = true;
  }
  save(){    
    this.onParentSaveMethod.emit({option: this.fieldupdateoption, value: this.value});
    this.editState = false;
  }

  toggle(){
    this.editState =  true;
  }

  cancel() {
    //  alert('Cancel Icon Click');
    //this._value = this.preValue;
    this.editState = false;
  }
}
