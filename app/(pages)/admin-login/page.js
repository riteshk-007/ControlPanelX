"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AdminForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center sm:px-4">
      <div className="w-full space-y-6 text-gray-600 bg-gray-200 rounded-md shadow-md sm:max-w-md">
        <div className=" shadow-lg p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex items-center justify-center">
              <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
            </div>
            <div>
              <label className="font-medium"> Email</label>
              <Input
                {...register("email", { required: true })}
                type="email"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent  border-black  shadow-sm rounded-lg"
              />
              {errors.email && (
                <p className="text-rose-500">This field is required</p>
              )}
            </div>
            <div>
              <label className="font-medium">Password</label>
              <div className="relative">
                <Input
                  {...register("password", { required: true })}
                  type={showPassword ? "text" : "password"}
                  className="w-full mt-2 px-3 py-2 pr-10 text-gray-500 bg-transparent  border-black  shadow-sm rounded-lg"
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </div>
              </div>
              {errors.password && (
                <p className="text-rose-500">This field is required</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-600 rounded-lg duration-150"
            >
              Log in
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AdminForm;
