import { useGlobalContext } from "@/app/context/store";
import moment from "moment";
import { number } from "yup";
export const Date_time_conversion = (date: any) => {
  const utcTimestamp = new Date(date); // Assuming Z represents UTC
  const istTimestamp = utcTimestamp.toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    // hour: '2-digit',
    // minute: '2-digit',
    // second: '2-digit',
  });
  return istTimestamp;
};

export const time_conversion = (date: any) => {
  const utcTimestamp = new Date(date); // Assuming Z represents UTC
  const istTimestamp = utcTimestamp.toLocaleString("en-US", {
    // timeZone: 'Asia/Kolkata',
    // year: 'numeric',
    // month: '2-digit',
    // day: '2-digit',
    hour: "2-digit",
    minute: "2-digit",
    // second: '2-digit',
  });
  return istTimestamp;
};

export const Date_formator_mmm_dd_yyyy = (data: any) => {
  const date = new Date(data);

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return formattedDate;
};

export const decodeUserToken = (token: string) => {
  const userDetails = token && JSON.parse(atob(token.split(".")[1]));
  return userDetails;
};

export const genderConstant = [
  { value: "", label: "Select Gender" },
  { value: "M", label: "Male" },
  { value: "F", label: "Female" },
  { value: "X", label: "X" },
  // Add more options as needed
];

export const Date_formator_YYYY_MM_DD = (inputDate: any) => {
  // const {
  //   globalSettings: { dateFormat },
  // } = useGlobalContext();
  const format = "YYYY-MM-DD";

  const momentDate = moment.utc(inputDate);
  // Format the date
  return momentDate.format(format);
};

export const Date_formator_YYYY_MM = (str: any) => {
  let date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth].join("-");
};
export const genderview = (data: any) => {
  if (data === "M") {
    return "Male";
  } else if (data === "F") {
    return "Female";
  } else if (data === "X") {
    return "Other";
  } else {
    return "";
  }
};

// apiErrorHandler for unauthorized requests
export const handleUnauthorizedError = (router: any) => {
  router.push("/");
};

export const getAMPMTime = (timeString: any) => {
  const [hours] = timeString.split(":");
  const hour = parseInt(hours, 10);

  return hour >= 12 ? `${timeString} PM` : `${timeString} AM`;
};

export function getCurrentTime() {
  const now = new Date();

  // Get hours, minutes, and seconds
  let hours: any = now.getHours();
  let minutes: any = now.getMinutes();

  // Add leading zero if needed
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  // Construct the time string in HH:mm format
  const currentTime = `${hours}:${minutes}`;

  return currentTime;
}

export function calculateTotalFromPercentage(
  percentage: number,
  total: number
) {
  let amt: number = (percentage / 100) * Number(total);
  let totalAmt: number = Number(total) + Number(amt);
  return totalAmt;
}

export const formatPhoneNumber = (inputValue: any) => {
  return (
    inputValue &&
    inputValue
      .replace(/\D/g, "")
      .replace(/(\d{0,3})(\d{0,3})(\d{0,4})/, "($1) $2-$3")
      .replace(/\D+$/, "")
  );
};

export const formatCardValidity = (inputValue: any) => {
  const inputStr = String(inputValue);
  const digitsOnly = inputStr.replace(/\D/g, "");
  const formatted = digitsOnly.replace(
    /(\d{0,2})(\d{0,2})/,
    (match, p1, p2) => p1 + (p2 ? "/" : "") + p2
  );
  return formatted.substring(0, 5);
};

