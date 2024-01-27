import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {
  @Input() title: string = 'titulo';
  @Input() description: string = 'Curso .NET API + Angular';
  @Input() fa_icon: string = 'fa fa-table-list';
  @Input() btn_list: boolean = false;
}
