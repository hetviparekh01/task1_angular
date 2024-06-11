import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  constructor(private formBuilder: FormBuilder) {

  }
  userForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    gender: ['', Validators.required],
    hobbies: this.formBuilder.array([], Validators.required),
    mobileNumber: this.formBuilder.array([
      this.formBuilder.control('', [
        Validators.required,
        Validators.pattern(/^\d{10}$/)
      ])
    ]),
    dob: ['', [Validators.required, futureDateValidator()]],
    city: ['select', Validators.required],
    agree: [false, Validators.requiredTrue]
  })

  onCheckboxChange(e: any) {
    const hobbies: FormArray = this.userForm.get('hobbies') as FormArray;
    if (e.target.checked) {
      hobbies.push(new FormControl(e.target.value));
    } else {
      const index = hobbies.controls.findIndex(x => x.value === e.target.value);
      hobbies.removeAt(index);
    }
  }
  get hobbies(): FormArray {
    return this.userForm.get('hobbies') as FormArray;
  }

  get mobileNumbers() {
    return this.userForm.get('mobileNumber') as FormArray
  }

  removeFeild(index: number) {
    this.mobileNumbers.removeAt(index)
  }
  addFeild() {
    this.mobileNumbers.push(
      this.formBuilder.control('',[Validators.required,Validators.pattern(/^\d{10}$/)])
    )
  }
  submitForm() {
    console.log(this.userForm);
    if (this.userForm?.valid && this.userForm.value.agree) {
      console.log(this.userForm.value);
      this.userForm.reset();
      this.hobbies.clear();
    }
    else if(!this.userForm.value.agree) {
      console.log("Agreement Error");
      alert("You must agree to the terms and conditions!!")
    }
    else{
      alert("Please fill out the form correctly!!")
    }
  }
}

function futureDateValidator() {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const currentDate = new Date();
    const inputDate = new Date(control.value);
    if (inputDate > currentDate) {
      return { 'futureDate': true };
    }
    return null;
  };
}

