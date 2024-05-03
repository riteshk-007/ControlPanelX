"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { getUser } from "@/helper/AnyUser";
import { Check, Clipboard } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SkeletonCard from "./Skeleton";

const UserInfo = ({ session }) => {
  const [copiedText, setCopiedText] = useState("");

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

  // renew date
  const fixedDate = new Date(user?.data?.hosting);
  const renewDate = new Date(user?.data?.hosting);
  renewDate.setFullYear(renewDate.getFullYear() + 1);

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
      <h1 className="text-xl md:text-3xl font-bold text-center md:text-start mt-5">
        User Information
      </h1>
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
                <Clipboard className="text-sm" />
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
                <Clipboard className="text-sm" />
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
                <Clipboard className="text-sm" />
              )}
            </Button>
          </Card>
        )}
        {/* Domain name */}
        {user?.data?.domain && (
          <Card className="p-2 bg-black text-gray-200 border-gray-600 w-full justify-between items-center flex">
            <div className="flex flex-col items-start justify-start gap-2">
              <CardTitle className="text-base">domain:</CardTitle>
              <CardDescription>
                <a target="_blank" href={user?.data?.domain}>
                  {user?.data?.domain}
                </a>
              </CardDescription>
            </div>

            <Button
              onClick={() => copyToClipboard(user?.data?.domain)}
              className="p-2 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-900"
            >
              {copiedText === user?.data?.domain ? (
                <Check className="text-sm" />
              ) : (
                <Clipboard className="text-sm" />
              )}
            </Button>
          </Card>
        )}
        {/* Hosting  join & renew*/}
        {user?.data?.hosting && (
          <Card className="p-2 bg-black text-gray-200 border-gray-600 w-full justify-between items-center flex">
            <div className="flex flex-col items-start justify-start gap-2">
              <CardTitle className="text-base">Hosting:</CardTitle>
              <CardDescription>
                Join Date: {fixedDate.toDateString()} <br />
                Renew Date: {renewDate.toDateString()}
              </CardDescription>
            </div>
          </Card>
        )}
        {/* Dashboard  login URL*/}
        {user?.data?.dashUrl && (
          <Card className="p-2 bg-black text-gray-200 border-gray-600 w-full justify-between items-center flex">
            <div className="flex flex-col items-start justify-start gap-2">
              <CardTitle className="text-base">Dashboard URL:</CardTitle>
              <CardDescription>
                <a target="_blank" href={user?.data?.dashUrl}>
                  {user?.data?.dashUrl}
                </a>
              </CardDescription>
            </div>

            <Button
              onClick={() => copyToClipboard(user?.data?.dashUrl)}
              className="p-2 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-900"
            >
              {copiedText === user?.data?.dashUrl ? (
                <Check className="text-sm" />
              ) : (
                <Clipboard className="text-sm" />
              )}
            </Button>
          </Card>
        )}
        {/* dashboard id*/}
        {user?.data?.dashId && (
          <Card className="p-2 bg-black text-gray-200 border-gray-600 w-full justify-between items-center flex">
            <div className="flex flex-col items-start justify-start gap-2">
              <CardTitle className="text-base">Dashboard ID:</CardTitle>
              <CardDescription>{user?.data?.dashId}</CardDescription>
            </div>

            <Button
              onClick={() => copyToClipboard(user?.data?.dashId)}
              className="p-2 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-900"
            >
              {copiedText === user?.data?.dashId ? (
                <Check className="text-sm" />
              ) : (
                <Clipboard className="text-sm" />
              )}
            </Button>
          </Card>
        )}
        {/* dashboard password*/}
        {user?.data?.dashpass && (
          <Card className="p-2 bg-black text-gray-200 border-gray-600 w-full justify-between items-center flex">
            <div className="flex flex-col items-start justify-start gap-2">
              <CardTitle className="text-base">Dashboard Password:</CardTitle>
              <CardDescription>{user?.data?.dashpass}</CardDescription>
            </div>

            <Button
              onClick={() => copyToClipboard(user?.data?.dashpass)}
              className="p-2 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-900"
            >
              {copiedText === user?.data?.dashpass ? (
                <Check className="text-sm" />
              ) : (
                <Clipboard className="text-sm" />
              )}
            </Button>
          </Card>
        )}
        {user?.data?.cpanel && (
          <Card className="p-2 bg-black text-gray-200 border-gray-600 w-full justify-between items-center flex">
            <div className="flex flex-col items-start justify-start gap-2">
              <CardTitle className="text-base">Cpanel URL:</CardTitle>
              <CardDescription>
                <a target="_blank" href={user?.data?.cpanel}>
                  {user?.data?.cpanel}
                </a>
              </CardDescription>
            </div>

            <Button
              onClick={() => copyToClipboard(user?.data?.cpanel)}
              className="p-2 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-900"
            >
              {copiedText === user?.data?.cpanel ? (
                <Check className="text-sm" />
              ) : (
                <Clipboard className="text-sm" />
              )}
            </Button>
          </Card>
        )}
      </div>
    </>
  );
};

export default UserInfo;
