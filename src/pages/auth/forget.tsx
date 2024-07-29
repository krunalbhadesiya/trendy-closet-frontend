import { ForgetPasswordForm } from '@/components/auth/ForgetPasswordFrom';
import React from 'react';

const ForgetPassword: React.FC = () => {
  return (
    <div className="grid w-full min-h-screen lg:grid-cols-2">
      <div className="hidden bg-muted lg:block">
        <img
          src="/authpage.jpg"
          alt="Login Image"
          width="1600"
          height="900"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex items-center justify-center p-6 lg:p-10">
        <div className="mx-auto w-full max-w-[400px] space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Forget Password</h1>
          </div>
          <ForgetPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
