'use client'
import { DashboardInvoiceDetais } from "@/services/dashborad";
import React, { PureComponent, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "March",
    Paid: 4000,
    Pending: 2400,
    amt: 2400,
  },
  {
    name: "April",
    Paid: 3000,
    Pending: 1398,
    amt: 2210,
  },
  {
    name: "May",
    Paid: 2000,
    Pending: 9800,
    amt: 2290,
  },
  {
    name: "June",
    Paid: 2780,
    Pending: 3908,
    amt: 2000,
  },
  {
    name: "July",
    Paid: 1890,
    Pending: 4800,
    amt: 2181,
  },
  {
    name: "August",
    Paid: 2390,
    Pending: 3800,
    amt: 2500,
  },
  {
    name: "September",
    Paid: 3490,
    Pending: 4300,
    amt: 2100,
  },
];

export default function BarGraph() {
  // static demoUrl = "https://codesandbox.io/s/simple-bar-chart-tpz8r";
	// const [graphData,setGraphData] = useState<any>()
  // const Dashboardinvoice = async () => {
  //   let res;
  //   try {
  //     res = await DashboardInvoiceDetais()
  //     if (res?.success) {
       
  //       let originalObject = res?.data
  //       const transformedArray = Object.keys(originalObject).map(key => {
  //         const monthData = originalObject[key];
  //         return {
  //           'Month Name': monthData.month_name.trim()?.slice(0, 3).toUpperCase(), // Remove extra spaces
  //           'Total Invoice Created': parseInt(monthData.total_invoice_created, 10),
  //           'Total Invoice Paid': parseInt(monthData.total_invoice_paid, 10),
  //           'Amount': parseInt(monthData.total_invoice_created, 10) + parseInt(monthData.total_invoice_paid, 10)
  //         };
  //       });
  //       // console.log('response-- bar graph ', transformedArray)
  //       setGraphData(transformedArray)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // useEffect(() => {
  //   Dashboardinvoice()
  // }, [])
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="Pending"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="Paid"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
