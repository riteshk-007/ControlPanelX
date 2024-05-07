"use client";

import SkeletonCard from "@/app/components/Skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { getUser } from "@/helper/AnyUser";
import { Edit, Eye, EyeOff } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const User = () => {
  const params = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (params?.id) {
      dispatch(getUser(params?.id));
    }
  }, [dispatch, params?.id]);

  const { user, loading } = useSelector((state) => state?.user);

  // renew Date
  function formatDate(date) {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  function formatRenewalDate(date) {
    const renewalDate = new Date(
      date.getFullYear() + 1,
      date.getMonth(),
      date.getDate()
    );
    const options = { month: "long", day: "numeric", year: "numeric" };
    return renewalDate.toLocaleDateString("en-US", options);
  }
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-semibold text-gray-800">User</h1>
      {loading ? (
        <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 p-2 gap-4 mt-5">
          {Array.from({ length: 7 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <Dialog>
          <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
            {/* User Name */}
            {user?.data?.name && (
              <Card className="p-2 text-gray-900 border-gray-400 shadow w-full justify-between items-center flex">
                <div className="flex flex-col items-start justify-start gap-2">
                  <CardTitle className="text-base font-bold">Name:</CardTitle>
                  <CardDescription className="text-gray-700 font-semibold">
                    {user?.data?.name}
                  </CardDescription>
                </div>
                <DialogTrigger asChild>
                  <Button className="p-2 w-8 h-8 rounded-full bg-gray-900 hover:bg-gray-950">
                    <Edit />
                  </Button>
                </DialogTrigger>
              </Card>
            )}
            {/* User Email */}
            {user?.data?.email && (
              <Card className="p-2 text-gray-900 border-gray-400 shadow w-full justify-between items-center flex">
                <div className="flex flex-col items-start justify-start gap-2">
                  <CardTitle className="text-base font-bold">Email:</CardTitle>
                  <CardDescription className="text-gray-700 font-semibold">
                    {user?.data?.email}
                  </CardDescription>
                </div>
                <DialogTrigger asChild>
                  <Button className="p-2 w-8 h-8 rounded-full bg-gray-900 hover:bg-gray-950">
                    <Edit />
                  </Button>
                </DialogTrigger>
              </Card>
            )}
            {/* User Phone */}
            {user?.data?.phone && (
              <Card className="p-2 text-gray-900 border-gray-400 shadow w-full justify-between items-center flex">
                <div className="flex flex-col items-start justify-start gap-2">
                  <CardTitle className="text-base font-bold">Phone:</CardTitle>
                  <CardDescription className="text-gray-700 font-semibold">
                    {user?.data?.phone}
                  </CardDescription>
                </div>

                <DialogTrigger asChild>
                  <Button className="p-2 w-8 h-8 rounded-full bg-gray-900 hover:bg-gray-950">
                    <Edit />
                  </Button>
                </DialogTrigger>
              </Card>
            )}

            {/* Domain name */}

            {user?.data?.domains &&
              user?.data?.domains.map((domain) => (
                <Card
                  key={domain.id}
                  className="p-2 text-gray-900 border-gray-400 shadow w-full justify-between items-center flex"
                >
                  <div className="flex flex-col items-start justify-center gap-2">
                    <CardTitle className="text-base font-bold">
                      domain:
                    </CardTitle>
                    <CardDescription className="text-gray-700 font-semibold">
                      <a
                        target="_blank"
                        href={domain?.name}
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        name : {domain?.name}
                      </a>
                      <p>price : ₹ {domain?.price}</p>
                    </CardDescription>
                  </div>

                  <div className="flex flex-col gap-2">
                    <DialogTrigger asChild>
                      <Button className="p-2 w-8 h-8 rounded-full bg-gray-900 hover:bg-gray-950">
                        <Edit />
                      </Button>
                    </DialogTrigger>
                    <DialogTrigger asChild>
                      <Button className="p-2 w-8 h-8 rounded-full bg-gray-900 hover:bg-gray-950">
                        <Edit />
                      </Button>
                    </DialogTrigger>
                  </div>
                </Card>
              ))}

            {/* Hosting  join & renew*/}

            {user?.data?.hosting &&
              user?.data?.hosting.map((host) => (
                <Card
                  key={host.id}
                  className="p-2 text-gray-900 border-gray-400 shadow w-full justify-between items-center flex"
                >
                  <div className="flex flex-col items-start justify-start gap-2">
                    <CardTitle className="text-base font-bold">
                      Hosting:
                    </CardTitle>
                    <CardDescription className="space-y-1 text-gray-700 font-semibold">
                      Join Date: {formatDate(new Date(host?.purchasedAt))}
                      <br />
                      Renew Date:{" "}
                      {formatRenewalDate(new Date(host?.purchasedAt))}
                      <p>price : ₹ {host?.price}</p>
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-2">
                    <DialogTrigger asChild>
                      <Button className="p-2 w-8 h-8 rounded-full bg-gray-900 hover:bg-gray-950">
                        <Edit />
                      </Button>
                    </DialogTrigger>
                    <DialogTrigger asChild>
                      <Button className="p-2 w-8 h-8 rounded-full bg-gray-900 hover:bg-gray-950">
                        <Edit />
                      </Button>
                    </DialogTrigger>
                  </div>
                </Card>
              ))}
            {/* cPanel */}
            {user?.data?.cpanel &&
              user?.data?.cpanel?.map((cpanel) => (
                <Card
                  key={cpanel?.id}
                  className="p-2 text-gray-900 border-gray-400 shadow w-full justify-between items-center flex"
                >
                  <div className="flex items-start justify-between w-full">
                    <div className="flex flex-col items-start justify-start gap-2">
                      <CardTitle className="text-base font-bold">
                        Cpanel URL:
                      </CardTitle>
                      <CardDescription className="text-gray-700 font-semibold">
                        <a
                          target="_blank"
                          href={cpanel?.cpanelId}
                          className="text-blue-600 font-semibold hover:underline"
                        >
                          {cpanel?.cpanelId}
                        </a>
                      </CardDescription>
                    </div>

                    <DialogTrigger asChild>
                      <Button className="p-2 w-8 h-8 rounded-full bg-gray-900 hover:bg-gray-950">
                        <Edit />
                      </Button>
                    </DialogTrigger>
                  </div>
                </Card>
              ))}
            {/* Dashboard  login URL*/}

            {user?.data?.dashboard &&
              user?.data?.dashboard?.map((dash) => (
                <Card
                  key={dash.id}
                  className="p-2 text-gray-900 border-gray-400 shadow w-full justify-between items-center flex"
                >
                  <div className="w-full flex flex-col items-start justify-start gap-2">
                    <CardTitle className="text-base font-bold">
                      Dashboard URL:
                    </CardTitle>
                    <div className="w-full flex justify-between items-center">
                      <CardDescription className="text-gray-700 font-semibold">
                        <a
                          target="_blank"
                          href={dash?.loginUrl}
                          className="text-blue-600 font-semibold hover:underline"
                        >
                          URL: {dash?.loginUrl}
                        </a>
                      </CardDescription>

                      <DialogTrigger asChild>
                        <Button className="p-2 w-8 h-8 rounded-full bg-gray-900 hover:bg-gray-950">
                          <Edit />
                        </Button>
                      </DialogTrigger>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <CardDescription className="text-gray-700 font-semibold">
                        <span>ID: {dash?.dashboardId}</span>
                      </CardDescription>

                      <DialogTrigger asChild>
                        <Button className="p-2 w-8 h-8 rounded-full bg-gray-900 hover:bg-gray-950">
                          <Edit />
                        </Button>
                      </DialogTrigger>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <CardDescription className="text-gray-700 font-semibold">
                        <span>
                          Password: {showPassword ? dash?.password : "••••••••"}
                        </span>
                      </CardDescription>

                      <div className="flex items-center justify-center gap-2">
                        {showPassword ? (
                          <EyeOff
                            className="p-1 w-7 h-7"
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        ) : (
                          <Eye
                            className="p-1 w-7 h-7"
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        )}
                        <DialogTrigger asChild>
                          <Button className="p-2 w-8 h-8 rounded-full bg-gray-900 hover:bg-gray-950">
                            <Edit />
                          </Button>
                        </DialogTrigger>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default User;
