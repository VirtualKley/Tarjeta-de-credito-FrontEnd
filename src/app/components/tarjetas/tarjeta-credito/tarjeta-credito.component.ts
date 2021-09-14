import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit, OnDestroy {

  form: FormGroup;
  sus: Subscription;
  tarjeta: TarjetaCredito;
  idTarjeta: number = 0;

  constructor(private formBuilder: FormBuilder, private cardService: TarjetaService,
    private toastr: ToastrService) { 
    this.form = this.formBuilder.group({
      id: 0,
      titular: ['', [Validators.required]],
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    });
  }

  ngOnInit() {
    this.cardService.obtenerTarjeta().subscribe(data => {
      console.log(data);
      this.tarjeta = data;
      this.form.patchValue({
        titular: this.tarjeta.titular,
        numeroTarjeta: this.tarjeta.numeroTarjeta,
        fechaExpiracion: this.tarjeta.fechaExpriacion,
        cvv: this.tarjeta.cvv
      });
      this.idTarjeta = this.tarjeta.id;
    });
  }

  guardarTarjeta(){
    if(this.idTarjeta == 0){
      this.agregar();
    }else{
      this.editar();
    }
  }

  agregar(){
    const tarjeta: TarjetaCredito = {
      titular: this.form.get('titular').value,
      numeroTarjeta: this.form.get('numeroTarjeta').value,
      fechaExpriacion: this.form.get('fechaExpiracion').value,
      cvv: this.form.get('cvv').value
    }
    console.log(tarjeta);
    this.cardService.SaveCard(tarjeta).subscribe(data => {
      this.toastr.success('Registro Agregado', 'La tarjeta fue agregada exitosamente');
      this.cardService.ListCards();
      this.form.reset();
    });
  }

  editar(){
    const tarjeta: TarjetaCredito = {
      id: this.idTarjeta,
      titular: this.form.get('titular').value,
      numeroTarjeta: this.form.get('numeroTarjeta').value,
      fechaExpriacion: this.form.get('fechaExpiracion').value,
      cvv: this.form.get('cvv').value
    }
    console.log(tarjeta);
    this.cardService.actualizarTarjeta(this.idTarjeta, tarjeta).subscribe(data => {
      this.toastr.info('Registro Modificado', 'La tarjeta fue modificada exitosamente');
      this.cardService.ListCards();
      this.form.reset();
      this.idTarjeta = 0
    });
  }

  ngOnDestroy(){
    this.sus.unsubscribe();
  }

}
