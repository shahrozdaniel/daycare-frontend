"use client"

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '@/components/common/Button';
import RegistrationForm from './RegistrationForm';
import { checkHasPermission } from '@/utils/permission';
import NotPermission from '../notPermit';
import { useGlobalContext } from '../context/store';

interface FormData {
  image: File;
}

const Page: React.FC = () => {
  const { permission, IsAdmin } = useGlobalContext();
  let userPermission = permission?.role_detail?.permissions


  return <>
    {/* {(IsAdmin || userPermission?.child_management?.add_edit) ? <RegistrationForm /> : <NotPermission />} */}
    {(IsAdmin || userPermission?.child_management?.add_edit) ? <RegistrationForm /> : <RegistrationForm />}

  </>


};

export default Page;
