import { DropDownListAllModule, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

import { MaskedTextBoxModule, UploaderAllModule } from '@syncfusion/ej2-angular-inputs';

import { ToolbarAllModule, ContextMenuAllModule } from '@syncfusion/ej2-angular-navigations';

import { CheckBoxAllModule, SwitchModule } from '@syncfusion/ej2-angular-buttons';

import { DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule } from '@syncfusion/ej2-angular-calendars';

import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';

import { ScheduleAllModule, RecurrenceEditorAllModule } from '@syncfusion/ej2-angular-schedule';

import { HttpClientModule } from '@angular/common/http';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';

import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TextBoxAllModule} from '@syncfusion/ej2-angular-inputs';
import { ButtonAllModule} from '@syncfusion/ej2-angular-buttons';
import { AdminComponent } from './admin/admin.component';
import { EngineerComponent } from './engineer/engineer.component';
import { AppRoutingModule } from './app-routing.module';
@NgModule({
    declarations: [AppComponent, AdminComponent, EngineerComponent],
    imports: [
        CommonModule,
        ButtonAllModule,
        ScheduleAllModule,
        RecurrenceEditorAllModule,
        HttpClientModule,
        NumericTextBoxAllModule,
        DatePickerAllModule,
        TimePickerAllModule,
        DateTimePickerAllModule,
        TextBoxAllModule,
        CheckBoxAllModule,
        ToolbarAllModule,
        DropDownListAllModule,
        ContextMenuAllModule,
        MaskedTextBoxModule,
        UploaderAllModule,
        DropDownListModule,
        
        BrowserModule,
        CalendarModule,
        DatePickerAllModule,
        AppRoutingModule,
        SwitchModule
    ],
    providers: [], bootstrap: [AppComponent]
})
export class AppModule { }
