import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { TemplateModule } from './template/template.module';
import { FooterModule } from './footer/footer.module';

@NgModule({
  declarations: [
AppComponent
],
  imports: [
BrowserModule,
AppRoutingModule,
HeaderModule,
TemplateModule,
FooterModule
],
  providers: [],
  bootstrap: [
AppComponent
]
})
export class AppModule { }
