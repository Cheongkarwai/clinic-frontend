import {HttpClient} from '@angular/common/http';
import {AfterViewInit, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {AppointmentService} from "../../../core/appointment/appointment.service";
import {BehaviorSubject, filter, map, Observable, pairwise, throttleTime} from "rxjs";
import {Appointment, AppointmentCountByMonth} from "../../../core/appointment/appointment.interface";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  pageParams = {
    first: 10,
    after: null
  };

  patientId= "8";
  appointments$ = new Observable<Appointment[]>();
  appointmentsGroupByMonth$ = new Observable<AppointmentCountByMonth[]>();
  totalAppointment$ = new Observable<number>();
  months$ = new BehaviorSubject<string[]>(["January","February","March","April","May","Jun","July","August","September","November","December"]);
  @ViewChild(CdkVirtualScrollViewport) scroller!: CdkVirtualScrollViewport;

  constructor(private httpClient: HttpClient, private appointmentService: AppointmentService,
              private ngZone:NgZone) {
  }

  ngOnInit(): void {
    this.fetchAppointment(this.pageParams.first, this.pageParams.after,this.patientId);
    this.getCount(this.patientId);
  }

  ngAfterViewInit() {
    this.scroller.elementScrolled().pipe(
      map(()=>this.scroller.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1,y2])=>(y2<y1) && (y2 < 140)),
      throttleTime(200)
      // filter(event=>this.scroller.getRenderedRange().end === this.scroller.getDataLength())
      ).subscribe(res=>{
        this.ngZone.run(()=>{
          this.appointmentService.getPageInfo$().subscribe(res=>{
            if(res){
              console.log(res.hasNextPage);
              if(res.hasNextPage){
                if (this.scroller.getRenderedRange().end === this.scroller.getDataLength()) {
                  this.pageParams.after = res.endCursor;
                  this.appointmentService.findAllAppointments(this.pageParams.first, this.pageParams.after,this.patientId);
                  this.appointments$ = this.appointmentService.getAllAppointments();
                }
              }
            }
          });
        })
    });
  }

  fetchAppointment(first: number, after: string | null,patientId:string | null) {
    console.log("Hi");
    this.appointmentService.findAllAppointments(first, after,patientId);
    this.appointments$ = this.appointmentService.getAllAppointments();
  }

  getCount(patientId:string){
    this.appointmentService.findCount(patientId);
    this.appointmentsGroupByMonth$ = this.appointmentService.getAppointmentCount$();
    // this.appointmentService.findCount(patientId);
    // this.totalAppointment$ = this.appointmentService.getTotalAppointment$();
  }

  test() {
    this.httpClient.post('http://localhost:8080/api/v1/files/name/generate', null, {responseType: 'blob'})
      .subscribe(res => {
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(res);
        a.download = "test.xls";
        a.click();
      });
  }

}
