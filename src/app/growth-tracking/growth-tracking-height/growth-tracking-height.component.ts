import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import Annotation from 'chartjs-plugin-annotation';
import { BabyMeasurementModel } from '../../models/baby-measurement.model';
import { BabyMeasurementsService } from '../../services/baby-measurements.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-growth-tracking-height',
  templateUrl: './growth-tracking-height.component.html',
  styleUrl: './growth-tracking-height.component.css',
})
export class GrowthTrackingHeightComponent implements OnInit, AfterViewInit {
  //measurements: BabyMeasurementModel[] = [];
  dates: Date[] = [];
  heights: number[] = [];
  weights: number[] = [];
  headMeasurements: number[] = [];
  measurementsChanged: Subscription;

  constructor(private babyMeasurementsService: BabyMeasurementsService) {
    Chart.register(Annotation);
  }

  ngAfterViewInit(): void {
    this.setData(this.babyMeasurementsService.getMeasurements());

    this.measurementsChanged =
      this.babyMeasurementsService.measurementsChanged.subscribe(
        (newMeasurements: BabyMeasurementModel[]) =>
          this.setData(newMeasurements)
      );
  }

  ngOnInit(): void {
    // this.setData(this.babyMeasurementsService.getMeasurements());

    // this.measurementsChanged =
    //   this.babyMeasurementsService.measurementsChanged.subscribe(
    //     (newMeasurements: BabyMeasurementModel[]) =>
    //       this.setData(newMeasurements)
    //   );
  }

  ngOnDestroy(): void {
    this.measurementsChanged.unsubscribe;
  }

  setData(measurements: BabyMeasurementModel[]) {
    this.dates = measurements.map((measurement) => measurement.date);
    this.heights = measurements.map((measurement) => measurement.height);
    this.weights = measurements.map((measurement) => measurement.weight);
    this.headMeasurements = measurements.map(
      (measurement) => measurement.headMeasure
    );

    console.log('this.heights: ' + this.heights);
    //this.chart?.update();
    this.updateChart();
  }

  public updateChart(): void {
    this.lineChartData.datasets[0].data = this.heights;
    console.log('datasets[0]: ' + this.lineChartData.datasets[0].data);
    // this.lineChartData.datasets.forEach((x, i) => {
    //   //const num = GrowthTrackingHeightComponent.generateNumber(i);
    //   const num = 7;
    //   //const newHeights = this.heights[i];
    //   x.data.push(num);
    // });
    // this.lineChartData?.labels?.push(
    //   `Label ${this.lineChartData.labels.length}`
    // );
    this.chart?.update();
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: this.heights,
        label: 'Height',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: this.weights,
        label: 'Weight',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      {
        data: this.headMeasurements,
        label: 'Head Measure',
        yAxisID: 'y1',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: this.dates,
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        },
      },
    },

    plugins: {
      legend: { display: true },
      annotation: {
        // annotations: [
        //   {
        //     type: 'line',
        //     scaleID: 'x',
        //     value: 'March',
        //     borderColor: 'orange',
        //     borderWidth: 2,
        //     label: {
        //       display: true,
        //       position: 'center',
        //       color: 'orange',
        //       content: 'LineAnno',
        //       font: {
        //         weight: 'bold',
        //       },
        //     },
        //   },
        // ],
      },
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public randomize(): void {
    // for (let i = 0; i < this.lineChartData.datasets.length; i++) {
    //   for (let j = 0; j < this.lineChartData.datasets[i].data.length; j++) {
    //     this.lineChartData.datasets[i].data[j] =
    //       GrowthTrackingHeightComponent.generateNumber(i);
    //   }
    // }
    // this.chart?.update();
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    // console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    // console.log(event, active);
  }

  public hideOne(): void {
    // const isHidden = this.chart?.isDatasetHidden(1);
    // this.chart?.hideDataset(1, !isHidden);
  }

  public pushOne(): void {
    // this.lineChartData.datasets.forEach((x, i) => {
    //   const num = GrowthTrackingHeightComponent.generateNumber(i);
    //   x.data.push(num);
    // });
    // this.lineChartData?.labels?.push(
    //   `Label ${this.lineChartData.labels.length}`
    // );
    // this.chart?.update();
  }

  public changeColor(): void {
    // this.lineChartData.datasets[2].borderColor = 'green';
    // this.lineChartData.datasets[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
    // this.chart?.update();
  }

  public changeLabel(): void {
    // const tmp = this.newLabel;
    // this.newLabel = this.lineChartData.datasets[2].label;
    // this.lineChartData.datasets[2].label = tmp;
    // this.chart?.update();
  }
}
