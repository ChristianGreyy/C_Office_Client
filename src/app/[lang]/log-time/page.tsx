"use client";

// This is a client component 👈🏽
import moment from "moment";
import { useEffect, useState } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

import { Button } from "@/common";
import { TUpdateEmployeeAttendanceData } from "@/interfaces";
import {
  RootState,
  createEmployeeAttendanceAction,
  useAppDispatch,
} from "@/redux";
import {
  getAllEmployeeAttendancesAction,
  getCurrentEmployeeAttendanceByProfileAction,
} from "@/redux/actions/employee-attendance-management";
import { message } from "antd";
import { useSelector } from "react-redux";
import { useClientTranslation } from "@/i18n/client";

export default function LogTime() {
  const [value, setValue] = useState(new Date());
  const { t } = useClientTranslation("Common");

  const { employeeAttendances, employeeAttendance } = useSelector(
    (state: RootState) => state.employeeAttendances
  );

  const dispatch = useAppDispatch();

  const getAllEmployeeAttendances = () => {
    dispatch(getAllEmployeeAttendancesAction());
  };

  const getAllEmployeeAttendanceByProfile = () => {
    dispatch(getCurrentEmployeeAttendanceByProfileAction());
  };

  const solveUpdateEmployeeAttendance = async () => {
    const data: Partial<TUpdateEmployeeAttendanceData> = {
      dateTime: value,
    };
    // console.log(value)
    // return;
    // setIsAddingUser(true)
    try {
      const response = await dispatch(
        createEmployeeAttendanceAction(data)
      ).unwrap();

      message.success({
        content: "Checkin successfully",
      });

      getAllEmployeeAttendances();
      getAllEmployeeAttendanceByProfile();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      // setIsAddingUser(false)
    }
  };

  useEffect(() => {
    getAllEmployeeAttendances();
    getAllEmployeeAttendanceByProfile();
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="container mx-auto p-10 mt-20 flex gap-3 h-screen">
        <div className="flex basis-3/5 flex-col items-center p-8 bg-white">
          <div>
            <p>{t("log_time.current_time")}:</p>
          </div>
          <h1 className="mb-5 mt-5 text-5xl font-bold">
            {moment(value).format("LTS")}
          </h1>
          <Clock value={value} />
          <textarea
            className="mt-10 border-2 border-solid border-gray-400 p-2"
            name=""
            id=""
            cols="40"
            rows="5"
            placeholder={t("log_time.note")}
          ></textarea>
          <div className="log-time-button mt-10 flex justify-between">
            <div className="check-in-button">
              {(!employeeAttendance ||
                (employeeAttendance && !employeeAttendance.checkInTime)) && (
                <Button
                  onClick={() => solveUpdateEmployeeAttendance()}
                  className="bg-orange-600 mr-8 border-0 text-white !font-bold hover:bg-orange-700 py-2 px-4 rounded"
                >
                  Check in
                </Button>
              )}
              {employeeAttendance && employeeAttendance.checkInTime && (
                <button
                  className="bg-slate-200 bg-orange-600 mr-8 border-0 text-black !font-bold py-2 px-4 rounded"
                  disabled
                >
                  {moment(employeeAttendance.checkInTime).format("h:mm")}
                </button>
              )}
            </div>
            <div className="check-out-button">
              {(!employeeAttendance ||
                (employeeAttendance && !employeeAttendance.checkOutTime)) && (
                <Button
                  onClick={solveUpdateEmployeeAttendance}
                  className="bg-orange-600 border-0 text-white !font-bold hover:bg-orange-700 py-2 px-4 rounded"
                >
                  Check out
                </Button>
              )}
              {employeeAttendance && employeeAttendance.checkOutTime && (
                <button
                  className="bg-orange-600 mr-8 border-0 text-white !font-bold py-2 px-4 rounded"
                  onClick={solveUpdateEmployeeAttendance}
                  // disabled
                >
                  {moment(employeeAttendance.checkOutTime).format("h:mm")}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="basis-2/5 p-8 bg-white overflow-y-scroll">
          <table className="table-auto w-full">
            <thead className="uppercase">
              <tr className="leading-10 border-b">
                <th className="text-left w-max">{t("log_time.full_name")}</th>
                <th className="text-left">Check-in</th>
                <th className="text-left">Check-out</th>
              </tr>
            </thead>
            <tbody>
              {employeeAttendances &&
                employeeAttendances.map((item) => {
                  return (
                    <tr className="border-b leading-10">
                      <td>{`${item.user?.firstName} ${item.user?.lastName}`}</td>
                      <td>
                        {item.checkInTime
                          ? moment(item.checkInTime).format("h:mm a")
                          : ""}
                      </td>
                      <td>
                        {item.checkOutTime
                          ? moment(item.checkOutTime).format("h:mm a")
                          : ""}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
