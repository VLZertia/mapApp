import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpainPage } from './spain';
import { ModalDistanciaEstadiosPage } from '../../modal-distancia-estadios/modal-distancia-estadios';

@NgModule({
  declarations: [
    SpainPage,
    ModalDistanciaEstadiosPage
  ],
  imports: [
    IonicPageModule.forChild(SpainPage),
  ],
})
export class SpainModule {}