function convertToCSV(data: any) {
  const csvRows = [];
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(","));
  for (const rowData of data) {
    const values = headers.map((header) => {
      const escaped = ("" + rowData[header])?.replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  }
  return csvRows.join("\n");
}

const generateRandomFileName = () => {
  const timestamp = new Date().getTime(); // Current timestamp
  const randomString = Math.random().toString(36).substring(2, 8); // Random string of length 6
  return `data_${timestamp}_${randomString}.csv`; // Combining timestamp and random string
};
export const handleExport = (data: any) => {
  const csvData = convertToCSV(data);
  const blob = new Blob([csvData]);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  console.log(blob, url);
  const fileName = generateRandomFileName();
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export function isDateGreaterThanOrEqualToToday(dateString: any) {
  const momentDate = moment.utc(dateString);
  const todayDate = moment.utc();
  const givenUnix = momentDate.unix();
  const todayUnix = todayDate.unix();
  const result = givenUnix <= todayUnix;

  return result;
}

export const checkAvailableDate = (data: any, joiningDate: Date) => {
  const joiningDate1 = new Date(joiningDate);
  const joiningDateNum = joiningDate1.getDate();
  const year = joiningDate1.getFullYear();
  const month = joiningDate1.getMonth();
  let available;

  for (const item of data) {
    const vacancyPlanning = Object.values(item.vacancyPlanning);
    for (const item1 of vacancyPlanning) {
      if (
        (item1 as any)?.day === joiningDateNum ||
        (item1 as any)?.day > joiningDateNum
      ) {
        if ((item1 as any).vacancy !== 0) {
          available = (item1 as any).day;
          break;
        }
      }
    }
  }

  let formattedDate;

  if (typeof available !== "undefined") {
    const dateToAvailable = new Date(year, month, available);
    const options: any = { day: "2-digit", month: "2-digit", year: "numeric" };
    formattedDate = dateToAvailable.toLocaleDateString("en-US", options);
  } else {
    formattedDate = "";
  }
  return formattedDate;
};

export function splitCreditCardNumber(cardNumber: any) {
  // Remove any non-digit characters
  const digitsOnly = cardNumber?.toString().replace(/\D/g, "");
  // Split the digits into groups of 4
  const groups: any = digitsOnly?.match(/.{1,4}/g);
  // Join the groups with a space

  return groups?.join(" ");
}

export function base64toFile(
  base64String: string,
  fileName: string,
  mimeType: string
): File {
  // Remove the data:image/png;base64 prefix
  const base64WithoutPrefix = base64String.replace(/^data:[^;]+;base64,/, "");

  // Convert the Base64 string to a Uint8Array
  const binaryArray = atob(base64WithoutPrefix)
    .split("")
    .map((char) => char.charCodeAt(0));
  const byteArray = new Uint8Array(binaryArray);

  // Create a Blob from the Uint8Array
  const blob = new Blob([byteArray], { type: mimeType });

  // Create a File from the Blob
  const file = new File([blob], fileName, { type: mimeType });

  return file;
}

export const disableActionIfHoliday = (globalHolidayList: any) => {
  const today = new Date();
  if (globalHolidayList.length > 0) {
    for (let index = 0; index < globalHolidayList.length; index++) {
      const item = globalHolidayList[index];
      if (item.dates?.dates?.length === 1) {
        const holiday = new Date(item.dates?.dates[0]);
        if (
          holiday.getDate() === today.getDate() &&
          holiday.getMonth() === today.getMonth() &&
          holiday.getFullYear() === today.getFullYear()
        ) {
          console.log(item.name, "Today is a holiday");
          return item.name;
        }
      } else {
        const startDate = new Date(item.dates?.dates[0]);
        const endDate = new Date(item.dates?.dates[1]);
        for (let i = startDate; i <= endDate; i.setDate(i.getDate() + 1)) {
          if (
            i.getDate() === today.getDate() &&
            i.getMonth() === today.getMonth() &&
            i.getFullYear() === today.getFullYear()
          ) {
            console.log(item.name, "Today is a holiday");
            return item.name;
          }
        }
      }
    }
  }
};

export const convertTo24HourFormat = (
  hour: string,
  minute: string,
  meridian: string
) => {
  let hour24 = parseInt(hour, 10);
  const minute24 = parseInt(minute, 10);

  if (meridian === "PM" && hour24 !== 12) {
    hour24 += 12;
  } else if (meridian === "AM" && hour24 === 12) {
    hour24 = 0;
  }

  return `${hour24.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
};

export const formatDateWithUTC = (inputDate: any) => {
  const {
    globalSettings: { dateFormat },
  } = useGlobalContext();
  const format = dateFormat?.toUpperCase() || "DD-MM-YYYY";

  const momentDate = moment.utc(inputDate);
  // Format the date
  return momentDate.format(format);
};

export const disableActionIfNotWorkingDay = (workingDays: any) => {
  const todayDate = moment.utc().format("dddd");
  if (workingDays["All days(Mon-Fri)"]) {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    if (!days.includes(todayDate)) {
      return true;
    }
  } else {
    const isAvailable = workingDays?.hasOwnProperty(todayDate);
    if (!isAvailable) {
      return true;
    }
  }
};

export const compareCheckinAndCheckoutDate = (checkin: any, checkout: any) => {
  const startOfDay = moment().startOf("day");
  const checkinDate = moment.utc(checkin).format("HH:mm");
  const duration = moment.duration(checkout);
  const checkoutDate = startOfDay.add(duration).format("HH:mm");
  const time1 = moment(checkinDate, "HH:mm");
  const time2 = moment(checkoutDate, "HH:mm");
  if (time1.isAfter(time2)) {
    console.log(1);

    return true;
  } else {
    console.log(2);
    return false;
  }
};

export const createFullAddress = (address: {
  address_line_1: string;
  address_line_2: string;
  city_name: string;
  state_name: string;
  postal_code: string;
  country_name: string;
}) => {
  const fullAddress = [
    address?.address_line_1,
    address?.address_line_2,
    address?.city_name,
    address?.state_name,
    address?.postal_code,
    address?.country_name,
  ];

  const data = fullAddress
    .filter((field) => field !== "null" && field !== undefined && field !== "")
    .join(", ");

  return data;
};

export const formatMessage = (message: string) => {
  return message.charAt(0).toUpperCase() + message.slice(1);
};

export function capitalizeFirstLetter(name: string) {
  return name?.charAt(0).toUpperCase() + name?.slice(1);
}

export function capitalizeAfterSpace(text: any) {
  // Split the text into words
  let words = text?.split(" ");

  // Capitalize the first letter of each word
  for (let i = 0; i < words?.length; i++) {
    if (words[i].length > 0) {
      words[i] = words[i][0].toUpperCase() + words[i].substring(1);
    }
  }

  // Join the words back together with spaces
  let result = words?.join(" ");

  return result;
}

export const getTimeFormat = (date: any) => {
  const formattedTime = moment.utc(date).format("h:mm A"); // 'h:mm A' gives time in 12-hour format with AM/PM
  return formattedTime;
};

export const handleDownloadFileName = (fileUrl: string, fileName: string) => {
  // // Create an anchor element
  // const link = document.createElement("a");
  // link.href = fileUrl;
  // link.download = fileName;
  // console.log("file name", fileName);
  // // Append the anchor element to the body
  // document.body.appendChild(link);
  // console.log("link", link);
  // // Trigger the click event on the anchor element
  // link.click();

  // // Clean up: remove the anchor element from the DOM
  // document.body.removeChild(link);

  fetch(fileUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error) => console.error("Error downloading file:", error));
};
