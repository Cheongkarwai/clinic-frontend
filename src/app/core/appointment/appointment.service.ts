import {Injectable} from "@angular/core";
import {BehaviorSubject, map} from "rxjs";
import {Appointment, AppointmentCountByMonth} from "./appointment.interface";
import {Apollo} from "apollo-angular";
import {GET_APPOINTMENT, SAVE_APPOINTMENT,COUNT_APPOINTMENT} from "../graphql/graphql.operation";

@Injectable({
  providedIn:'root'
})
export class AppointmentService{

  // @ts-ignore
  private appointments$ = new BehaviorSubject<Appointment[]>([]);
  private appointments:Appointment[] = [];
  private pageInfo$ = new BehaviorSubject<any>(null);
  private appointmentCount$ = new BehaviorSubject<AppointmentCountByMonth[]>([]);


  constructor(private apollo:Apollo){}

  findAllAppointments(first:number,after:string | null,patientId:string | null){
    this.apollo.use('appointments').query({
      query:GET_APPOINTMENT,
      variables:{
        first:first,
        after:after,
        patientId:patientId
      }
    }).pipe(map(({data}:any)=>{
      return {
        data: data.appointments.edges.map((edge: any) => edge.node),
        pageInfo: data.appointments.pageInfo
      };
    })).subscribe(res=>{
      this.pageInfo$.next(res.pageInfo);
      this.appointments = [...this.appointments,...res.data];
      console.log(this.appointments);
      this.appointments.forEach(e=>{
        const month = new Date(e.timestamp).toLocaleString('default', { month: 'long' });
        console.log(month);
      })
      this.appointments$.next(this.appointments);
    })
  }

  findCount(patientId:string){
    this.apollo.use('appointments').query({
      query:COUNT_APPOINTMENT,
      variables:{
        patientId:patientId
      }
    }).pipe(map(({data}:any)=>data.count)).subscribe(res=>{
      console.log(res);
      this.appointmentCount$.next(res);
    });
  }

  addAppointment(appointment:Appointment){
    this.apollo.use('appointments').mutate({
      mutation:SAVE_APPOINTMENT,
      variables:{
        appointment:{
          doctorId:appointment.doctor_id,
          patientId:appointment.patient_id,
          timestamp:appointment.timestamp
        }
    },

    }).subscribe(({data}:any)=>
      console.log(data)
      // this.appointments$.next({
      //  patient_id: data.saveAppointment.patientId,
      //   doctor_id:data.saveAppointment.doctorId,
      //   timestamp:data.saveAppointment.timestamp
      // })
    );
  }

  getAllAppointments(){
    return this.appointments$.asObservable();
  }

  getPageInfo$(){
    return this.pageInfo$.asObservable();
  }

  getAppointmentCount$(){
    return this.appointmentCount$.asObservable();
  }

}
