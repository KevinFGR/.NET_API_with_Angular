import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail-events',
  templateUrl: './detail-events.component.html',
  styleUrls: ['./detail-events.component.scss']
})
export class DetailEventsComponent implements OnInit{
  eventDetailForm! : FormGroup;
  
  get EDFItem(): any{
    return this.eventDetailForm.controls;
  }

  constructor(private fb:FormBuilder) { }
  
  ngOnInit(): void { 
    this.validation()
  }
  
  public validation():void{
    this.eventDetailForm = this.fb.group({
      
      theme: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(50)]],
      local: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      peopleQtt: ['', [Validators.required, Validators.max(999999)]],
      eventDate: ['', [Validators.required]],
      number: ['', [Validators.required]],
      imageURL: ['', [Validators.required]]
    })
    
  }

}
