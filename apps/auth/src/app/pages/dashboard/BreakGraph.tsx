import { Card, CardContent, Typography } from '@mui/material';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
interface ChartOptions {
  chart: {
    height: number;
    type: string;
  };
  plotOptions: {
    radialBar: {
      offsetY: number;
      startAngle: number;
      endAngle: number;
      hollow: {
        margin: number;
        size: string;
        background: string;
        image: undefined | string;
      };
      dataLabels: {
        name: {
          show: boolean;
        };
        value: {
          show: boolean;
        };
      };
      barLabels: {
        enabled: boolean;
        useSeriesColors: boolean;
        margin: number;
        fontSize: string;
        formatter: (seriesName: string, opts: any) => string;
      };
    };
  };
  colors: string[];
  labels: string[];
  responsive: {
    breakpoint: number;
    options: {
      legend: {
        show: boolean;
      };
    };
  }[];
}

export const ApexChart: React.FC = () => {
  const [series, setSeries] = useState<number[]>([76, 67]);
  const [options, setOptions] = useState<ChartOptions>({
    chart: {
      height: 390,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: '30%',
          background: 'transparent',
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
        barLabels: {
          enabled: true,
          useSeriesColors: true,
          margin: 8,
          fontSize: '16px',
          formatter: function (seriesName, opts) {
            return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex];
          },
        },
      },
    },
    colors: ['#1ab7ea', 'rgba(236, 201, 0, 0.85)', '#39539E', '#0077B5'],
    labels: ['People on break', 'Messenger', 'Facebook', 'LinkedIn'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false,
          },
        },
      },
    ],
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options as any}
          series={series}
          type="radialBar"
          height={390}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

const BreakGraph = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Break
        </Typography>
        <ApexChart />
      </CardContent>
    </Card>
  );
};
export default BreakGraph;
