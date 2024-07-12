import { Card, CardContent, Typography } from "@mui/material";

import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from "apexcharts";

interface Series {
    name: string;
    data: number[];
}

export const ApexChart: React.FC = () => {
    const [series] = useState<Series[]>([
        {
            name: 'Net Profit',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
            name: 'Revenue',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
    ]);

    const [options] = useState<ApexOptions>({
        chart: {
            type: 'bar' , 
            height: 350,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                // endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        },
        yaxis: {
            title: {
                text: '$ (thousands)',
            },
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: (val) => `$ ${val} thousands`,
            },
        },
    });

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="bar" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};



const ScheduleAdherence = () => {
    return (
        <Card>
        <CardContent>
            <Typography variant="h5" component="div">ScheduleAdherence</Typography>
            <ApexChart />
        </CardContent>
    </Card>
    )
}
export default ScheduleAdherence;