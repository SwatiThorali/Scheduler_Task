import {  AfterViewInit, OnInit } from '@angular/core';
import { Component, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { extend, createElement, addClass, removeClass } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { DropDownList, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { CheckBox, ChangeEventArgs, RadioButton } from '@syncfusion/ej2-buttons';
import { DateTimePickerComponent } from "@syncfusion/ej2-angular-calendars";
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { isNullOrUndefined, closest, Internationalization } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';

//import { scheduleData } from './data';

import {
  PopupOpenEventArgs, CurrentAction, EJ2Instance, NavigatingEventArgs, TimeScaleModel, ResourcesModel, CallbackFunction, CellClickEventArgs, EventRenderedArgs, GroupModel, ResourceDetails, RenderCellEventArgs, PopupCloseEventArgs, ScheduleComponent, RecurrenceEditor, MonthService, DayService, WeekService, WorkWeekService, EventSettingsModel, ResizeService, DragAndDropService, WorkHoursModel, View, select
} from '@syncfusion/ej2-angular-schedule';
import { timelineResourceData, resourceData } from '../data';
import { Query } from '@syncfusion/ej2-data';
// import { MultiSelectChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
// import { timezoneData } from './timezone';
import { quickInfoTemplateData } from '../data';
import { TextBoxComponent, NumericTextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { DropDownListComponent, PopupEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { ChangeEventArgs as DropDownChangeArgs } from '@syncfusion/ej2-angular-dropdowns';

import { blockData, scheduleData } from '../data';
import { SwitchComponent } from '@syncfusion/ej2-angular-buttons';
import { rippleMouseHandler } from '@syncfusion/ej2-buttons';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements AfterViewInit {

  // constructor() { }

  ngAfterViewInit(): void {
    console.log("hiii");
    setTimeout(() => {
      this.pqr();
    }, 10000);
  }
  pqr(){
    // Array.from(document.getElementsByClassName('e-time-slots'))[0].innerHTML="08:00 PM - 12:00 PM";
    var abc=document.getElementsByClassName('e-time-cells');
    console.log(abc);
    
    var abcArr = Array.from(abc);
    abcArr[0].innerHTML="12:00 PM - 04:00 PM"
    var def=document.getElementsByClassName('e-schedule-table ');
    var defArr=Array.from(def);
    console.log(defArr[3].append("vaishnav"))
  }
  title = 'app';
  @ViewChild('scheduleObj')
  public scheduleObj!: ScheduleComponent;
  @ViewChild('startTime') startTimeObj!: DatePickerComponent;
  @ViewChild('endTime') endTimeObj!: DatePickerComponent;






  public showWeekend = false;
  public currentView: View = 'TimelineDay';
  public workDays: number[] = [1, 2, 3, 4, 5];

  public selectedDate: Date = new Date(2022, 10, 22);

  public data: Record<string, any>[] = extend([], scheduleData, true) as Record<string, any>[];
  public intl: Internationalization = new Internationalization();


  public allowMultiDrag = true;

  public virtualScroll = true;
  private selectionTarget!: Element;
  public allowResizing = false;
  public group: GroupModel = { enableCompactView: true, resources: ['Employee'] };
  public workDaysData: Record<string, any>[] = [
    { Id: '1,3,5', days: 'Mon, Wed, Fri' },
    { Id: '1,2,3,4,5', days: 'Mon, Tue, Wed, Thu, Fri' },
    { Id: '2,3,4,5', days: 'Tue, Wed, Thu, Fri' },
    { Id: '4,5,6,1,2', days: 'Thu, Fri, Sat, Mon, Tue' }
  ];
  public workDaysValue = '1,2,3,4,5';
  public workDaysFields: Record<string, any> = { text: 'days', value: 'Id' };
  public intervalValue = '60';
  public intervalData: string[] = ['30', '60', '90', '120', '150', '180', '240', '300', '480', '720',];
  public slotCountValue = '7';
  public slotCountData: string[] = ['1', '2', '3', '4', '5', '6', '7',];
  public timescaleValue = 'Show';
  public timescaleData: string[] = ['Show', 'Hide'];
  public templateValue = 'No';
  public templateData: string[] = ['No', 'Yes'];

  oneventRendered(args: EventRenderedArgs): void {
    let Color: string = args.data['Color'] as string;
    if (!args.element || !Color) {
      return;
    }
    if (this.scheduleObj.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = Color;
    } else {
      args.element.style.backgroundColor = Color;
    }
  }
  public onNavigating(args: NavigatingEventArgs) {
    let weekView: boolean = args.action === 'view' ? args.currentView === 'TimelineWeek' : this.scheduleObj.currentView === 'TimelineWeek';
    this.scheduleObj.headerRows = weekView ? [{ option: 'Date' }] : [{ option: 'Date' }, { option: 'Hour' }];
  }
  public timeScale: TimeScaleModel = { enable: true, interval: 240, slotCount: 1 };

  public dayOfWeekList: Record<string, any>[] = [
    { Id: '0', date: 'Sunday' },
    { Id: '1', date: 'Monday' },
    { Id: '2', date: 'Tuesday' },
    { Id: '3', date: 'Wednesday' },
    { Id: '4', date: 'Thursday' },
    { Id: '5', date: 'Friday' },
    { Id: '6', date: 'Saturday' }
  ];
  public categoryDataSource: Record<string, any>[] = [
    { text: 'Nancy [Admin]', id: 1, color: '#df5286' },
    { text: 'Steven [Software Engineer]', id: 2, color: '#7fa900' },
    { text: 'Robert [Support Engineer]', id: 3, color: '#ea7a57' },
    { text: 'Smith [Human Resource]', id: 4, color: '#5978ee' },
    { text: 'Michael [Technical Manager]', id: 5, color: '#df5186' }
  ];


  public eventSettings: EventSettingsModel = {
    dataSource: extend([], resourceData.concat(timelineResourceData), blockData, true) as Record<string, any>[],

    enableTooltip: true
  };

  public employeeDataSource: Record<string, any>[] = [
    { Text: 'Alice', Id: 1, GroupId: 1, Color: '#bbdc00', Designation: 'Service Administrator' },
    { Text: 'Nancy', Id: 2, GroupId: 2, Color: '#FF5733', Designation: 'Engineer' },
    { Text: 'Robert', Id: 3, GroupId: 1, Color: '#3346FF', Designation: ' Engineer' },
    { Text: 'Robson', Id: 4, GroupId: 2, Color: '#9e5fff', Designation: ' Engineer' },
    { Text: 'Laura', Id: 5, GroupId: 1, Color: '#FF3342', Designation: 'Engineer' },
    { Text: 'Margaret', Id: 6, GroupId: 2, Color: '#FF33E3', Designation: 'Engineer' }
  ];
  constructor() {
    // window.onresize = () => {
    //   (document.querySelector('.e-schedule-dialog') as any).style.height =
    //     (window.innerHeight - 100).toString() + 'px';
    // };
  }
  public getEmployeeName(value: ResourceDetails): string {
    return (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField!] as string;
  }

  public getEmployeeDesignation(value: ResourceDetails): string {
    const resourceName: string = (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField!] as string;
    return (value as ResourceDetails).resourceData['Designation'] as string;
  }

  public getEmployeeImageName(value: ResourceDetails): string {
    return this.getEmployeeName(value).toLowerCase();
  }




  public onPopupClose(args: PopupCloseEventArgs): void {
    console.log(args);
    if (args.type == "Editor")
      this.scheduleObj.eventWindow.refresh();
this.hf1=this.hf2=false;
  }


hf1=false;
hf2=false;
  public onPopupOpen(args: PopupOpenEventArgs): void {

    if (args.type == 'QuickInfo' && args.target && args.target.classList.contains('e-appointment')) {

      const formElement: HTMLElement = args.element.querySelector(

        '.e-event-popup'

      ) as HTMLElement;

      const buttonEle: HTMLElement = createElement('button', {

        className: 'e-start-stop e-text-ellipsis e-lib e-flat',

        innerHTML: "Start"

      });

      (formElement.querySelector('.e-popup-footer') as HTMLElement).appendChild(buttonEle);

      const button: Button = new Button({

      });

      button.appendTo(buttonEle);

      button.element.onclick = (): void => {

        alert("Task has been started");
        this.scheduleObj.closeQuickInfoPopup();
      };







    }



    const allday = document.querySelector('.e-all-day-container');
// const hlfDay=document.querySelector('.custom-field-container');
// hlfDay!.addEventListener('click', function (event) {



// });
    if (args.type === 'Editor') {
      // console.log((document.querySelector('#StartTime') as any).ej2_instances[0].value.getHours());
      // console.log("bbbbb   ",(document.querySelector('#IsFirstHalf') as any)!.ej2_instances[0].checked)
      if ((document.querySelector('#StartTime') as any).ej2_instances[0].value.getHours() == 8)
      this.hf1=true;
      else
      this.hf2=true
      allday!.addEventListener('click', function (event) {

        const checked = ((event.currentTarget as HTMLElement).querySelector('.e-checkbox') as any).ej2_instances[0].checked;
        if (checked) {
          (document.querySelector('#IsFirstHalf') as any)!.ej2_instances[0].checked = false;
          (document.querySelector('#IsSecondHalf') as any)!.ej2_instances[0].checked = false;
          // document.querySelector('.default-field-container')!.classList.add('e-disable');

        }

      });






      //   if (!args.element.querySelector('.custom-field-row')) {
      //     let row: HTMLElement = createElement('div', { className: 'custom-field-row' });
      //     let formElement: HTMLElement = <HTMLElement>args.element.querySelector('.e-schedule-form');
      //     formElement.firstChild!.insertBefore(row, args.element.querySelector('.e-title-location-row'));
      //     let container: HTMLElement = createElement('div', { className: 'custom-field-row' });
      //     let inputEle: HTMLInputElement = createElement('input', {
      //         className: 'e-field', attrs: { name: 'EventType' }
      //     }) as HTMLInputElement;
      //     container.appendChild(inputEle);
      //     row.appendChild(container);
      //     let drowDownList: DropDownList = new DropDownList({
      //         dataSource: [
      //             { text: 'Start', value: 'start', id:'start' },
      //             { text: 'Stop', value: 'stop', id:'stop' }

      //         ],
      //         fields: { text: 'text', value: 'value' },
      //         value: (args.data as { [key: string]: Object })['EventType'] as string,
      //          placeholder: 'Work Status',
      //         change:onChange
      //     });
      //     function onChange(args:any){
      //       debugger;
      //       // You can add your code here.
      //       alert("Event Start/Stop Called");
      //       console.log(args);
      //     }
      //     drowDownList.appendTo(inputEle);
      //     inputEle.setAttribute('name', 'EventType');
      // }
      let dialog = (args.element as any).ej2_instances[0];
      dialog.open = (e: any) => {
        let startTimeObj =
          e.element.querySelector('#StartTime').ej2_instances[0];
        startTimeObj.renderDayCell = (args: any) => {
          /*Date need to be disabled*/
          if (args.date.getDay() === 0 || args.date.getDay() === 6) {
            args.isDisabled = true;
          }
          let endTimeObj =
            e.element.querySelector('#EndTime').ej2_instances[0];
          endTimeObj.renderDayCell = (args: any) => {
            if (args.date.getDay() === 0 || args.date.getDay() === 6) {
              args.isDisabled = true;
            }
          }
        };

      };


      if (!args.element.querySelector('.custom-field-container')) {
        // Create required custom elements in initial time
        const formElement: HTMLElement = args.element.querySelector(
          '.e-schedule-form'
        ) as HTMLElement;
        const container: HTMLElement = createElement('div', {
          className: 'custom-field-container',
        });
        const inputEle: HTMLElement = createElement('input', {
          className: 'e-checkbox',
          id: 'IsFirstHalf',
          attrs: { label: 'FirstHalf' },
        });
        (
          formElement.querySelector('.e-all-day-time-zone-row') as HTMLElement
        ).appendChild(container);
        container.appendChild(inputEle);
        const checkbox: CheckBox = new CheckBox({
          label: 'First Half',
          change: this.onFirstHalfChange.bind(this),
           checked:this.hf1,


        });
        checkbox.appendTo(inputEle);
        inputEle.setAttribute('name', 'IsFirstHalf');

        const row: HTMLElement = createElement('div', {
          className: 'custom-field-row'
        });
        if (!args.element.querySelector('.custom-field-container1')) {
          // Create required custom elements in initial time
          const formElement: HTMLElement = args.element.querySelector(
            '.e-schedule-form'
          ) as HTMLElement;
          const container: HTMLElement = createElement('div', {
            className: 'custom-field-container1',
          });
          const inputEle: HTMLElement = createElement('input', {
            className: 'e-checkbox',
            id: 'IsSecondHalf',
            attrs: { label: 'Second' },
          });
          (
            formElement.querySelector('.e-all-day-time-zone-row') as HTMLElement
          ).appendChild(container);
          container.appendChild(inputEle);
          const checkbox: CheckBox = new CheckBox({
            label: 'Second Half',
            change: this.onSecondHalfChange.bind(this),
            checked:this.hf2,


          });
          checkbox.appendTo(inputEle);
          inputEle.setAttribute('name', 'IsSecondHalf');

          const row: HTMLElement = createElement('div', {
            className: 'custom-field-row1'
          });
          //   const defaultContainer: HTMLElement = createElement('div', {
          //     className: 'default-field-container ',
          //   });
          //   const inputEle1: HTMLElement = createElement('input', {
          //     className: 'e-field',
          //     attrs: { label: 'Radiobutton' },
          //   });

          //   inputEle1.setAttribute('data-name', 'state');
          //   const inputEle2: HTMLElement = createElement('input', {
          //     className: 'e-field',
          //     attrs: { label: 'Radiobutton' },
          //   });
          //   inputEle2.setAttribute('data-name', 'state');
          //   formElement.firstChild!.insertBefore(
          //     defaultContainer,
          //     args.element.querySelector('.e-time-zone-row')
          //   );
          //   defaultContainer.appendChild(inputEle1);
          //   defaultContainer.appendChild(inputEle2);
          //   const radiobutton1: RadioButton = new RadioButton({
          //     label: 'First Half',
          //     name: 'state',
          //     value: '1',
          //     checked: true,

          //     change: this.OnfirstsecondhalfChange.bind(this)

          //   });
          //   radiobutton1.appendTo(inputEle1);

          //   const radiobutton2: RadioButton = new RadioButton({
          //     label: 'Second Half',
          //     name: 'state',
          //     value: '2',
          //     change: this.OnfirstsecondhalfChange.bind(this)
          //   });


          //   radiobutton2.appendTo(inputEle2);





          // }

        }
      }
    }
  }



  private onFirstHalfChange(args: ChangeEventArgs): void {
    // const radiobuttondiv: HTMLElement = document.querySelector(
    //   '.default-field-container'
    // ) as HTMLElement;
    const timezonediv: HTMLElement = document.querySelector(
      `.e-time-zone-container `

    ) as HTMLElement;




    if (args.checked == true) {

      // addClass([radiobuttondiv], 'e-enable');
      // document.querySelector('.default-field-container')!.classList.value='default-field-container'
      // document.querySelector('.default-field-container')!.classList.add('e-enable');
      document.querySelector('.e-time-zone-container')!.classList.add('e-disable');
      (document.querySelector('#IsAllDay') as any)!.ej2_instances[0].checked = false;
      (document.querySelector('#IsSecondHalf') as any)!.ej2_instances[0].checked = false;


      // document.querySelector('.e-all-day-container')!.classList.add('e-disable');
      (document.querySelector('#StartTime') as any).ej2_instances[0].format = "MM/dd/yy h:mm a";
      (document.querySelector('#StartTime') as any).ej2_instances[0].format = "M/dd/yy h:mm a";
      (document.querySelector('#EndTime') as any).ej2_instances[0].format = "MM/dd/yy h:mm a";
      (document.querySelector('#EndTime') as any).ej2_instances[0].format = "M/dd/yy h:mm a";
      (document.querySelector('#StartTime') as any).ej2_instances[0].value.setHours(8, 0, 0);
      (document.querySelector('#EndTime') as any).ej2_instances[0].value.setHours(12, 0, 0);
      (document.querySelector('#StartTime') as any).ej2_instances[0].dataBind();




    } else {

      // removeClass([radiobuttondiv], 'e-enable');
      document.querySelector('.e-time-zone-container')!.classList.remove('e-disable');
      //document.querySelector('.e-all-day-container')!.classList.remove('e-disable');



    }


  }
  private onSecondHalfChange(args: ChangeEventArgs): void {
    // const radiobuttondiv: HTMLElement = document.querySelector(
    //   '.default-field-container'
    // ) as HTMLElement;
    const timezonediv: HTMLElement = document.querySelector(
      `.e-time-zone-container `

    ) as HTMLElement;




    if (args.checked == true) {

      // addClass([radiobuttondiv], 'e-enable');
      // document.querySelector('.default-field-container')!.classList.value='default-field-container'
      // document.querySelector('.default-field-container')!.classList.add('e-enable');
      document.querySelector('.e-time-zone-container')!.classList.add('e-disable');
      (document.querySelector('#IsAllDay') as any)!.ej2_instances[0].checked = false;
      (document.querySelector('#IsFirstHalf') as any)!.ej2_instances[0].checked = false;

      // document.querySelector('.e-all-day-container')!.classList.add('e-disable');
      (document.querySelector('#StartTime') as any).ej2_instances[0].format = "MM/dd/yy h:mm a";
      (document.querySelector('#StartTime') as any).ej2_instances[0].format = "M/dd/yy h:mm a";
      (document.querySelector('#EndTime') as any).ej2_instances[0].format = "MM/dd/yy h:mm a";
      (document.querySelector('#EndTime') as any).ej2_instances[0].format = "M/dd/yy h:mm a";
      (document.querySelector('#StartTime') as any).ej2_instances[0].value.setHours(12, 0, 0);
      (document.querySelector('#EndTime') as any).ej2_instances[0].value.setHours(16, 0, 0);
      (document.querySelector('#StartTime') as any).ej2_instances[0].dataBind();




    } else {

      // removeClass([radiobuttondiv], 'e-enable');
      document.querySelector('.e-time-zone-container')!.classList.remove('e-disable');
      //document.querySelector('.e-all-day-container')!.classList.remove('e-disable');



    }


  }
}
