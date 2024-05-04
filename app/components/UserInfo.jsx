"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { getUser } from "@/helper/AnyUser";
import { Check, Copy, Eye, EyeOff, IndianRupee } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SkeletonCard from "./Skeleton";

const UserInfo = ({ session }) => {
  const [copiedText, setCopiedText] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Fetching user
  const dispatch = useDispatch();
  useEffect(() => {
    if (session?.user?.id) {
      dispatch(getUser(session.user.id));
    }
  }, [dispatch, session?.user?.id]);

  const { user, loading } = useSelector((state) => state.user);

  // Copy to clipboard
  const copyToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
    setCopiedText(text);
  };
  useEffect(() => {
    let timer;
    if (copiedText) {
      timer = setTimeout(() => {
        setCopiedText("");
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [copiedText]);

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

  if (loading) {
    return (
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 p-2 gap-4 mt-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <>
      {user?.data && (
        <h1 className="text-xl md:text-3xl font-bold text-center md:text-start mt-5">
          User Information
        </h1>
      )}
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 p-2 gap-4 mt-5">
        {/* User Name */}
        {user?.data?.name && (
          <Card className="p-2 bg-black text-gray-200 border-gray-600 w-full justify-between items-center flex">
            <div className="flex flex-col items-start justify-start gap-2">
              <CardTitle className="text-base">Name:</CardTitle>
              <CardDescription>{user?.data?.name}</CardDescription>
            </div>

            <Button
              onClick={() => copyToClipboard(user?.data?.name)}
              className="p-2 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-900"
            >
              {copiedText === user?.data?.name ? (
                <Check className="text-sm" />
              ) : (
                <Copy />
              )}
            </Button>
          </Card>
        )}
        {/* User Email */}
        {user?.data?.email && (
          <Card className="p-2 bg-black text-gray-200 border-gray-600 w-full justify-between items-center flex">
            <div className="flex flex-col items-start justify-start gap-2">
              <CardTitle className="text-base">Email:</CardTitle>
              <CardDescription>{user?.data?.email}</CardDescription>
            </div>

            <Button
              onClick={() => copyToClipboard(user?.data?.email)}
              className="p-2 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-900"
            >
              {copiedText === user?.data?.email ? (
                <Check className="text-sm" />
              ) : (
                <Copy />
              )}
            </Button>
          </Card>
        )}
        {/* User Phone */}
        {user?.data?.phone && (
          <Card className="p-2 bg-black text-gray-200 border-gray-600 w-full justify-between items-center flex">
            <div className="flex flex-col items-start justify-start gap-2">
              <CardTitle className="text-base">Phone:</CardTitle>
              <CardDescription>{user?.data?.phone}</CardDescription>
            </div>

            <Button
              onClick={() => copyToClipboard(user?.data?.phone)}
              className="p-2 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-900"
            >
              {copiedText === user?.data?.phone ? (
                <Check className="text-sm" />
              ) : (
                <Copy />
              )}
            </Button>
          </Card>
        )}
        {/* Domain name */}

        {user?.data?.domains &&
          user?.data?.domains.map((domain) => (
            <Card
              key={domain.id}
              className="p-2 bg-black text-gray-200 border-gray-600 w-full justify-between items-center flex"
            >
              <div className="flex flex-col items-start justify-start gap-2">
                <CardTitle className="text-base">domain:</CardTitle>
                <CardDescription>
                  <a
                    target="_blank"
                    href={domain?.name}
                    className="text-blue-400 hover:underline"
                  >
                    name : {domain?.name}
                  </a>
                  <p>price : ₹ {domain?.price}</p>
                </CardDescription>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => copyToClipboard(domain?.name)}
                  className="p-2 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-900"
                >
                  {copiedText === domain?.name ? (
                    <Check className="text-sm" />
                  ) : (
                    <Copy />
                  )}
                </Button>
                <Button
                  onClick={() => console.log(domain?.price)}
                  className="p-2 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-900"
                >
                  <IndianRupee />
                </Button>
              </div>
            </Card>
          ))}

        {/* Hosting  join & renew*/}

        {user?.data?.hosting &&
          user?.data?.hosting.map((host) => (
            <Card
              key={host.id}
              className="p-2 bg-black text-gray-200 border-gray-600 w-full justify-between items-center flex"
            >
              <div className="flex flex-col items-start justify-start gap-2">
                <CardTitle className="text-base">Hosting:</CardTitle>
                <CardDescription className="space-y-1">
                  Join Date: {formatDate(new Date(host?.purchasedAt))}
                  <br />
                  Renew Date: {formatRenewalDate(new Date(host?.purchasedAt))}
                  <p>price : ₹ {host?.price}</p>
                </CardDescription>
              </div>
              <Button
                onClick={() => console.log(host?.price)}
                className="p-2 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-900"
              >
                <IndianRupee />
              </Button>
            </Card>
          ))}
        {/* cPanel */}
        {user?.data?.cpanel &&
          user?.data?.cpanel?.map((cpanel) => (
            <Card
              key={cpanel?.id}
              className="p-2 bg-black text-gray-200 border-gray-600 w-full justify-between items-center flex"
            >
              <div className="flex items-start justify-center">
                <div className="flex flex-col items-start justify-start gap-2">
                  <CardTitle className="text-base">Cpanel URL:</CardTitle>
                  <CardDescription>
                    <a target="_blank" href={cpanel?.cpanelUrl}>
                      {cpanel?.cpanelUrl}
                    </a>
                  </CardDescription>

                  <span className="text-sm  p-2 rounded-md shadow-md">
                    If you need the cPanel ID and password, please contact the
                    admin.
                  </span>
                </div>

                <Button
                  onClick={() => copyToClipboard(cpanel?.cpanelUrl)}
                  className="p-2 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-900"
                >
                  {copiedText === cpanel?.cpanelUrl ? (
                    <Check className="text-sm" />
                  ) : (
                    <Copy />
                  )}
                </Button>
              </div>
            </Card>
          ))}
        {/* Dashboard  login URL*/}

        {user?.data?.dashboard &&
          user?.data?.dashboard?.map((dash) => (
            <Card
              key={dash.id}
              className="p-2 bg-black text-gray-200 border-gray-600 w-full justify-between items-center flex"
            >
              <div className="w-full flex flex-col items-start justify-start gap-2">
                <CardTitle className="text-base">Dashboard URL:</CardTitle>
                <div className="w-full flex justify-between items-center">
                  <CardDescription>
                    <a
                      target="_blank"
                      href={dash?.loginUrl}
                      className="text-blue-400 hover:underline"
                    >
                      URL: {dash?.loginUrl}
                    </a>
                  </CardDescription>

                  <Button
                    onClick={() => copyToClipboard(dash?.loginUrl)}
                    className="p-1 w-6 h-6 rounded-full bg-gray-800 hover:bg-gray-900"
                  >
                    {copiedText === dash?.loginUrl ? (
                      <Check className="text-sm" />
                    ) : (
                      <Copy />
                    )}
                  </Button>
                </div>
                <div className="w-full flex justify-between items-center">
                  <CardDescription>
                    <span>ID: {dash?.dashboardId}</span>
                  </CardDescription>

                  <Button
                    onClick={() => copyToClipboard(dash?.dashboardId)}
                    className="p-1 w-6 h-6 rounded-full bg-gray-800 hover:bg-gray-900"
                  >
                    {copiedText === dash?.dashboardId ? (
                      <Check className="text-sm" />
                    ) : (
                      <Copy />
                    )}
                  </Button>
                </div>
                <div className="w-full flex justify-between items-center">
                  <CardDescription>
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
                    <Button
                      onClick={() => copyToClipboard(dash?.password)}
                      className="p-1 w-6 h-6 rounded-full bg-gray-800 hover:bg-gray-900"
                    >
                      {copiedText === dash?.password ? (
                        <Check className="text-sm" />
                      ) : (
                        <Copy />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
      </div>
    </>
  );
};

export default UserInfo;
