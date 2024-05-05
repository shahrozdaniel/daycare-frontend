"use client"

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '@/components/common/Button';
import AddClassroomForm from './AddClassroomForm';

interface FormData {
  image: File;
}

const Page: React.FC = () => {
  return <AddClassroomForm />
};

export default Page;
