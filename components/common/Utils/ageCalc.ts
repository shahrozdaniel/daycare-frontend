export function calculateAge(birthdate: any) {
    console.log(birthdate)
    const birthdateObj = new Date(birthdate);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthdateObj.getFullYear();

    // Check if the birthday has occurred this year
    if (
        currentDate.getMonth() < birthdateObj.getMonth() ||
        (currentDate.getMonth() === birthdateObj.getMonth() &&
            currentDate.getDate() < birthdateObj.getDate())
    ) {
        age--;
    }

    console.log(age)
    return age;
}