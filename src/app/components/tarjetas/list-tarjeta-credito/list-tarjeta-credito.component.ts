import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-list-tarjeta-credito',
  templateUrl: './list-tarjeta-credito.component.html',
  styleUrls: ['./list-tarjeta-credito.component.css']
})
export class ListTarjetaCreditoComponent implements OnInit {

  constructor(public cardService: TarjetaService, public toastr: ToastrService) { }

  ngOnInit() {
    this.cardService.ListCards();
  }

  deleteCard(id: number){
    if(confirm('Esta seguro que desea eliminar el registro?')){
      this.cardService.deleteCard(id).subscribe(data => {
        this.toastr.warning('Registro eliminar', 'La tarjeta fue eliminada correctamente');
        this.cardService.ListCards();
      });
    }
  }

  editCard(tarjeta: TarjetaCredito){
    this.cardService.actualizar(tarjeta);
  }

}
