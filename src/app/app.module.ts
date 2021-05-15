import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [AppRoutingModule, BrowserModule, BrowserAnimationsModule, MatButtonModule, MatIconModule, MatToolbarModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
