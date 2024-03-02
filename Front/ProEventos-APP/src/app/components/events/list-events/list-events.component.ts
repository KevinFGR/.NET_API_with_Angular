import { Component, OnInit, TemplateRef } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.scss']
})
export class ListEventsComponent implements OnInit{
  
  modalRef?: BsModalRef;
  
  constructor(
    private eventoService:EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
    ) { }

  public eventTheme: String = '';
  public eventId: number = 0;
  public openModal(event:any, template: TemplateRef<any>, eventTheme:String, eventId:number): void {
    // This is the Delete button modal
    event.stopPropagation();
    this.eventTheme = eventTheme;
    this.eventId = eventId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirmDelete(): void {
    this.modalRef?.hide();

    this.spinner.show();
    this.eventoService.deleteEvent(this.eventId).subscribe(
      (result:any)=>{
        if(result.message =='Deleted'){
          this.toastr.success('The event was successfully deleted', 'Deleted');
          this.spinner.hide();
          this.getEvents();

        }
      },
      (error:any)=>{
        this.spinner.hide();
        this.toastr.error(`Error trying delete event ${this.eventTheme}, Id=${this.eventId}`, "Error");
        console.error(error);
      },
      ()=>{},
    )

  }
 
  public decline(): void {
    this.modalRef?.hide();
  }


  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];

  public larguraImagem: number = 150;
  public margemImagem: number = 2;
  public exibirImagem: boolean = true;
  private _filtroLista: string = '';

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  public filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  public ngOnInit(): void {
    this.spinner.show();
    this.getEvents();
  }

  public alterarImagem():void {
    this.exibirImagem = !this.exibirImagem;
  }
  public getEvents(): void {
    const observer =
    {
      next:(_eventos:Evento[]) =>{
        this.eventos=_eventos;
        this.eventosFiltrados = this.eventos
      },
      error:(error:any)  => {
        console.error(error);
        this.spinner.hide();
        this.toastr.error('Something went wrong searching events', 'Error')
      },
      complete:() => this.spinner.hide()
    }
    this.eventoService.getEvents().subscribe(observer);
  }
  public url_detail: string='';

  public redirectDetail(id:number){
    this.url_detail = "/events/details/"+ id.toString();
    this.router.navigate([this.url_detail])

  }

}
