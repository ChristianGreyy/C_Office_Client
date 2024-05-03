import { useState, useEffect, useRef } from "react";

export type HeaderProps = {
    onToggleCamera: any;
    onToggleMicrophone: any;
    onShareScreen: any;   
    isCameraOn: boolean;
    isMicrophoneOn: boolean;
    isSharingScreen: boolean;
    meetingName: string;
}

const HeaderMeeting = ({ meetingName, onToggleCamera, onToggleMicrophone, onShareScreen, isMicrophoneOn, isCameraOn, isSharingScreen }: HeaderProps) => {
  const handleToggleCamera = () => {
    onToggleCamera();
  };

  const handleToggleMicrophone = () => {
    onToggleMicrophone();
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="text-lg font-bold">{meetingName}</div>
      <div className="flex space-x-4">
        <button
          className={`bg-gray-700 p-2 rounded ${isCameraOn ? "" : "bg-red-500"}`}
          onClick={handleToggleCamera}
        >
          {isCameraOn ? "📷" : "📷 (off)"}
        </button>
        <button
          className={`bg-gray-700 p-2 rounded ${isMicrophoneOn ? "" : "bg-red-500"}`}
          onClick={handleToggleMicrophone}
        >
          {isMicrophoneOn ? "🎤" : "🎤 (off)"}
        </button>
        <button className="bg-gray-700 p-2 rounded" onClick={() => onShareScreen(true)}>
          🖥 Share Screen
        </button>
      </div>
    </header>
  );
};

export default HeaderMeeting;
