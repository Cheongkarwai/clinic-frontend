import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inquiry-form',
  templateUrl: './inquiry-form.component.html',
  styleUrls: ['./inquiry-form.component.css'],
})
export class InquiryFormComponent implements OnInit {

  form!:FormGroup;

  group:any = {}

  @Input() formAttribute:any;

  @Output() submitForm = new EventEmitter<FormGroup>();

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.constructForm();
  }

  constructForm(){

    if(this.form){
      for(let control in this.form.controls){
        console.log(control);
        this.form.removeControl(control);
      }
    }

    for(let row of this.formAttribute){
      for(let control of row.inputs){
        this.group[control.key] = [control.value,this.getValidators(control.validators)]
      }
    }

    this.form = this.fb.group(this.group);
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes['formAttribute'].currentValue != changes['formAttribute'].previousValue){
      this.constructForm();
    }
  }

  handleClickSubmitForm(){
    console.log(this.form);
    this.submitForm.emit(this.form);
  }

  getValidators(validators:any[]):Validators[]{

    const validatorsArr:Validators[] = [];

    validators.forEach(validator=>{

      if(validator.type === 'required'){
        validatorsArr.push(Validators.required);
      }
    });

    return validatorsArr;
  }

}
