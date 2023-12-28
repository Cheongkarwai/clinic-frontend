import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Chart, ChartData} from 'chart.js';
import {AppointmentCountByMonth} from "../../core/appointment/appointment.interface";
import {BaseChartDirective} from "angular-bootstrap-md";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, OnChanges {

  chart!: Chart;

  @Input() labels!: string [];
  @Input() data!: AppointmentCountByMonth[];

  graphData: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
     const data = changes['data'].currentValue as AppointmentCountByMonth[];
     data.forEach(e=>{
       this.graphData[e.month - 1] = e.count;
     });
     console.log(this.graphData);
     this.addData(this.graphData);
  }

  ngOnInit(): void {
    this.createChart();
  }

  addData(graphData:number[]){
    // @ts-ignore
    this.chart.data.datasets.forEach((dataset,index) => {
      // @ts-ignore
      dataset.data = graphData;
    });
    this.chart.update();

  }



  createChart(){
    this.chart = new Chart('myChart',{
      type:'bar',
      data:{
        labels: this.labels,
        datasets: [
          {
            label:"Appointment",
            data:this.graphData,
            borderColor: 'blue',
            backgroundColor: 'rgba(0,102,255,0.6)',
            borderWidth:2
          },
        ],
      },
      options: {
        aspectRatio: 3,
        scales: {
          yAxes: [{
            ticks: {
              max: 100,
              min: 1,
              stepSize:1
            }
          }]
        },
      }
    });
  }

}
