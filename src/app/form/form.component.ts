import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  userForm: FormGroup;
  userdata: any[] = [];
  columnDefs: ColDef[] = [
    { headerName: 'Username', field: 'username' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Gender', field: 'gender' },
    { headerName: 'Hobbies', field: 'hobbies' },
    { headerName: 'Mobile Numbers', field: 'mobileNumber' },
    { headerName: 'Date of Birth', field: 'dob' },
    { headerName: 'City', field: 'city' }
  ];
  rowData: any[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
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
      dob: ['', [Validators.required, this.futureDateValidator]],
      city: ['select', Validators.required],
      agree: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    this.loadUserData();
    console.log('Row Data:', this.rowData);
  }

  loadUserData() {
    const data = localStorage.getItem('userdata');
    if (data) {
      this.userdata = JSON.parse(data);
      this.rowData = this.userdata;
    }
  }

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
    return this.userForm.get('mobileNumber') as FormArray;
  }

  removeFeild(index: number) {
    this.mobileNumbers.removeAt(index);
  }

  addFeild() {
    this.mobileNumbers.push(
      this.formBuilder.control('')
    );
  }

  submitForm() {
    // console.log(this.userForm);
    if (this.userForm.valid && this.userForm.value.agree) {
      this.userdata.push(this.userForm.value);
      localStorage.setItem('userdata', JSON.stringify(this.userdata));
      this.rowData = [...this.userdata];
      console.log(this.userForm.value);
      const checkboxes = document.querySelectorAll('.hobbies');
      checkboxes.forEach(function(checkbox) {
        (checkbox as HTMLInputElement).checked = false;
      });
      this.userForm.reset();
      // this.hobbies.clear();
    } else if (!this.userForm.value.agree) {
      console.log('Agreement Error');
      alert('You must agree to the terms and conditions!!');
    } else {
      alert('Please fill out the form correctly!!');
    }
  }

  futureDateValidator(control: AbstractControl) {
    const today = new Date();
    const date = new Date(control.value);
    if (date > today) {
      return { futureDate: true };
    }
    return null;
  }
}
