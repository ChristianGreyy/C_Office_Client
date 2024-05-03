import { RootState } from "@/redux";
import { useParams, useSearchParams } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Peer from "simple-peer";

export type MainVideoAreaProps = {
  onToggleCamera: any;
  onToggleMicrophone: any;
  onShareScreen: any;
  isCameraOn: boolean;
  isMicrophoneOn: boolean;
  isSharingScreen: boolean;
  socket: any;
  setFullName: any
};

const MainVideoArea = ({
  onToggleCamera,
  onToggleMicrophone,
  onShareScreen,
  isMicrophoneOn,
  isCameraOn,
  isSharingScreen,
  socket,
  setFullName,
}: MainVideoAreaProps) => {
  const query = useSearchParams();
  const isHost = query.get("host") === "true";
  const params = useParams();
  const { id: meetingName } = params;
  const { accountInfo } = useSelector((state: RootState) => state.auth);
  const [stream, setStream] = useState(null);
  const [peer, setPeer] = useState(null);
  const [screenStream, setScreenStream] = useState(null);
  const videoRef = useRef();
  const remoteVideoRef = useRef();
  const screenVideoRef = useRef();
  const [remoteUser, setRemoteUser] = useState();
  const [remoteSignal, setRemoteSignal] = useState();
  const [joinMeetingAccepted, setJoinMeetingAccepted] = useState(false);
  const [isJoinScreen, setIsJoinScreen] = useState(isHost);
  const [receivingJoinMeeting, setReceivingJoinMeeting] = useState(false);
  // const [is, setReceivingJoinMeeting] = useState(false);

  const getCurrentStream = (video: boolean, audio: boolean) => {
    if (!video && !audio) {
      if (videoRef?.current) {
        videoRef.current.srcObject = null;
      }
      return null;
    }
    navigator.mediaDevices
      .getUserMedia({ video, audio })
      .then((currentStream) => {
        setStream(currentStream);
        if (videoRef?.current) {
          videoRef.current.srcObject = currentStream;
          videoRef.current.play();
          return currentStream;
        }
      })
      .catch((err) => console.error(err));
  };

  const joinMeeting = (id: any) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data: any) => {
      console.log("remote signal", data);
      socket.emit("joinMeeting", {
        meetingName,
        signalData: data,
        from: accountInfo?.id,
        fullName: `${accountInfo?.firstName} ${accountInfo?.lastName}`
        // name: name
      });
    });
    peer.on("stream", (stream: any) => {
      console.log("on stream host client");
      remoteVideoRef.current.srcObject = stream;
      remoteVideoRef.current.play();
    });
    socket.on("acceptMeeting", (signal: any) => {
      const currentStream = getCurrentStream(isCameraOn, isMicrophoneOn);
      setJoinMeetingAccepted(true);
      setIsJoinScreen(true);
      peer.signal(signal);
    });
    socket.on("updateCamera", (isCameraOn: boolean) => {
      if (remoteVideoRef?.current) {
        const mediaStream = remoteVideoRef.current.srcObject;
        const tracks = mediaStream.getTracks();
        tracks[1].enabled = isCameraOn;
      }
    });
    socket.on("updateAudio", (isMicrophoneOn: boolean) => {
      if (remoteVideoRef?.current) {
        const mediaStream = remoteVideoRef.current.srcObject;
        const tracks = mediaStream.getTracks();
        tracks[0].enabled = isMicrophoneOn;
      }
    });

    socket.on("shareScreen", (screenStream: any) => {
      if (stream) {
        alert('sharing')
        screenVideoRef.current.srcObject = screenStream;
        screenVideoRef.current.play();

        const screenTrack = screenStream.getTracks()[0];

        peer.replaceTrack(stream.getVideoTracks()[0], screenTrack, stream);
        onShareScreen(true);
      
      }
    });

    // connectionRef.current = peer
  };

  console.log('isSharingScreen', isSharingScreen)

  const acceptJoinMeeting = () => {
    setJoinMeetingAccepted(true);
    setIsJoinScreen(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      console.log("current signal", data);
      socket.emit("acceptMeeting", {
        signal: data,
        to: remoteUser,
        meetingName,
      });
    });
    peer.on("stream", (stream) => {
      console.log("on stream host");
      remoteVideoRef.current.srcObject = stream;
      remoteVideoRef.current.play();
    });
    peer.signal(remoteSignal);

    socket.on("updateCamera", (isCameraOn: boolean) => {
      if (remoteVideoRef?.current) {
        const mediaStream = remoteVideoRef.current.srcObject;
        const tracks = mediaStream.getTracks();
        tracks[1].enabled = isCameraOn;
      }
    });

    socket.on("updateAudio", (isMicrophoneOn: boolean) => {
      if (remoteVideoRef?.current) {
        const mediaStream = remoteVideoRef.current.srcObject;
        const tracks = mediaStream.getTracks();
        tracks[0].enabled = isMicrophoneOn;
      }
    });
    // connectionRef.current = peer
  };

  // starting
  useEffect(() => {
    const currentStream = getCurrentStream(isCameraOn, isMicrophoneOn);
    socket.emit("signal", {
      meetingName,
      myId: accountInfo?.id
    });
    socket.on("joinMeeting", (data) => {
      setReceivingJoinMeeting(true);
      setRemoteUser(data.from);
      setRemoteSignal(data.signal);
      setFullName(data.fullName);
    });
  }, [videoRef.current]);

  useEffect(() => {
    getCurrentStream(isCameraOn, isMicrophoneOn);
    if (remoteSignal) {
      socket.emit("updateCamera", {
        from: accountInfo?.id,
        meetingName,
        isCameraOn
      });
      socket.emit("updateAudio", {
        from: accountInfo?.id,
        meetingName,
        isMicrophoneOn
      });
    }
  }, [isCameraOn, isMicrophoneOn, isSharingScreen]);

  useEffect(() => {
    if (isSharingScreen) {
      shareScreen();
    }
  }, [isSharingScreen]);

  useEffect(() => {
    if(screenStream) {
      socket.emit("shareScreen", {
        screenStream,
        meetingName,
      });
    }
  }, [screenStream]);

  const shareScreen = () => {
    if (isSharingScreen) {
      navigator.mediaDevices
        .getDisplayMedia({ cursor: true })
        .then((screenStream) => {
          setScreenStream(screenStream);
          screenVideoRef.current.srcObject = screenStream;
          screenVideoRef.current.play();

          const screenTrack = screenStream.getTracks()[0];

          peer.replaceTrack(stream.getVideoTracks()[0], screenTrack, stream);

          screenTrack.onended = () => {
            peer.replaceTrack(screenTrack, stream.getVideoTracks()[0], stream);
            onShareScreen(false);
          };

          onShareScreen(true);
         
        })
        .catch((err) => console.error("Failed to share screen: ", err));
    } else {
      peer.replaceTrack(
        screenStream.getVideoTracks()[0],
        stream.getVideoTracks()[0],
        stream
      );
      alert('hehe')
      onShareScreen(false);
      screenVideoRef.current.srcObject = null;
    }
  };


  return (
    <>
      {isJoinScreen ? (
        <div className="flex-1 bg-gray-200 flex items-center justify-center relative">
          {isSharingScreen && (
            <video
              ref={screenVideoRef}
              className="absolute top-0 left-0 w-full h-full bg-black"
            />
          )}
          <video
            ref={videoRef}
            className={`${isSharingScreen ? "w-1/4 h-1/4 absolute bottom-0 left-[-25%]" : "w-2/4 h-3/4"} bg-black border-2 border-gray-500`}
          />
          {joinMeetingAccepted ? (
            <video
              ref={remoteVideoRef}
              className={`${isSharingScreen ? "w-1/4 h-1/4 absolute bottom-[25%] left-[-25%]" : "w-2/4 h-3/4"} bg-black border-2 border-gray-500`}
            />
          ) : null}
          {isHost && receivingJoinMeeting && (
            // <div
            //   onClick={acceptJoinMeeting}
            // >Some one want to join room</div>
            <div
              style={{
                transform: "translate(-50%, -180%)",
              }}
              className="absolute t-[50%] l-[50%] p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5"
            >
              <button
                type="button"
                className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="deleteModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <h2 className="font-semibold">Some one want to join</h2>
              <p className="mb-4 text-gray-500 dark:text-gray-300">
                Do you want some one to join?
              </p>
              <div className="flex justify-center items-center space-x-4">
                <button
                  data-modal-toggle="deleteModal"
                  type="button"
                  className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={() => setReceivingJoinMeeting(!receivingJoinMeeting)}
                >
                  No, cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                  onClick={() => {
                    acceptJoinMeeting();
                    setReceivingJoinMeeting(false);
                  }}
                >
                  Yes, I'm sure
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center w-[100%] h-[100%]">
          <button
            className="bg-[#888] text-center p-4"
            onClick={() => joinMeeting(meetingName || "")}
          >
            Click to join this meeting
          </button>
        </div>
      )}
    </>
  );
};

export default MainVideoArea;
