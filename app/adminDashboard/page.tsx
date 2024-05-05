"use client";
import { CircularProgress } from "@/components/common/ProgressRounded";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BarGraph from "./BarChart";
import UserTable from "./UserTable";
import { User, columns } from "./columns";
import { useGlobalContext } from "../context/store";
import { DashboardAttendenceTable, DashboardCardDetails, DashboardInvoiceDetais, dashboardAttendenceDetails } from "@/services/dashborad";
import { Date_formator_YYYY_MM, Date_formator_YYYY_MM_DD } from "@/utils/utilityFunctions";
import {
	CircularProgressbar,
	CircularProgressbarWithChildren,
	buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ToastContainer } from "react-toastify";
const Page: React.FC = () => {
	let newDate = new Date();
	let current_Month = newDate?.getMonth() + 1
	let newMonth = Date_formator_YYYY_MM(newDate)
	let today = Date_formator_YYYY_MM_DD(newDate)
	console.log('newMonth', newMonth)
	const [date, setDate] = useState<any>(today)
	const [cardData, setCardData] = useState<any>()
	const [circleData, setCircleData] = useState<any>([])
	const [dateAttandence, setDateAddtendemce] = useState<any>(today)
	const [tableData, setTableData] = useState<any>([])
	const { roledata, globalSettings } = useGlobalContext();
	const [invoiceCard, setInvoiceCard] = useState<any>([])
	const [currentMonth, setCurrentMonth] = useState<number>(current_Month)
	const [thisMonth, setThisMonth] = useState<any>(newMonth)

	const handleMonth = (e: any) => {
		console.log(e?.target?.value)
		setThisMonth(e?.target?.value)
		let value = Number(e?.target?.value?.split('-')?.[1])
		setCurrentMonth(value)
	}
	const calculatePercentage = (part: any, whole: any) => {
		if (whole !== 0) {
			return (part / whole) * 100;
		} else {
			return 0; // To avoid division by zero
		}
	}
	const attendenceDashboard = async () => {
		let res;
		try {
			res = await dashboardAttendenceDetails(date)
			if (res?.success) {
				console.log(res?.data)
				setCircleData(res?.data)
			}
		} catch (error) {
			console.log(error)
		}
	}
	const attendenceTable = async () => {
		let res;
		try {
			res = await DashboardAttendenceTable(dateAttandence)
			if (res?.success) {
				let data: any[] = []
				console.log('Dashboard Table -->', res?.data)
				res?.data?.map((ele: any, ind: any) => {
					data?.push({
						id: ind + 1,
						classroom: ele?.name,
						attendance: calculatePercentage(ele?.total_present, ele?.total_enrolled),
						present: `${ele?.total_present} / ${ele?.total_enrolled}`,
					})
				})
				setTableData(data)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const Dashboardinvoice = async () => {
		let res;
		try {
			res = await DashboardInvoiceDetais()
			if (res?.success) {
				// let current_Month = newDate?.getMonth() + 1
				setInvoiceCard(res?.data?.[currentMonth])
			}
		} catch (error) {
			console.log(error)
		}
	}

	const cardDetails = async () => {
		let res;
		res = await DashboardCardDetails()
		if (res?.success) {
			// let current_Month = newDate?.getMonth() + 1
			setCardData(res?.data?.[currentMonth])
		}
	}


	useEffect(() => {
		attendenceDashboard()
	}, [date])

	useEffect(() => {
		attendenceTable()
	}, [dateAttandence])

	useEffect(() => {
		cardDetails()
		Dashboardinvoice()
	}, [currentMonth])

	const data: User[] = [
		{
			id: "1",
			classroom: "Henry",
			attendance: "Amount Due",
			present: "Advance Amount",
		},
		{
			id: "2",
			classroom: "Henry",
			attendance: "Amount Due",
			present: "Advance Amount",
		},
		{
			id: "3",
			classroom: "Henry",
			attendance: "Amount Due",
			present: "Advance Amount",
		},
	];


	return (
		<>
			<main className="p-3 min-h-[89%] h-full" style={{
				backgroundColor: globalSettings?.backgroundColour || "#ECF2F4",
			}}>
				<section
					className="[ rounded-[10px] h-full
            text-[#FFFFFF] pb-[25px] overflow-auto bg-white
            "
				>
					<div className="flex flex-col gap-[30px] my-2 px-5">
						<div className=" flex flex-col lg:flex-row gap-[24px] justify-around h-[36vh]" >
							<div className="shadow-md p-5 rounded-[16px] flex flex-col gap-[20px] w-full max-w-[70%] ">
								<div className="flex justify-between items-center">
									<div className="text-[#05004E] text-[20px] font-semibold">
										{/* Hello {roledata?.user_detail?.firstName} {roledata?.user_detail?.lastName}! */}
										Hello Shahroz Daniel!
									</div>
									<div>
										<div className="text-[#0F3659] text-[14px] border border-solid border-blue-300 rounded-md px-4 py-[12px]">
											<input type="Month" value={thisMonth} onChange={handleMonth} className="focus_none" />
										</div>
									</div>
								</div>
								<div className="flex gap-[31px] h-[70%]">
									<div className="bg-[#FFE2E5] w-full max-w-[] h-[100%] rounded-[16px] p-[20px] flex flex-col gap-[16px]">
										<div className="flex gap-[15%]">
											<Image
												src={"/svgs/admin1.svg"}
												width={40}
												height={40}
												alt=""
											/>
											{/* <div className="text-[#151d48] text-[22pt] font-semibold">
												{cardData?.total_registration}
											</div> */}
										</div>
										{/* <div className="text-[#425166] text-[16pt] font-medium">
											Total Registration
										</div> */}
										<div className="text-[#151d48] text-[24px] font-semibold">
                      87
                    </div>
                    <div className="text-[#425166] text-[16px] font-medium">
											Total Registration
                    </div>
                    <div className="text-[#4079ED] text-[12px] font-medium">
                      +8% from last month
                    </div>

									</div>
									<div className="bg-[#FFF4DE] w-full max-w-[] h-[100%] rounded-[16px] p-[20px] flex flex-col gap-[16px]">
										<div className="flex gap-[15%]">
											<Image
												src={"/svgs/admin2.svg"}
												width={40}
												height={40}
												alt=""
											/>
											{/* <div className="text-[#151d48] text-[22pt] font-semibold">
												{cardData?.total_enrollment}
											</div> */}
										</div>
										{/* <div className="text-[#425166] text-[16pt] font-medium">
											Total Enrollment
										</div> */}
										<div className="text-[#151d48] text-[24px] font-semibold">
                      80
                    </div>
                    <div className="text-[#425166] text-[16px] font-medium">
										Total Enrollment
                    </div>
                    <div className="text-[#4079ED] text-[12px] font-medium">
                      +54% from last month
                    </div>
									</div>
									<div className="bg-[#DCFCE7] w-full max-w-[] h-[100%] rounded-[16px] p-[20px] flex flex-col gap-[16px]">
										<div className="flex gap-[15%]">
											<Image
												src={"/svgs/admin3.svg"}
												width={40}
												height={40}
												alt=""
											/>
											{/* <div className="text-[#151d48] text-[22pt] font-semibold">
												{invoiceCard?.total_invoice_created}
											</div> */}
										</div>
										{/* <div className="text-[#425166] text-[16pt] font-medium">
											Total Invoice
										</div> */}
										<div className="text-[#151d48] text-[24px] font-semibold">
                      $2k
                    </div>
                    <div className="text-[#425166] text-[16px] font-medium">
                      Total Invoice
                    </div>
                    <div className="text-[#4079ED] text-[12px] font-medium">
                      +42% from last month
                    </div>
										<div className="text-[#4079ED] text-[12px] font-medium">

										</div>
									</div>
									<div className="bg-[#F3E8FF] w-full max-w-[] h-[100%] rounded-[16px] p-[20px] flex flex-col gap-[16px]">
										<div className="flex gap-[15%]">
											<Image
												src={"/svgs/admin4.svg"}
												width={40}
												height={40}
												alt=""
											/>
											{/* <div className="text-[#151d48] text-[22pt] font-semibold">
												{invoiceCard?.total_invoice_paid}
											</div> */}
										</div>
										{/* <div className="text-[#425166] text-[16pt] font-medium">
											Total Invoice Paid
										</div> */}
										<div className="text-[#151d48] text-[24px] font-semibold">
                      $1k
                    </div>
                    <div className="text-[#425166] text-[16px] font-medium">
                      Total Invoice Paid
                    </div>
                    <div className="text-[#4079ED] text-[12px] font-medium">
                      +22% from last month
                    </div>
										<div className="text-[#4079ED] text-[12px] font-medium">
										</div>
									</div>
								</div>
							</div>
							<div className="shadow-md p-3 rounded-[16px] flex flex-col gap-[20px] w-full max-w-[28.5%]">
								<div className="flex justify-between items-center">
									<div className="text-[#05004E] text-[20px] font-semibold">
										Daily Attendance
									</div>
									<div>
										<div className="text-[#0F3659] text-[14px] border border-solid border-blue-300 rounded-md px-4 py-[12px]">
											<input type="date" value={date} onChange={(e: any) => setDate(e?.target?.value)} className="focus_none date_input" />
										</div>
									</div>
								</div>
								<div className="flex justify-evenly justify-center">
									<div className="flex flex-col gap-[10px]">
										<div className="text-[#000000] text-[18px] font-medium">
											Children
										</div>
										<div >
										<CircularProgress
                      borderColor=" #00E096"
                      indicatorColor="#E2FBD7"
                      value={43}
                    />
											{/* {circleData?.children?.[0]?.total_present && <CircularProgressbar
												value={calculatePercentage(circleData?.children?.[0]?.total_present, circleData?.children?.[0]?.total_children)}
												text={`${circleData?.children?.[0]?.total_present} / ${circleData?.children?.[0]?.total_children}`}
												background
												backgroundPadding={0}
												styles={buildStyles({
													backgroundColor: "#E2FBD7",
													textColor: "#00E096",
													pathColor: "#00E096",
													trailColor: "transparent",
												})}
											/>} */}
										</div>
									</div>
									<div className="flex flex-col gap-[10px]  ">
										<div className="text-[#000000] text-[18px] font-medium  ">
											Educators
										</div>
										<div>
										<CircularProgress
                      borderColor="#0095FF"
                      indicatorColor="#DAD7FE"
                      value={33}
                    />
											{/* {circleData?.educator?.[0]?.educators_present && <CircularProgressbar
												value={calculatePercentage(circleData?.educator?.[0]?.educators_present, circleData?.educator?.[0]?.total_educators)}
												text={`${circleData?.educator?.[0]?.educators_present} / ${circleData?.educator?.[0]?.total_educators}`}
												background
												backgroundPadding={0}
												styles={buildStyles({
													backgroundColor: "#DAD7FE",
													textColor: "#0095FF",
													pathColor: "#0095FF",
													trailColor: "transparent",
												})}
											/>} */}
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="flex flex-col lg:flex-row gap-[24px] justify-around  h-[50vh] "  >
							<div className="shadow-md p-5 rounded-[16px] flex flex-col gap-[15px] w-full lg:max-w-[65%]">
								<div className="text-[#05004E] text-[20px] font-semibold">
									Total Fees
								</div>
								<BarGraph />
							</div>
							<div className="shadow-md p-5 rounded-[16px] flex flex-col gap-[15px] w-full lg:max-w-[35%]">
								<div className="flex justify-between items-center">
									<div className="text-[#05004E] text-[16pt] font-semibold">
										Classroom Based Attendance
									</div>
									<div>
										<div className="text-[#0F3659] text-[14px] border border-solid border-blue-300 rounded-md px-4 py-[8px]">
											<input type="date" value={dateAttandence} onChange={(e: any) => setDateAddtendemce(e?.target?.value)} className="focus_none" />
										</div>
									</div>
								</div>
								<div style={{ overflow: 'scroll', overflowX: "hidden" }}>
									<UserTable columns={columns} data={data} />
									{/* <UserTable columns={columns} data={tableData} /> */}
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
			<ToastContainer />
		</>

	);
};

export default Page;
