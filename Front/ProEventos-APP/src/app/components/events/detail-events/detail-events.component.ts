import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
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
              private spinner: NgxSpinnerService,
              private localeService: BsLocaleService) 
    {
      // If you want to set DatePicker to portuguese
      // this.localeService.use('pt-br');
    } 
    ngOnInit(): void { 
      this.loadEvent();
      this.validation();
    }
  
  // this variable mean the mode of change to make on the databese on save  (POST or PUT)
  saveState = 'postEvent';
  
  // For DatePicker configuration
  // The JS is adding 3 hours in the date-time input. This is happening because of the GMT 
  bsConfig: any = {
    // localeService: "pt-br",
    withTimepicker: true, 
    adaptivePosition: true,
    dateInputFormat: 'DD/MM/YYYY hh:mm a',
    showWeekNumbers: false,
    containerClass: 'theme-default'
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
      this.saveState = 'putEvent';
      // the pluss icon (+) before the string var changes the type to int
      this.eventoService.getEventById(+eventIdParam).subscribe(
        (event:Evento) => {
          
          // copying the event returned by getEventoById to the event var;
          // If you just type <this.event = event> the js will vinculate the memory addrees. It won't make a copy  
          this.event = {...event}; 
          this.eventDetailForm.patchValue(this.event);
        },
        (error:any) => {
          
          this.toastr.error("Error trying get event.");
          console.log(error);
        },
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


      this.saveState === 'postEvent' ? 
        this.event = {... this.eventDetailForm.value}: 
        this.event = {id: this.event.id,
                      ... this.eventDetailForm.value};

      this.eventoService[this.saveState](this.event).subscribe(
        () => {
          this.toastr.success('Event successfully saved', "Success");},
        (error:any) => {
          this.toastr.error(`Error trying save Event; ${error}`, "Error");
          console.error(error);
        },
      ).add(
        ()=>{this.spinner.hide()}
      );
    }
  }
  
}
