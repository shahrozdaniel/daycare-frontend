'use client'
import { useGlobalContext } from "@/app/context/store";



export const checkHasPermission = (permissionName: string) => {
    const { permission } = useGlobalContext();
    let permissionArray = permission
    if (permissionName == 'admin') {
        return true
    }
    const allow_permison = permissionArray?.includes(permissionName);
    if (allow_permison) {
        return true
    } else {
        return false
    }
}
