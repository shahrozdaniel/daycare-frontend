import { FieldValues } from "react-hook-form";
import { ApiInstance } from "../../../../../utils/ApiInstance";
import { getAuthToken } from "@/components/common/Utils";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/components/common/Utils/firebase";
import { Timestamp, doc, setDoc } from "firebase/firestore";

export interface PasswordBody extends FieldValues {
  username: string;
  password: string;
  confirmPassword: string;
}

// password setup api
export const setupPassword = async (
  body: PasswordBody,
  router: any,
  toast: any
) => {
  try {
    const res = await ApiInstance.put("/auth/password", body);
    if (res.data.success) {
      createUserWithEmailAndPassword(auth, res?.data?.data.email, body.password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          await updateProfile(user, {
            displayName: res?.data?.data.firstName,
            photoURL: "",
          });

          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            child: [],
            firstName: res?.data?.data.firstName,
            email: res?.data?.data.email,
            userName: res?.data?.data.userName,
            userId: res?.data?.data.userId,
            role:
              res?.data?.data?.roleDetails?.name == "educator"
                ? "educator"
                : res?.data?.data?.roleDetails?.name == "admin"
                ? "admin"
                : res?.data?.data?.roleDetails?.name,
            photoURL: res?.data?.data?.photo ? res?.data?.data?.photo : "",
            deviceToken: "",
            deviceType: "web",
            name: res?.data?.data.firstName,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
            dayCareId: res?.data?.data?.daycareId,
            classroomName: res?.data?.data?.classroomData?.classroom_name
              ? res?.data?.data?.classroomData?.classroom_name
              : "",
            classroomId: res?.data?.data?.classroomData?.classroom_id
              ? res?.data?.data?.classroomData?.classroom_id
              : "",
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });

      router.push("/");
      setTimeout(() => {
        toast.success("Password reset successfully.");
      }, 2000);
    } else {
      console.log("error");
    }
  } catch (err: any) {
    toast.success(err.response.data.message);
  }
};

// verify token api
export const verifyEmail = async (
  router: any,
  getToken: string | null | undefined
) => {
  try {
    const res = await ApiInstance.get(`/auth/email-verify?token=${getToken}`);
    if (res.data.expiry) {
      // router.push("/resetPassword");
      return res;
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log("err in register ", err);
  }
};
