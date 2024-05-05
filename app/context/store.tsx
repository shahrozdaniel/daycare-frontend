"use client";
import { getloggedInuserPermission } from "@/services/authpermission";
import { dayCareSettingDetails, dayCareSettingHolidayList } from "@/services/dayCareSetting";
import { set } from "date-fns";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { boolean } from "yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/components/common/Utils/firebase";
import { decodeUserToken } from "@/utils/utilityFunctions";
interface ContextProps {
  IsAdmin: boolean;
  permission: any;
  setpermission: Dispatch<SetStateAction<string[]>>;
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
  roledata: any;
  setRoleData: Dispatch<SetStateAction<string[]>>;
  globalSettings: any;
  setGlobalSettings: Dispatch<SetStateAction<any>>;
  globalHolidayList: any;
  recordedit: [any[], Dispatch<SetStateAction<any[]>>];
  certifEdit: [any[], Dispatch<SetStateAction<any[]>>];
  trainingedit: [any[], Dispatch<SetStateAction<any[]>>];
}
const GlobalContext = createContext<ContextProps>({
  IsAdmin: false,
  setIsAdmin: (): void => {},
  permission: [],
  setpermission: (): void => {},
  roledata: [],
  setRoleData: (): void => {},
  globalSettings: {},
  setGlobalSettings: (): void => {},
  globalHolidayList: [],
  recordedit: [[], (): void => {}],
  certifEdit: [[], (): void => {}],
  trainingedit: [[], (): void => {}],
});
interface GlobalContextType {
  children: ReactNode;
}
export const GlobalContextProvider = ({ children }: GlobalContextType) => {
  const [permission, setpermission] = useState<string[]>([]);
  const [roledata, setRoleData] = useState<string[]>([]);
  const [editRecordData, setEditRecordData] = useState<any[]>([]);
  const [editCertifData, setEditCertifData] = useState<any[]>([]);
  const [editTrainingData, setEditTrainingData] = useState<any[]>([]);
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [IsAdmin, setIsAdmin] = useState<any>(false);
  const [globalSettings, setGlobalSettings] = useState<any>({});
  const [globalHolidayList, setGlobalHolidayList] = useState<any[]>([]);
  const token = localStorage.getItem("token");
 
  const user = token && decodeUserToken(token);
  const path = usePathname();
  const router = useRouter();
  const [autoLogout, setAutoLogout] = useState(false);

  const loggedInPermission = async () => {
    let res, daycareData, holidayData;
    try {
      res = await getloggedInuserPermission();
      if (res?.success) {
        // console.log(res?.data?.permissionDetails)
        setpermission(res?.data?.permissionDetails);
        setRoleData(res?.data);
        if (res?.data?.role_detail?.roleName == "admin") {
          setIsAdmin(true);
        }
        setpermission(res?.data);
        daycareData = await dayCareSettingDetails();
        holidayData = await dayCareSettingHolidayList();
        if (daycareData?.success) {
          setGlobalSettings(daycareData?.dayCareSetting);
        }
        if(holidayData?.success){
          setGlobalHolidayList(holidayData?.data);
        }
      }
    } catch (error: any) {
      console.log(error?.response?.data?.error);
    }
  };
  const handleLogout = () => {
    window.localStorage.clear();
    signOut(auth)
      .then(() => {})
      .catch((error: any) => {
        // An error happened.
        console.log(error);
      });
    router.push("/");
  };

  useEffect(() => {
    const redirectLogic = () => {
      // if (
      //   !token &&
      //   path !== "/register" &&
      //   path !== "/login" &&
      //   path !== "/resetPassword" &&
      //   path !== "/register/passwordSetup" &&
      //   path !== "/" &&
      //   path !== "/thankyouPageRegister" &&
      //   path !== "/verifyOtp"
      // ) {
      //   router.push("/");
      // }
    };

    if (token && user?.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      const timeUntilExpiry = user.exp - currentTime;

      if (timeUntilExpiry > 0) {
        setTimeout(async () => {
          handleLogout();
          setAutoLogout(true);
        }, timeUntilExpiry * 1000);
      } else {
        handleLogout();
        setAutoLogout(true);
      }
    }

    redirectLogic();
  }, [path, autoLogout, token]);

  useEffect(() => {
    loggedInPermission();
  }, [path]);

  return (
    <GlobalContext.Provider
      value={{
        IsAdmin,
        setIsAdmin,
        permission,
        setpermission,
        roledata,
        setRoleData,
        globalSettings,
        setGlobalSettings,
        globalHolidayList,
        recordedit: [editRecordData, setEditRecordData],
        certifEdit: [editCertifData, setEditCertifData],
        trainingedit: [editTrainingData, setEditTrainingData],
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => useContext(GlobalContext);