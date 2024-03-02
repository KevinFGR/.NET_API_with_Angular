import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-events',
  templateUrl: './detail-events.component.html',
  styleUrls: ['./detail-events.component.scss']
})
export class DetailEventsComponent implements OnInit{
  constructor(private fb:FormBuilder,
              private router:ActivatedRoute,
              private eventoService: EventoService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) { }
              
              
  ngOnInit(): void { 
    this.loadEvent();
    this.validation();
  }

  eventDetailForm! : FormGroup;
  get EDFItem(): any{
    // EDFItem => EventDetailForm Item
    return this.eventDetailForm.controls;
  }

  event = {} as Evento;
  public loadEvent():void{
    this.spinner.show();
    const eventIdParam = this.router.snapshot.paramMap.get('id')

    if (eventIdParam != null){
      // the pluss icon (+) before the string var changes the type to int
      this.eventoService.getEventById(+eventIdParam).subscribe(
        (event:Evento) => {
          this.spinner.hide();
          // copying the event returnt by getEventoById to the event var;
          // If you just type <this.event = event> the js will vinculate the memory addrees. It won't make a copy  
          this.event = {...event}; 
          this.eventDetailForm.patchValue(this.event);
        },
        (error:any) => {
          this.spinner.hide();
          this.toastr.error("Error trying get event.");
          console.log(error);
        },
        () => {this.spinner.hide();}
      );
    }
    this.spinner.hide();
  }
  
  
  public validation():void{
    this.eventDetailForm = this.fb.group({
      
      tema: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(50)]],
      local: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      qtdPessoas: ['', [Validators.required, Validators.max(999999)]],
      dataEvento: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      imagemURL: ['', [Validators.required]]
    })
  }

  public cssValidator(FItem:FormControl):any{
    return {'is-invalid' : FItem.errors && FItem.touched};
  }
  public saveChanges():void{
    this.spinner.show();
    if(this.eventDetailForm.valid){
      this.event = {... this.eventDetailForm.value};

      this.eventoService.postEvent(this.event).subscribe(
        () => {
          this.spinner.hide();
          this.toastr.success('Event successfully saved', "Success");},
        (error:any) => {
          this.spinner.hide();
          this.toastr.error(`Error trying save Event; ${error}`, "Error");
          console.error(error);
        },
        () => {this.spinner.hide();},
      );
    }
  }
  
}
