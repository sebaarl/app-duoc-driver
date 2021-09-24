import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PiepaginaComponent } from './piepagina/piepagina.component';
import { InputComponent } from './input/input.component';

@NgModule({
  declarations: [PiepaginaComponent, InputComponent],
  exports: [PiepaginaComponent, InputComponent],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class ComponentsModule {}
