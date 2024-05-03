"use client";

import React, { Fragment, useEffect, useState } from "react";
import { NotificationOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import {
  RootState,
  getAllNotificationsAction,
  getAllNotificationsActionNumberAction,
  useAppDispatch,
} from "@/redux";
import { notification } from "antd";
import moment from "moment";

type NotificationProps = {
  //   name: string;
  //   onClick: (name: string) => void;
  //   isSelected: boolean;
};

const Notification = ({}: NotificationProps) => {
  const [notiMenu, setNotiMenu] = useState(false);
  const { notifications, notificationsNumber } = useSelector(
    (state: RootState) => state.notifications
  );
  const dispatch = useAppDispatch();

  const getAllNotifications = () => {
    dispatch(getAllNotificationsAction());
    dispatch(getAllNotificationsActionNumberAction());
  };

  useEffect(() => {
    getAllNotifications();
  }, [dispatch]);

  return (
    <Fragment>
      <div className="notifications">
        <button
          onClick={() => setNotiMenu(!notiMenu)}
          className="relative z-10 block rounded-md focus:outline-none text-xl hover:bg-[#0692d4] p-2 text-white"
        >
          <NotificationOutlined />
        </button>
        {notiMenu && (
          <div
            x-show="dropdownOpen"
            className="absolute right-0 mt-2 bg-white rounded-md shadow-lg overflow-y-scroll h-[400px] w-full z-20 cursor-pointer"
            style={{ width: "22rem" }}
          >
            <div className="py-2">
              {notifications &&
                notifications.map((item) => (
                  <a className="flex items-center px-4 py-3 hover:bg-gray-100 -mx-2">
                    <img
                      className="h-8 w-8 rounded-full object-cover mx-1"
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80"
                      alt="avatar"
                    />
                    <p className="text-gray-600 text-sm mx-2">
                      <span className="font-bold">{item.title}</span>
                      <div>{item.body}</div>
                      <div className="text-[#0051cc]">
                        {moment(item.createdAt).startOf("day").fromNow()}
                      </div>
                    </p>
                  </a>
                ))}
            </div>
            <a className="block bg-sky-600 text-white text-center font-bold py-2">
              Mark as read all notifications
            </a>
          </div>
        )}
      </div>
      {notificationsNumber && notificationsNumber > 0 && (
        <div
          className="w-3 h-3 rounded-full bg-red-500 absolute top-[4px] right-[-4px]"
          style={{
            zIndex: 1000,
          }}
        ></div>
      )}
    </Fragment>
  );
};

export default Notification;
