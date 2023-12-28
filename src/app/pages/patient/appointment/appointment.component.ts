import { Component, OnInit } from '@angular/core';
import { InquiryFormComponent } from '../inquiry-form/inquiry-form.component';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent} from "angular-calendar";
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { EventColor } from 'calendar-utils';
import {Subject} from "rxjs";
import {AppointmentService} from "../../../core/appointment/appointment.service";
import {NotificationService} from "../../../core/notification/notification.service";


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit {

  activeDayIsOpen: boolean = true;
  refresh = new Subject<void>();

  colors: Record<string, EventColor> = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  };

  viewDate:Date = new Date();

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen) ||
        events.length === 0);
      this.viewDate = date;
    }
  }


  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: this.colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: this.colors['red'],
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date('2023-11-05')),
      title: 'An event with no end date',
      color: this.colors['yellow'],
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: this.colors['blue'],
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 1),
      end: addHours(new Date(), 1),
      title: 'A draggable and resizable event',
      color:  this.colors['red'],
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

    formAttribute:any = [{
    rowStyle:'form-row',
    inputs:[{
    key:'name',
    label:'Name',
    value:'',
    validators:[{type:'required',message:'Name is required'}],
    type:'text',
    containerStyle:'form-group col-md-6',
    inputStyle:'form-control',
  },{
    key:'email',
    label:'Email',
    value:'',
    validators:[{type:'required',message:'Email is required'}],
    type:'email',
    containerStyle:'form-group col-md-6',
    inputStyle:'form-control',
  }
  ]},{
    rowStyle:'form-row',
    inputs:[{
    key:'contact',
    label:'Contact number',
    value:'',
    validators:[{type:'required',message:'Contact number is required'}],
    type:'text',
    containerStyle:'form-group col-md-6',
    inputStyle:'form-control',
  },{
    key:'doctor',
    label:'Doctor',
    value:'',
    validators:[{type:'required',message:'Doctor is required'}],
    type:'dropdown',
    containerStyle:'form-group col-md-6',
    inputStyle:'form-control',
    options:['Dr. Ng','Dr. Lee'],
    defaultOption:'Please select a doctor'
  }]},{
    rowStyle:'form-row',
    inputs:[{
    key:'appointmentDateTime',
    label:'Appointment Date Time',
    value:'',
    validators:[{type:'required',message:'Appointment date-time is required'}],
    type:'datetime-local',
    containerStyle:'form-group col-md-12',
    inputStyle:'form-control',
  }
  ]}];

  selectedTypePatient:any = 'new';
  closeResult = '';

  constructor(private modalService:NgbModal,private appointmentService:AppointmentService,
              private notificationService:NotificationService) { }

  ngOnInit(): void {



    // this.appointmentService.getAllAppointments().subscribe(res=>{
    //   if(res !== null){
    //     this.events = [
    //       ...this.events,
    //       {
    //         start: startOfDay(new Date(res.timestamp.split('T')[0])),
    //         title: 'Appointment',
    //         color: this.colors['yellow']
    //       },
    //     ];
    //     // this.events.push({
    //     //   start: startOfDay(new Date('2023-11-05')),
    //     //   title: 'Appointment',
    //     //   color: this.colors['yellow']});
    //   }
    // });
  }

  onChangeSelectTypePatient(event:any){

    switch(event.target.value){
      case 'new':

      this.formAttribute = [{
        rowStyle:'form-row',
        inputs:[{
        key:'name',
        label:'Name',
        value:'',
        validators:[{type:'required',message:'Name is required'}],
        type:'text',
        containerStyle:'form-group col-md-6',
        inputStyle:'form-control',
      },{
        key:'email',
        label:'Email',
        value:'',
        validators:[{type:'required',message:'Email is required'}],
        type:'email',
        containerStyle:'form-group col-md-6',
        inputStyle:'form-control',
      }
      ]},{
        rowStyle:'form-row',
        inputs:[{
        key:'contact',
        label:'Contact number',
        value:'',
        validators:[{type:'required',message:'Contact number is required'}],
        type:'text',
        containerStyle:'form-group col-md-6',
        inputStyle:'form-control',
      },{
        key:'doctor',
        label:'Doctor',
        value:'',
        validators:[{type:'required',message:'Doctor is required'}],
        type:'dropdown',
        containerStyle:'form-group col-md-6',
        inputStyle:'form-control',
        options:['Dr. Ng','Dr. Lee'],
        defaultOption:'Please select a doctor'
      }]},{
        rowStyle:'form-row',
        inputs:[{
        key:'appointmentDateTime',
        label:'Appointment Date Time',
        value:'',
        validators:[{type:'required',message:'Appointment date-time is required'}],
        type:'datetime-local',
        containerStyle:'form-group col-md-12',
        inputStyle:'form-control',
      }
      ]}
    ];

        break;
      case 'existing':

      this.formAttribute = [{
        rowStyle:'form-row',
        inputs:[{
        key:'patientId',
        label:'Patent ID',
        value:'',
        validators:[{type:'required',message:'Patient Id is required'}],
        type:'text',
        containerStyle:'form-group col-md-6',
        inputStyle:'form-control',
      },{
        key:'doctor',
        label:'Doctor',
        value:'',
        validators:[{type:'required',message:'Doctor is required'}],
        type:'dropdown',
        containerStyle:'form-group col-md-6',
        inputStyle:'form-control',
        options:['Dr. Ng','Dr. Lee'],
        defaultOption:'Please select a doctor'
      }]},{
        rowStyle:'form-row',
        inputs:[{
        key:'appointmentDateTime',
        label:'Appointment Date Time',
        value:'',
        validators:[{type:'required',message:'Appointment date-time is required'}],
        type:'datetime-local',
        containerStyle:'form-group col-md-12',
        inputStyle:'form-control',
      }
      ]}
    ];
        break;
    }
  }

  submitForm(form:FormGroup){
    //this.appointmentService.addAppointment({timestamp:'2023-11-02T14:53:51+02:00',doctor_id:'1',patient_id:'1'})
    console.log(form);
    console.log(form.invalid);
    if(form.invalid){
      Swal.fire({
        title:'Error',
        icon:'error',
        text:'Please fill in all the required field !'
      });
      form.markAllAsTouched();
      return;
    }

    // this.appointmentService.addAppointment({
    //   timestamp:new Date(form.controls['appointmentDateTime'].getRawValue()).toISOString(),
    //   doctor_id:'1',
    //   patient_id:'1'
    // });
  }

  open(content:any){
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
  }

  private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

}
