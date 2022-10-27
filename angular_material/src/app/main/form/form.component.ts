import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
// import { Location } from '@angular/common'; 



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  myAddresses = new FormGroup({
    address: new FormControl(null),
    zipcode: new FormControl(null),
    city: new FormControl(null),
    country: new FormControl(null),
  });
  myForm: any = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null),
    age: new FormControl(null),
    gender: new FormControl(null),
    email: new FormControl(null),
    position: new FormControl(null),
    martialstatus: new FormControl(null),
    addresses: this.myAddresses,
  });

  isEdit: boolean = false;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    // private location:Location
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.queryParamMap.get('userId');
    this.isEdit = id != null;
    console.log(id);

    if (this.isEdit) {
      this.dataService.list
        .pipe(first((items) => items.length !== 0))
        .subscribe((items) => {
          const item = items.find((items) => items.id === id);
          this.setFormValues(item);
        });
    }
  }

  setFormValues(user: any) {
    this.myForm.setValue(user);
  }

  onSubmit() {
    if(this.isEdit){
      this.dataService.updateUser(this.myForm.value)
    }else{
      this.dataService.addUserToList(this.myForm.value);
    }
    // this.location.back()
  }
}
