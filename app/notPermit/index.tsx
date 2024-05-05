// components/NotPermission.js
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';
 

const NotPermission = () => {
  const router = useRouter()
  return (
    <>
      <div className='m-2'>
        <Button onClick={() => router?.back()}>
          {" <-  Back"}
        </Button>
      </div>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded shadow-md text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Permission Denied</h1>
          <p className="text-gray-600">You do not have the necessary permissions to access this page.</p>
        </div>
      </div>
    </>
  );
};

export default NotPermission;
