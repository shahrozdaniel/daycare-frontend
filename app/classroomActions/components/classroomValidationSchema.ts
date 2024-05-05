import * as yup from "yup";
const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
export const classroomCheckIn = yup.object().shape({
    checkInNote: yup.string().required('Check In Notes are required'),
    checkIn: yup.string().required('Check In Time is required').matches(timeRegex, 'Invalid time format. Please use hh:mm')

});

export const classroomActivity = yup.object().shape({
    // classroomCategory: yup.string().required('Classroom Catogery is required'),
    Domain: yup.string().required('Domain is required'),
    Skill: yup.string().required('Skill is required'),
    Indicators: yup.string().required(' Indicators is required'),
    description: yup.string().required('Description is required'),
});
export const classroomAddNotes = yup.object().shape({
    noteTypes: yup.string().required('Note Type is required'),
    addNotes: yup.string().required('Notes are required'),
});
export const classroomFoodType = yup.object().shape({

    quantity: yup.string().required('Quantity is required'),

});

export const classroomSleepRecords = yup.object().shape({
    startTime: yup.string().required('Start Time is required'),
    endTime: yup.string().required('End Time is required'),
    sleepCheck: yup.string().required('Sleep Check  is required'),
    // DoNotSleep: yup.string(),
    addNotes: yup.string().required('Notes are required'),
});

export const classroomHealthRecords = yup.object().shape({
    healthStatus: yup.string().required('Health status is required'),
    observations: yup.string().required('Observations is required'),
    addNotes: yup.string().required('Notes are required'),
});

export const classroomMoodRecords = yup.object().shape({
    addNotes: yup.string().required('Notes are required'),
    mood: yup.string().required(),
    Level: yup.string().required(),
});

export const classroomMoveRoomsRecords = yup.object().shape({
    time: yup.string().required('Time is required'),
    classroom: yup.string().required('Classroom is required'),
    addNotes: yup.string().required('Notes are required'),
});


export const classroomCheckOut = yup.object().shape({
    checkOutNote: yup.string().required('Checkout Notes are required'),
    checkOut: yup.string().required('CheckOut Date & Time is required')
});

export const classroomFluidReport = yup.object().shape({
    fluidType: yup.string().required('Fluid Type is required'),
    addNotes: yup.string().required('Notes are required'),
    quantity: yup.string().required('Quantity is required'),
});

export const classroomSuppliesReport = yup.object().shape({
    supplies: yup.string().required('Supplies Type is required'),
    addNotes: yup.string().required('Notes are required'),

});


export const classroomLooBreakReport = yup.object().shape({
    startTime: yup.string().required('Start Time is required'),
    toiletType: yup.string().required('Toilet Type is required'),
    addNotes: yup.string().required('Notes are required'),

});

