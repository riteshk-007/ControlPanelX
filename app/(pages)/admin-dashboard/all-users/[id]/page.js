"use client";
import EditBox from "@/app/components/EditBox";
import SkeletonCard from "@/app/components/Skeleton";
import { Card, CardTitle } from "@/components/ui/card";
import { getUser } from "@/helper/AnyUser";
import { updateBasicInfo } from "@/helper/UpdateSlice";
import { Eye, EyeOff } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const User = () => {
  const params = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState({
    name: "",
    email: "",
    phone: "",
    domain: "",
    domainPrice: "",
    hostingDate: "",
    hostingPrice: "",
    cpanel: "",
    dashboardUrl: "",
    dashboardId: "",
    dashboardPassword: "",
  });
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

  useEffect(() => {
    setValue({
      name: user?.data?.name,
      email: user?.data?.email,
      phone: user?.data?.phone,
    });
  }, [user?.data?.name, user?.data?.email, user?.data?.phone]);
  const updateinfo = () => {
    dispatch(
      updateBasicInfo({
        userId: user?.data?.id,
        updateData: {
          name: value?.name,
          email: value?.email,
          phone: value?.phone,
        },
      })
    );
  };
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-semibold text-gray-800">
        User Details {loading ? "Loading..." : user?.data?.name}
      </h1>
      {loading ? (
        <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 p-2 gap-4 mt-5">
          {Array.from({ length: 7 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
          {/* User Name */}
          {user?.data?.name && (
            <Card className="p-2 text-gray-900 border-gray-400 shadow w-full justify-between items-center flex">
              <div className="flex flex-col items-start justify-start gap-2">
                <CardTitle className="text-base font-bold">Name:</CardTitle>
                <span className="text-gray-700 font-semibold">
                  {user?.data?.name}
                </span>
              </div>
              <EditBox
                name={"Name"}
                value={value?.name}
                onChange={(e) => setValue({ ...value, name: e.target.value })}
                updateInfo={updateinfo}
              />
            </Card>
          )}
          {/* User Email */}
          {user?.data?.email && (
            <Card className="p-2 text-gray-900 border-gray-400 shadow w-full justify-between items-center flex">
              <div className="flex flex-col items-start justify-start gap-2">
                <CardTitle className="text-base font-bold">Email:</CardTitle>
                <span className="text-gray-700 font-semibold">
                  {user?.data?.email}
                </span>
              </div>
              <EditBox
                name={"Email"}
                value={user?.data?.email}
                onChange={(e) => setValue({ ...value, email: e.target.value })}
                updateInfo={updateinfo}
              />
            </Card>
          )}
          {/* User Phone */}
          {user?.data?.phone && (
            <Card className="p-2 text-gray-900 border-gray-400 shadow w-full justify-between items-center flex">
              <div className="flex flex-col items-start justify-start gap-2">
                <CardTitle className="text-base font-bold">Phone:</CardTitle>
                <span className="text-gray-700 font-semibold">
                  {user?.data?.phone}
                </span>
              </div>
              <EditBox
                name={"Phone"}
                value={user?.data?.phone}
                onChange={(e) => setValue({ ...value, phone: e.target.value })}
                updateInfo={updateinfo}
              />
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
                  <CardTitle className="text-base font-bold">domain:</CardTitle>
                  <span className="text-gray-700 font-semibold">
                    <a
                      target="_blank"
                      href={domain?.name}
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      name : {domain?.name}
                    </a>
                    <p>price : ₹ {domain?.price}</p>
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <EditBox
                    name={"Domain"}
                    value={domain?.name}
                    onChange={(e) =>
                      setValue({ ...value, domain: e.target.value })
                    }
                    updateInfo={updateinfo}
                  />
                  <EditBox
                    name={"Domain Price"}
                    value={domain?.price}
                    onChange={(e) =>
                      setValue({ ...value, domainPrice: e.target.value })
                    }
                    updateInfo={updateinfo}
                  />
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
                  <span className="space-y-1 text-gray-700 font-semibold">
                    Join Date: {formatDate(new Date(host?.purchasedAt))}
                    <br />
                    Renew Date: {formatRenewalDate(new Date(host?.purchasedAt))}
                    <p>price : ₹ {host?.price}</p>
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <EditBox
                    name={"Hosting Date"}
                    value={host?.purchasedAt}
                    onChange={(e) =>
                      setValue({ ...value, hostingDate: e.target.value })
                    }
                    updateInfo={updateinfo}
                  />
                  <EditBox
                    name={"Hosting Price"}
                    value={host?.price}
                    onChange={(e) =>
                      setValue({ ...value, hostingPrice: e.target.value })
                    }
                    updateInfo={updateinfo}
                  />
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
                    <span className="text-gray-700 font-semibold">
                      <a
                        target="_blank"
                        href={cpanel?.cpanelId}
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        {cpanel?.cpanelId}
                      </a>
                    </span>
                  </div>
                  <EditBox
                    name={"Cpanel"}
                    value={cpanel?.cpanelId}
                    onChange={(e) =>
                      setValue({ ...value, cpanel: e.target.value })
                    }
                    updateInfo={updateinfo}
                  />
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
                    <span className="text-gray-700 font-semibold">
                      <a
                        target="_blank"
                        href={dash?.loginUrl}
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        URL: {dash?.loginUrl}
                      </a>
                    </span>
                    <EditBox
                      name={"URL"}
                      value={dash?.loginUrl}
                      onChange={(e) =>
                        setValue({ ...value, dashboardUrl: e.target.value })
                      }
                      updateInfo={updateinfo}
                    />
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">
                      <span>ID: {dash?.dashboardId}</span>
                    </span>
                    <EditBox
                      name={"ID"}
                      value={dash?.dashboardId}
                      onChange={(e) =>
                        setValue({ ...value, dashboardId: e.target.value })
                      }
                      updateInfo={updateinfo}
                    />
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">
                      <span>
                        Password: {showPassword ? dash?.password : "••••••••"}
                      </span>
                    </span>

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
                      <EditBox
                        name={"Password"}
                        value={dash?.password}
                        onChange={(e) =>
                          setValue({
                            ...value,
                            dashboardPassword: e.target.value,
                          })
                        }
                        updateInfo={updateinfo}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
};

export default User;
