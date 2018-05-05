import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnglandPage } from './england';
import { ModalDistanciaEstadiosPage } from '../../modal-distancia-estadios/modal-distancia-estadios';

@NgModule({
  declarations: [
    EnglandPage,
    ModalDistanciaEstadiosPage
  ],
  imports: [
    IonicPageModule.forChild(EnglandPage),
  ],
})
export class EnglandModule {}
