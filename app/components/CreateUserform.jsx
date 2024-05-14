"use client";
import { CreateUser } from "@/helper/CreateUserSlice";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";

const CreateUserform = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    control,
  } = useForm();

  const watchedFields = useWatch({
    control,
    name: ["domains", "hosting", "dashboard", "cpanel"],
  });
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    if (data.domains) {
      data.domains = data.domains.filter(
        (domain) => domain.price.trim() !== ""
      );
      data.domains.forEach((domain) => {
        domain.price = parseInt(domain.price, 10);
      });
    }
    if (data.hosting) {
      data.hosting = data.hosting.filter(
        (hosting) => hosting.price.trim() !== ""
      );
      data.hosting.forEach((hosting) => {
        hosting.price = parseInt(hosting.price, 10);
      });
    }
    if (data.cpanel) {
      data.cpanel = data.cpanel.filter(
        (cpanel) => cpanel.cpanelId.trim() !== ""
      );
    }
    dispatch(CreateUser(data));
    reset();
  };
  const purchasedAt = useWatch({
    control,
    name: "hosting.0.purchasedAt",
  });

  useEffect(() => {
    if (purchasedAt) {
      const purchasedDate = new Date(purchasedAt);
      const renewAtDate = new Date(
        purchasedDate.setFullYear(purchasedDate.getFullYear() + 1)
      );
      setValue("hosting.0.renewAt", renewAtDate.toISOString().split("T")[0]);
    }
  }, [purchasedAt, setValue]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="block font-bold mb-2">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="Phone"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^\d{10}$/,
              message: "Invalid phone number",
            },
          })}
        />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="domains" className="block font-bold mb-2">
          Domains
        </label>
        <div>
          <input
            type="text"
            id="domains.0.name"
            className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
            placeholder="Domain Name"
            {...register("domains.0.name", {
              required: watchedFields?.domains?.some((field) => !!field),
            })}
          />
          {errors.domains?.[0]?.name && (
            <p className="text-red-500">{errors.domains[0].name.message}</p>
          )}
          <input
            type="date"
            id="domains.0.purchasedAt"
            className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
            placeholder="Purchased At"
            {...register("domains.0.purchasedAt", {
              required: watchedFields?.domains?.some((field) => !!field),
            })}
          />
          {errors.domains?.[0]?.purchasedAt && (
            <p className="text-red-500">
              {errors.domains[0].purchasedAt.message}
            </p>
          )}
          <input
            type="number"
            id="domains.0.price"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Price"
            {...register("domains.0.price", {
              required: watchedFields?.domains?.some((field) => !!field),
            })}
          />
          {errors.domains?.[0]?.price && (
            <p className="text-red-500">{errors.domains[0].price.message}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="hosting" className="block font-bold mb-2">
          Hosting
        </label>
        <div>
          <label htmlFor="createdAt" className="block font-bold mb-2">
            Join Date
          </label>
          <input
            type="date"
            id="hosting.0.createdAt"
            className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
            placeholder="Join Date"
            {...register("hosting.0.createdAt", {
              required: watchedFields?.hosting?.some((field) => !!field),
            })}
          />
          {errors.hosting?.[0]?.createdAt && (
            <p className="text-red-500">
              {errors.hosting[0].createdAt.message}
            </p>
          )}
          <label htmlFor="purchasedAt" className="block font-bold mb-2">
            Purchase Date
          </label>
          <input
            type="date"
            id="hosting.0.purchasedAt"
            className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
            placeholder="Purchased At"
            {...register("hosting.0.purchasedAt", {
              required: watchedFields?.hosting?.some((field) => !!field),
            })}
          />
          {errors.hosting?.[0]?.purchasedAt && (
            <p className="text-red-500">
              {errors.hosting[0].purchasedAt.message}
            </p>
          )}
          <label htmlFor="purchasedAt" className="block font-bold mb-2">
            Renewal Date
          </label>
          <input
            type="date"
            id="hosting.0.renewAt"
            className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
            placeholder="Renew At"
            {...register("hosting.0.renewAt", {
              required: watchedFields?.hosting?.some((field) => !!field),
            })}
          />
          {errors.hosting?.[0]?.renewAt && (
            <p className="text-red-500">{errors.hosting[0].renewAt.message}</p>
          )}
          <input
            type="number"
            id="hosting.0.price"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Price"
            {...register("hosting.0.price", {
              required: watchedFields?.hosting?.some((field) => !!field),
            })}
          />
          {errors.hosting?.[0]?.price && (
            <p className="text-red-500">{errors.hosting[0].price.message}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="dashboard" className="block font-bold mb-2">
          Dashboard
        </label>
        <div>
          <input
            type="text"
            id="dashboard.0.loginUrl"
            className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
            placeholder="Login URL"
            {...register("dashboard.0.loginUrl", {
              required: watchedFields?.dashboard?.some((field) => !!field),
            })}
          />
          {errors.dashboard?.[0]?.loginUrl && (
            <p className="text-red-500">
              {errors.dashboard[0].loginUrl.message}
            </p>
          )}
          <input
            type="text"
            id="dashboard.0.dashboardId"
            className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
            placeholder="Dashboard ID"
            {...register("dashboard.0.dashboardId", {
              required: watchedFields?.dashboard?.some((field) => !!field),
            })}
          />
          {errors.dashboard?.[0]?.dashboardId && (
            <p className="text-red-500">
              {errors.dashboard[0].dashboardId.message}
            </p>
          )}
          <input
            type="password"
            id="dashboard.0.password"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Dashboard Password"
            {...register("dashboard.0.password", {
              required: watchedFields?.dashboard?.some((field) => !!field),
            })}
          />
          {errors.dashboard?.[0]?.password && (
            <p className="text-red-500">
              {errors.dashboard[0].password.message}
            </p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="cpanel" className="block font-bold mb-2">
          cPanel
        </label>
        <div>
          <input
            type="text"
            id="cpanel.0.cpanelId"
            className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
            placeholder="cPanel ID"
            {...register("cpanel.0.cpanelId", {
              required: watchedFields?.cpanel?.some((field) => !!field),
            })}
          />
          {errors.cpanel?.[0]?.cpanelId && (
            <p className="text-red-500">{errors.cpanel[0].cpanelId.message}</p>
          )}
        </div>
      </div>
      <button type="submit" className="p-[3px] relative  w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
        <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
          Create User
        </div>
      </button>
    </form>
  );
};

export default CreateUserform;
