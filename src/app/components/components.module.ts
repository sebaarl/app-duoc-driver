import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PiepaginaComponent } from './piepagina/piepagina.component';

@NgModule({
  declarations: [PiepaginaComponent],
  exports: [PiepaginaComponent],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class ComponentsModule {}
