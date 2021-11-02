import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoaccountPageRoutingModule } from './noaccount-routing.module';

import { NoaccountPage } from './noaccount.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoaccountPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [NoaccountPage]
})
export class NoaccountPageModule {}
