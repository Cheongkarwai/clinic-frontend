export interface Appointment{
  id:number
  timestamp:string
  doctor_id:string
  patient_id:string
}

export interface AppointmentCountByMonth{
  month:number
  count:number
}
