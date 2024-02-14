import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail-events',
  templateUrl: './detail-events.component.html',
  styleUrls: ['./detail-events.component.scss']
})
export class DetailEventsComponent implements OnInit{
  constructor(private fb:FormBuilder) { }
  
  eventDetailForm! : FormGroup;

  get EDFItem(): any{
    // EDFItem => EventDetailForm Item
    return this.eventDetailForm.controls;
  }
  
  ngOnInit(): void { 
    this.validation();
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
