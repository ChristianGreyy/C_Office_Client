"use client";

import { RootState } from "@/redux";
import { initSocketConnection } from "@/socket/socket";
import React, { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSelector } from "react-redux";
import Peer from "simple-peer";
import io from "socket.io-client";

// const socket = io("http://localhost:8080/socket");

function App() {
	const { accessToken } = useSelector((state: RootState) => state.auth);
	
	const socket = useRef<any>(
		initSocketConnection("socket", accessToken) as any
	  ).current;
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
		setStream(stream);
		myVideo.current.srcObject = stream;
      });

    socket.on("joinMeeting", (data) => {
      setReceivingCall(true);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      console.log("remote signal", data);
      socket.emit("joinMeeting", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      console.log("call ", stream);
      userVideo.current.srcObject = stream;
    });
    socket.on("acceptMeeting", (signal) => {
      console.log("current signal", signal);
      setCallAccepted(true);
      peer.signal(signal);
    });

    // connectionRef.current = peer
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      console.log("current signal", data);
      socket.emit("acceptMeeting", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      console.log("answer ", stream);
      userVideo.current.srcObject = stream;
    });
    console.log("remote signal", callerSignal);

    peer.signal(callerSignal);
    // connectionRef.current = peer
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <>
      <h1 style={{ marginTop: '200px', textAlign: "center", color: "#fff" }}>Zoomish</h1>
      <div className="container">
        <div className="video-container">
          <div className="video">
            {/* {stream && ( */}
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                style={{ width: "300px" }}
              />
            {/* )} */}
          </div>
          <div className="video">
            {callAccepted && !callEnded ? (
              <video
                playsInline
                ref={userVideo}
                autoPlay
                style={{ width: "300px" }}
              />
            ) : null}
          </div>
        </div>
        <div className="myId">
          <div>
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginBottom: "20px" }}
            />
          </div>
          <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
            <button variant="contained" color="primary">
              Copy ID
            </button>
          </CopyToClipboard>

          <div>
            <label>ID to call</label>
            <input
              variant="filled"
              value={idToCall}
              onChange={(e) => setIdToCall(e.target.value)}
            />
          </div>
          <div className="call-button">
            {callAccepted && !callEnded ? (
              <button variant="contained" color="secondary" onClick={leaveCall}>
                End Call
              </button>
            ) : (
              <button onClick={() => callUser(idToCall)}>DIEN THOAI NE</button>
            )}
            {idToCall}
          </div>
        </div>
        <div>
          {receivingCall && !callAccepted ? (
            <div className="caller">
              <h1>{name} is calling...</h1>
              <button variant="contained" color="primary" onClick={answerCall}>
                Answer
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
