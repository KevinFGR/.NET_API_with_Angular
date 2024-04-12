import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from '@app/models/Evento';
import { Lote } from '@app/models/Lote';
import { EventoService } from '@app/services/evento.service';
import { LoteService } from '@app/services/lote.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-events',
  templateUrl: './detail-events.component.html',
  styleUrls: ['./detail-events.component.scss']
})
export class DetailEventsComponent implements OnInit{
  constructor(private fb:FormBuilder,
              private activateRouter:ActivatedRoute,
              private router:Router,
              private eventoService: EventoService,
              private loteService: LoteService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private localeService: BsLocaleService,
              private modalService: BsModalService) 
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

  get editMode(){
    return this.saveState === "putEvent";
  }
  
  // For DatePicker configuration
  // The JS is adding 3 hours in the date-time input. This is happening because of the GMT 
  bsConfigEvent: any = {
    // localeService: "pt-br",
    withTimepicker: true, 
    adaptivePosition: true,
    dateInputFormat: 'DD/MM/YYYY hh:mm a',
    showWeekNumbers: false,
    containerClass: 'theme-default'
  }
  
  bsConfigLot: any = {
    withTimepicker: false, 
    adaptivePosition: true,
    dateInputFormat: 'DD/MM/YYYY',
    showWeekNumbers: false,
    containerClass: 'theme-default'
  }

  eventDetailForm! : FormGroup;
  get EDFItem(): any{
    // EDFItem => EventDetailForm Item
    return this.eventDetailForm.controls;
  }

  event = {} as Evento;
  eventId:number;
  public loadEvent():void{
    this.spinner.show();
    // the pluss icon (+) before the string var changes the type to int
    this.eventId = +this.activateRouter.snapshot.paramMap.get('id');

    if (this.eventId != null && this.eventId !== 0){
      this.saveState = 'putEvent';
      this.eventoService.getEventById(this.eventId).subscribe(
        (event:Evento) => {
          
          // copying the event returned by getEventoById to the event var;
          // If you just type <this.event = event> the js will vinculate the memory addrees. It won't make a copy  
          this.event = {...event}; 
          this.eventDetailForm.patchValue(this.event);
          // this.loadLots();
          this.event.lotes.forEach(lote =>{
            this.lots.push(this.createLot(lote));
          });
        },
        (error:any) => {
          
          this.toastr.error("Error trying get event.");
          console.log(error);
        },
      );
    }
    this.spinner.hide();
  }

  public saveEvent():void{
    this.spinner.show();
    if(this.eventDetailForm.valid){


      this.saveState === 'postEvent' ? 
        this.event = {... this.eventDetailForm.value}: 
        this.event = {id: this.event.id,
                      ... this.eventDetailForm.value};

      this.eventoService[this.saveState](this.event).subscribe(
        (eventReturn: Evento) => {
          this.toastr.success('Event successfully saved', "Success");
          this.router.navigate([`events/details/${eventReturn.id}`])},
        (error:any) => {
          this.toastr.error(`Error trying save Event; ${error}`, "Error");
          console.error(error);
        },
      ).add(
        ()=>{this.spinner.hide()}
      );
    }
  }

  public validation():void{
    this.eventDetailForm = this.fb.group({
      
      tema: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(50)]],
      local: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      qtdPessoas: ['', [Validators.required, Validators.max(999999)]],
      dataEvento: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      imagemURL: ['', [Validators.required]],
      lotes: this.fb.array([])
    })
  }

  public cssValidator(FItem:FormControl | AbstractControl):any{
    return {'is-invalid' : FItem.errors && FItem.touched};
  }

  // working at the interactive Lots Form
  get lots(): FormArray{
    return this.eventDetailForm.get('lotes') as FormArray;
  }
  public createLot(lot:any):FormGroup{
    return this.fb.group({     
      id : [lot.id],
      nome : [lot.nome, Validators.required],
      preco : [lot.preco, Validators.required],
      quantidade : [lot.quantidade, Validators.required],
      dataInicio : [lot.dataInicio, Validators.required],
      dataFim : [lot.dataFim, Validators.required]
    });
  }
  
  public addLot():void{
    this.lots.push(
        this.createLot({id: 0}));
  }
  
  public saveLots():void{
    this.spinner.show();
    if(this.lots.valid){
      this.loteService.saveLotes(this.eventId , this.lots.value)
      .subscribe(
        ()=>{
          this.toastr.success('Lots successfuly saved', "Success!");
        },
        (error:any)=>{
          this.toastr.error(`Something wrong occurred trying to save Lots: ${error}`, "Error!");
        }
      ).add(()=>this.spinner.hide());
    }
  }

  modalRef?: BsModalRef;
  lotToDelete:any;
  public modalDelete(lot, template: TemplateRef<any>): void {
    // This is the Delete button modal
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    this.lotToDelete = lot;
    console.log(this.lots.value);
  }
  
  public declineModal():void{
    this.modalRef?.hide();
  }
  public deleteLot(){
    let lotId = this.lots.value[this.lotToDelete].id;
    console.log(lotId);
    this.spinner.show();
    this.lots.removeAt(this.lotToDelete);
    this.declineModal();
    
     this.loteService.deleteLote(this.eventId, lotId).subscribe(
      ()=>{ 
        this.toastr.success("Lot successfuly deleted", "Deleted!");
      },
      (error:any)=>{
        this.toastr.error(`Something went wrong deleting this lot: ${error}`) 
      }
     ).add(()=>this.spinner.hide());
  }

  // public loadLots():void{
  //   this.spinner.show();
  //   this.loteService.getLotesByEventoId(this.eventId).subscribe(
  //     (lotsReturn: Lote[]) =>{
  //       lotsReturn.forEach(lote =>{
  //         this.lots.push(this.createLot(lote))
  //       });
  //     },
  //     (error: any) =>{
  //       this.toastr.error(`An error occurred tryng get lots: ${error}`)
  //     }
  //   ).add(() => this.spinner.hide());
  // }
}
