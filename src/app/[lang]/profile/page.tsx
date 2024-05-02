"use client";

// This is a client component 👈🏽
import "react-clock/dist/Clock.css";

import { Input } from "@/common";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ShareSelectInput } from "@/components/shared/select/SelectInput";
import { BaseResponseError, IUserDetail, TUpdateUserData } from "@/interfaces";
import {
  RootState,
  getAllLevelsAction,
  getAllPositionsAction,
  getAllUniversitiesAction,
  useAppDispatch,
} from "@/redux";
import { EditOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, message } from "antd";
import { t } from "i18next";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";
import { updateProfileAction } from "@/redux/actions/user-management";
import { mediaManagementAPI } from "@/api";

export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(30, {
      message: t("error.max_length", {
        length: 30,
      }) as string,
    })
    .nonempty({
      message: t("error.required"),
    })
    .transform((e) => (e === "" ? undefined : e)),
  lastName: z
    .string()
    .trim()
    .max(30, {
      message: t("error.max_length", {
        length: 30,
      }) as string,
    })
    .nonempty({
      message: t("error.required"),
    })
    .transform((e) => (e === "" ? undefined : e)),
  phone: z
    .string()
    .trim()
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, {
      message: t("error:phone_format_error") as string,
    })
    .max(13, {
      message: t("error:max_length", {
        length: 13,
      }) as string,
    })
    .nonempty({
      message: t("error:required") as string,
    })
    .transform((e) => (e === "" ? undefined : e)),
  positionId: z
    .number()
    .optional()
    .transform((e) => (e == null ? undefined : e)),
  universityId: z
    .number()
    .optional()
    .transform((e) => (e == null ? undefined : e)),
  levelId: z
    .number()
    .optional()
    .transform((e) => (e == null ? undefined : e)),
  avatarId: z
    .number()
    .optional()
    .transform((e) => (e == null ? undefined : e)),
});

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const { universities } = useSelector(
    (state: RootState) => state.universities
  );
  const { levels } = useSelector((state: RootState) => state.levels);
  const { positions } = useSelector((state: RootState) => state.positions);
  const { members } = useSelector((state: RootState) => state.projects);
  const { accountInfo } = useSelector((state: RootState) => state.auth);
  const [globalErrors, setGlobalErrors] = useState([]);
  console.log('accountInfo', accountInfo)
  const [source, setSource] = useState(accountInfo?.avatar?.url);
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    setError,
    reset,
    formState: { errors },
  } = useForm<TUpdateUserData>({
    defaultValues: {
      firstName: accountInfo?.firstName || "",
      lastName: accountInfo?.lastName || "",
      phone: accountInfo?.phone || "",
      gender: accountInfo?.gender || "",
      positionId: accountInfo?.positionId || undefined,
      universityId: accountInfo?.universityId || undefined,
      levelId: accountInfo?.levelId || undefined,
      avatarId: accountInfo?.avatarId || undefined,
    },
    resolver: zodResolver(updateProfileSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const dispatch = useAppDispatch();

  const getAllOptions = () => {
    dispatch(getAllUniversitiesAction());
    dispatch(getAllLevelsAction());
    dispatch(getAllPositionsAction());
  };

  useEffect(() => {
    getAllOptions();
  }, [dispatch]);

  const universitiesOptions = universities?.map((universityItem) => {
    return {
      label: universityItem?.name,
      value: universityItem?.id,
    };
  });

  const positionsOptions = positions?.map((positionItem) => {
    return {
      label: positionItem?.name,
      value: positionItem?.id,
    };
  });

  const levelsOptions = levels?.map((levelItem) => {
    return {
      label: levelItem?.name,
      value: levelItem?.id,
    };
  });

  const genderOptions = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
  ];

  const onUpdateProfile = async (data: IUserDetail) => {
    const { ...passData } = data;
    const payload: any = {
      ...passData,
    };
    console.log(getValues());
    console.log(getValues("avatarId"));
    console.log(payload);
    try {
      const response = await dispatch(updateProfileAction(payload)).unwrap();
      message.success({
        content: "Update profile successfully",
      });
    } catch (err) {
      const error = err as BaseResponseError;
      if (error) {
        message.error({
          content: error?.message,
        });
      }
    } finally {
    }
  };

  const onErrorValidate = (error: any) => {
    // setGlobalErrors
    console.log("error", error);
  };

  const allowFileTypes = ["image/png", "image/jpeg", "image/jpg"];
  const limitFileSize = 1024;

  const handleChangeMedia = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    if (!e.target.files || e.target.files.length === 0) {
      setLoading(false);
      return;
    }

    const file = e.target.files[0];
    const isMatchMediaType = allowFileTypes.includes(file.type);

    const allowedInputType = allowFileTypes
      ?.map((item, index) => item.split("/")[1])
      ?.join("/")
      ?.toUpperCase();

    if (!isMatchMediaType) {
      message.error(`You can only upload ${allowedInputType}file!`);
      setLoading(false);
      return;
    }

    const isMatchMediaSize = Number(file.size) / 1024 / 1024 < limitFileSize;
    if (!isMatchMediaSize) {
      message.error(`Media file must smaller than ${limitFileSize}MB!`);
      setLoading(false);
      return;
    }

    try {
      const response = await mediaManagementAPI.uploadImage(file);
      console.log("response", response);
      if (response.statusCode === 200) {
        setSource(response.data.url);
        setValue("avatarId", response.data.id);
        message.success(response?.message ?? "Upload image successfully!");
      }
    } catch (error: any) {
      console.log(error);
      message.error(error?.message ?? "Upload file failed!");
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-[rgb(242, 244, 247)]">
      {/* 
{loading ? (
              <LoadingOutlined size={32} color={'blue'} spin />
            )} */}
      <Navbar />
      <form
        onSubmit={handleSubmit(onUpdateProfile, onErrorValidate)}
        className="container mx-auto p-10 mt-20 flex"
      >
        <div className="flex basis-1/5 flex-col items-center p-8">
          <div className="avatar relative">
            <img
              className="rounded-full h-[230px] w-[230px] flex items-center justify-center"
              src={source || accountInfo?.avatar?.url}
            />
            <div className="edit-container absolute bottom-0">
              <label
                htmlFor="avatar-file"
                className="edit-label bg-white p-2 w-[90px] flex justify-center item-center rounded-xl shadow-xl cursor-pointer"
              >
                <div className="icon">
                  <EditOutlined />
                </div>
                <div className="avatar-des ml-[4px]">Edit</div>
              </label>
              <Controller
                name={"avatarId"}
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <input
                      type="file"
                      name="file"
                      id="avatar-file"
                      className="hidden"
                      onChange={handleChangeMedia}
                    />
                  );
                }}
              />
            </div>
          </div>
        </div>
        <div className="basis-4/5 p-8 border-[1px] border-gray-400 border-solid">
          <h1 className="text-[1.43em] font-medium leading-[1.33] my-5">
            {t("profile.title")}
          </h1>
          <div className="!bg-[rgb(242, 244, 247)] min-h-[600px]">
            <div>
              <Controller
                name={"firstName"}
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <Input
                      placeholder={t("profile.firstName")}
                      required
                      label={t("profile.firstName")}
                      onChange={onChange}
                      value={value}
                      containerClassName="!mb-5"
                      errors={error?.message}
                    />
                  );
                }}
              />
              <Controller
                name={"lastName"}
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <Input
                      placeholder={t("profile.lastName")}
                      required
                      label={t("profile.lastName")}
                      onChange={onChange}
                      value={value}
                      containerClassName="!mb-5"
                      errors={error?.message}
                    />
                  );
                }}
              />
              <Controller
                name={"phone"}
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <Input
                      placeholder={t("profile.phone")}
                      required
                      label={t("profile.phone")}
                      onChange={onChange}
                      value={value}
                      containerClassName="!mb-5"
                      errors={error?.message}
                    />
                  );
                }}
              />
              <Controller
                name={"gender"}
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <ShareSelectInput
                      value={value}
                      data={genderOptions as any}
                      label={t("profile.gender")}
                      onChange={(data) => {
                        onChange(data);
                      }}
                    />
                  );
                }}
              />
              <Controller
                name={"positionId"}
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <ShareSelectInput
                      value={value}
                      data={positionsOptions as any}
                      label={t("profile.position")}
                      onChange={(data) => {
                        onChange(data);
                      }}
                    />
                  );
                }}
              />
              <Controller
                name={"universityId"}
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <ShareSelectInput
                      value={value}
                      data={universitiesOptions as any}
                      label={t("profile.university")}
                      onChange={(data) => {
                        onChange(data);
                      }}
                    />
                  );
                }}
              />
              <Controller
                name={"levelId"}
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <ShareSelectInput
                      value={value}
                      data={levelsOptions as any}
                      label={t("profile.level")}
                      onChange={(data) => {
                        onChange(data);
                      }}
                    />
                  );
                }}
              />
            </div>
            <div className="flex mt-10 pb-10 items-center gap-[40px] justify-start">
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                // className="submit__btn login-btn"
                className="w-[120px] text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-primary-800"
                // loading={isLoading}
              >
                {t("profile.update_profile")}
              </Button>
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </main>
  );
}
