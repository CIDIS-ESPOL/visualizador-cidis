import { element } from 'protractor';
import { FincaService } from './../../../../Services/Data/finca.service';
import { CultivoService } from './../../../../Services/Data/cultivo.service';
import { SensorService } from './../../../../Services/Data/sensor.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss']
})
export class SensorComponent implements OnInit {

  sensores: any[] = []
  closeResult: string = ""
  active: boolean = true

  checkoutForm = this.formBuilder.group({
    id: '',
    cultivo: '',
    finca: ''
  });

  method: string = ""
  cultivoSensor: string = ""
  fincaSensor: string = ""


  title: string = "Añadir Sensor"

  cultivos: { nombre: any; imagen: string; }[] = []
  fincas: Array<string> = []
  sensorSeleccionado: any = {}

  constructor(
    private sensor: SensorService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private cultivoService: CultivoService,
    private fincaService: FincaService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.sensor.get_sensores(this.sensores)
    this.cultivoService.get_cultivos(this.cultivos)
    this.fincaService.get_fincas(this.fincas)
  }

  open(content: any) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEdicion(content: any, sensorSeleccionado: any) {
    this.title = "Editar Sensor"

    this.checkoutForm.patchValue({
      'id': sensorSeleccionado.id,
      'cultivo': sensorSeleccionado.cultivo,
      'finca': sensorSeleccionado.finca
    })

    this.cultivoSensor = sensorSeleccionado.cultivo
    this.fincaSensor = sensorSeleccionado.finca

    this.active = true
    this.method = "actualizar"
    this.open(content)
  }

  openCrear(content: any) {
    this.title = "Añadir Sensor"
    this.checkoutForm.reset();
    this.checkoutForm.patchValue({
      'cultivo': this.cultivos[0].nombre,
      'finca': this.fincas[0]
    })
    this.active = false
    this.method = "crear"
    this.open(content)
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  onSubmit(): void {
    let id: any = this.checkoutForm.value["id"]
    let cultivo: any = this.checkoutForm.value["cultivo"]
    let finca: any = this.checkoutForm.value["finca"]

    if (id == null) {
      alert("No ha ingresado el identificador del nuevo sensor")
    }
    else if (cultivo == this.cultivoSensor && finca == this.fincaSensor) {
      alert("Sensor con id " + id + " no presenta nuevos cambios")
    } else {

      let data = {
        'cultivo': cultivo,
        'finca': finca
      }

      if (!this.active)
        this.sensor.crear_sensor(id, data)
      else
        this.sensor.actualizar_sensor(id, data)

    }

    this.checkoutForm.reset();

  }

  eliminarSensor(sensorSeleccionado: any): void {
    if (confirm("Estás seguro de eliminar el sensor con id " + sensorSeleccionado.id))
      this.sensor.eliminar_sensor(sensorSeleccionado.id);
  }

}
