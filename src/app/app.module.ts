import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './@components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { PortfolioComponent } from './@components/portfolio/portfolio.component';
import { SectionAcercaDeComponent } from './@components/section-acerca-de/section-acerca-de.component';
import { SectionProyectosComponent } from './@components/section-proyectos/section-proyectos.component';
import { NavComponent } from './@components/nav/nav.component';
import { LoginComponent } from './@components/login/login.component';
import { BannerComponent } from './@components/banner/banner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { SectionExperienciaComponent } from './@components/section-experiencia/section-experiencia.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { SectionEducacionComponent } from './@components/section-educacion/section-educacion.component';
import { ToastrModule } from 'ngx-toastr';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SectionHabilidadesComponent } from './@components/section-habilidades/section-habilidades.component';
import { SectionFooterComponent } from './@components/section-footer/section-footer.component';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PortfolioComponent,
    SectionAcercaDeComponent,
    SectionProyectosComponent,
    SectionExperienciaComponent,
    NavComponent,
    LoginComponent,
    BannerComponent,
    SectionEducacionComponent,
    SectionHabilidadesComponent,
    SectionFooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    MatDialogModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgCircleProgressModule.forRoot({
      backgroundColor: "#241c47",
      radius: 60,
      maxPercent: 200,
      units: " %",
      unitsColor: "#ffffff",
      outerStrokeWidth: 5,
      outerStrokeColor: "#FFFFFF",
      innerStrokeColor: "#FFFFFF",
      titleColor: "#ffffff",
      subtitleColor: "#44ff99",
      showSubtitle: true,
      showTitle:true,
      showInnerStroke: false,
      startFromZero: false})
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
