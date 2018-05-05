import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItalyPage } from './italy';
import { ModalDistanciaEstadiosPage } from '../../modal-distancia-estadios/modal-distancia-estadios';

@NgModule({
  declarations: [
    ItalyPage,
    ModalDistanciaEstadiosPage
  ],
  imports: [
    IonicPageModule.forChild(ItalyPage),
  ],
})
export class ItalyModule {}
