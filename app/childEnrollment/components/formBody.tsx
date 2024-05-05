import { ChildDetailInterface } from "./childEnrollmentValidation";
import moment from "moment";
export const getChildDetailBody = (
  register: ChildDetailInterface,
  days: any[]
) => {
  return {
    first_name: register.childFirstName,
    last_name: register.childLastName,
    preferred_name: register.childPreferredName,
    dob: register.dob,
    age: register.age,
    language: register.childLanguage,
    gender: register.childGender,
    start_date: register.startDate,
    end_date: register.endDate || null,
    classroomId: register.classroom,
    days: days,
  };
};
export const getParentDetailBody = (register: any, custudian: any) => {
  const body = [
    {
      id: register.parent1Id ? register.parent1Id : "",
      first_name: register.parent1FirstName,
      last_name: register.parent1LastName,
      preferred_name: register.parent1PreferredName,
      email: register.parent1Email ? register.parent1Email : "",
      phone_no: register.parent1Contact.replace(/\D/g, ""),
      alternate_phone_no: null,
      gender: register.parent1Gender,
      address_id: register.parent1AddressId ? register.parent1AddressId : "",
      relation: register.parent1Relation,
      occupation: register.parent1Occupation,
      is_custodian: custudian,
      language: null,
      is_primary: null,
      is_emergency_contact: null,
      is_pickup_authorized: null,
      address: {
        id: register.parent1AddressId ? register.parent1AddressId : "",
        street: register.parent1Street,
        address_line_1: register.parent1AddressLine1,
        address_line_2: register.parent1AddressLine2,
        city: register.parent1City,
        state: register.parent1State,
        country: register.parent1Country,
        postal_code: register.parent1PinCode,
        longitude: null,
        lattitude: null,
        created_at: null,
        updated_at: null,
      },
    },
  ];
  if (register.parent2FirstName && register.parent2FirstName) {
    body.push({
      id: register.parent2Id ? register.parent2Id : "",
      first_name: register.parent2FirstName,
      last_name: register.parent2LastName,
      preferred_name: register.parent2PreferredName,
      phone_no: register.parent2Contact.replace(/\D/g, ""),
      alternate_phone_no: null,
      gender: register.parent2Gender,
      address_id: register.parent2AddressId ? register.parent2AddressId : "",
      relation: register.parent2Relation,
      occupation: register.parent2Occupation,
      email: register.parent2Email ? register.parent2Email : "",
      is_custodian: null,
      language: null,
      is_primary: null,
      is_emergency_contact: null,
      is_pickup_authorized: null,
      address: {
        id: register.parent2AddressId ? register.parent2AddressId : "",
        street: register.parent2Street,
        address_line_1: register.parent2AddressLine1,
        address_line_2: register.parent2AddressLine2,
        city: register.parent2City,
        state: register.parent2State,
        country: register.parent2Country,
        postal_code: register.parent2PinCode,
        longitude: null,
        lattitude: null,
        created_at: null,
        updated_at: null,
      },
    });
  }
  return body;
};

export const getDietaryInformationBody = (register: any) => {
  return {
    id: register.id ? register.id : "",
    food_type: register.foodType,
    food_details: register.pleaseSpecify,
    other_details: register.specifyDietary,
  };
};

export const getSleepArrangementBody = (register: any) => {
  return {
    id: register.id ? register.id : "",
    nap_count: register.napCount,
    nap_times: register.sleepArrangment?.map((item: any) => item.napTime),
    nap_duration: register.napDuration,
  };
};

export const getOtherDetailsBody = (register: any) => {
  return {
    id: register.id ? register.id : "",
    child_use_diapers: register.otherChildUseDiapers,
    other_details: register.otherDetails,
  };
};

export const getPhysicalRequirementBody = (register: any) => {
  return {
    id: register.id ? register.id : "",
    child_use_diapers: register.physicalChildUseDiaper,
    child_use_washroom: Number(register.washroomOptions),
    other_details: register.physicalReqOtherDetail,
  };
};
export const getImmunisationBody = (register: any) => {
  const originalDate = moment(register.vaccinationDate);
  return {
    id: register.vaccinationId ? register.vaccinationId : "",
    vaccination_type: register.vaccinationType,
    vaccination_date: originalDate.format("YYYY-MM-DD"),
  };
};
export const getMedicalBody = (register: any, isChildAnaphylactic: string) => {
  return {
    allergies: register.allergies,
    medication: register.medication,
    id: register.medicalInfoId ? register.medicalInfoId : "",
    is_child_anaphylactic: isChildAnaphylactic,
  };
};
export const getEmergencyContact = (register: any) => {
  return register.emergencyContactDetails.map((data: any) => {
    return {
      id: data.id ? data.id : "",
      first_name: data?.firstName,
      last_name: data?.lastName,
      preferred_name: data?.preferredName,
      phone_no: data?.contact.replace(/\D/g, ""),
      gender: data?.gender,
      email: data.email ? data.email : "",
      relation: data?.relation,
      is_custodian: null,
      language: "",
      is_emergency_contact: true,
      is_pickup_authorized: data?.isPickupAuthorized == "yes" ? true : false,
    };
  });
};
export const getEmergencyDoctor = (register: any) => {
  return {
    id: register.doctorId ? register.doctorId : "",
    first_name: register.emergencyfirstName,
    last_name: register.emergencylastName,
    preferred_name: register.emergencypreferredName,
    phone_no: register.emergencyContact,
    email: register.emergencyEmail,
    address: {
      address_id: register.addressId ? register.addressId : "",
      address1: register.emergencyAddressLine1,
      address2: register.emergencyAddressLine2,
      street: register.emergencyAddressLine1 + register.emergencyAddressLine2,
      city: register.emergencyCity,
      state: register.emergencyState,
      postal_code: register.emergencyPincode,
      country: register.emergencyCountry,
    },
  };
};
