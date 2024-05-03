"use client";

// This is a client component 👈🏽
import "react-clock/dist/Clock.css";

import { useRef, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { RootState } from "@/redux";
import { initSocketConnection } from "@/socket/socket";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import HeaderMeeting from "../components/HeaderMeeting";
import MainVideoArea from "../components/MainVideoArea";
import SidebarMeeting from "../components/SidebarMeeting";

export default function ProfilePage() {
  const params = useParams();
  const { id: meetingName } = params;

  const { accessToken } = useSelector((state: RootState) => state.auth);
  // console.log("accessToken", accessToken);

  const socket = useRef<any>(
    initSocketConnection("socket", accessToken) as any
  ).current;

  // const [me, setMe] = useState("");
  // const [stream, setStream] = useState();
  // const [receivingCall, setReceivingCall] = useState(false);
  // const [caller, setCaller] = useState("");
  // const [callerSignal, setCallerSignal] = useState();
  // const [callAccepted, setCallAccepted] = useState(false);
  // const [idToCall, setIdToCall] = useState("");
  // const [callEnded, setCallEnded] = useState(false);
  // const [name, setName] = useState("");
  // const myVideo = useRef<any>(null);
  // const userVideo = useRef<any>(null);
  // const connectionRef = useRef<any>(null);

  // const getLocalMediaStream = async () => {
  //   try {
  //     const mediaStream = await navigator.mediaDevices.getUserMedia({
  //       audio: true,
  //       video: true,
  //     });
  //     myVideo.current.srcObject = mediaStream;
  //     return mediaStream;
  //   } catch (error) {
  //     console.error("failed to get local media stream", error);
  //   }
  // };

  // useEffect(() => {
  //   socket.on("me", (id: any) => {
  //     setMe(id);
  //   });

  //   socket.on("callUser", (data: any) => {
  //     setReceivingCall(true);
  //     setCaller(data.from);
  //     setName(data.name);
  //     setCallerSignal(data.signal);
  //   });
  // }, [myVideo.current]);

  // const callUser = (id: any) => {
  //   const peer = new Peer({
  //     initiator: true,
  //     trickle: false,
  //     stream: stream,
  //   });
  //   peer.on("signal", (data: any) => {
  //     socket.emit("callUser", {
  //       userToCall: id,
  //       signalData: data,
  //       from: me,
  //       name: name,
  //     });
  //   });
  //   peer.on("stream", (stream: any) => {
  //     userVideo.current.srcObject = stream;
  //   });
  //   socket.on("callAccepted", (signal: any) => {
  //     setCallAccepted(true);
  //     peer.signal(signal);
  //   });

  //   connectionRef.current = peer;
  // };

  // const answerCall = () => {
  //   setCallAccepted(true);
  //   const peer = new Peer({
  //     initiator: false,
  //     trickle: false,
  //     stream: stream,
  //   });
  //   peer.on("signal", (data: any) => {
  //     socket.emit("answerCall", { signal: data, to: caller });
  //   });
  //   peer.on("stream", (stream: any) => {
  //     userVideo.current.srcObject = stream;
  //   });

  //   peer.signal(callerSignal);
  //   connectionRef.current = peer;
  // };

  // const leaveCall = () => {
  //   setCallEnded(true);
  //   connectionRef.current.destroy();
  // };

  // console.log('stream', stream)

  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [fullName, setFullName] = useState("");

  const mainVideoAreaRef = useRef();

  const handleToggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  const handleToggleMicrophone = () => {
    setIsMicrophoneOn(!isMicrophoneOn);
  };

  const handleShareScreen = (value) => {
    setIsSharingScreen(value);
    // mainVideoAreaRef.current.shareScreen();
  };

  return (
    <main className="flex min-h-screen flex-col bg-[rgb(242, 244, 247)]">
      <Navbar />
      <div className="h-screen flex flex-col container mx-auto p-10 mt-20 flex gap-3 h-screen">
        <HeaderMeeting
          onToggleCamera={handleToggleCamera}
          onToggleMicrophone={handleToggleMicrophone}
          onShareScreen={handleShareScreen}
          isCameraOn={isCameraOn}
          isMicrophoneOn={isMicrophoneOn}
          isSharingScreen={isSharingScreen}
          meetingName={decodeURIComponent(meetingName)}
        />
        <div className="flex flex-1">
          <SidebarMeeting fullName={fullName}/>
          <MainVideoArea
            isCameraOn={isCameraOn}
            isMicrophoneOn={isMicrophoneOn}
            isSharingScreen={isSharingScreen}
            onToggleCamera={handleToggleCamera}
            onToggleMicrophone={handleToggleMicrophone}
            onShareScreen={handleShareScreen}
            socket={socket}
            setFullName={setFullName}
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
