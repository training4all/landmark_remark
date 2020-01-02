import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { appRoutingModule } from './app.routing';
import { RegisterComponent } from './register/register.component';
import { LoggingMessageComponent } from './logging-message/logging-message.component';
import { NotesMapComponent } from './notes-map/notes-map.component';
import { AddNoteWindowComponent } from './add-note-window/add-note-window.component';
import { HttpErrorInterceptor } from 'src/interceptors/http-error-interceptor';
import { MapSearchControlComponent } from './controls/map-search-control/map-search-control.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        LoggingMessageComponent,
        NotesMapComponent,
        AddNoteWindowComponent,
        MapSearchControlComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        appRoutingModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
