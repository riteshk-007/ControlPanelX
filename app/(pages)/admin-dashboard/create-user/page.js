import CreateUserform from "@/app/components/CreateUserform";
import { User } from "lucide-react";

const CreateUser = () => {
  return (
    <div className="w-full flex-col flex p-5">
      <h1 className="text-2xl font-bold mb-5 flex gap-2 items-center ">
        <User />
        Create User
      </h1>
      <CreateUserform />
    </div>
  );
};

export default CreateUser;
