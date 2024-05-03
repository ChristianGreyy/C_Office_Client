"use client";

import { WebRTCAdaptor } from "@antmedia/webrtc_adaptor";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

export const PlayingComponent = () => {
  const [playing, setPlaying] = useState(false);
  const [websocketConnected, setWebsocketConnected] = useState(false);
  const [streamId, setStreamId] = useState("stream123");
  const webRTCAdaptor = useRef<any>(null);
  var playingStream = useRef<any>(null);

  const handlePlay = () => {
    setPlaying(true);
    playingStream.current = streamId;
    webRTCAdaptor.current.play(streamId);
  };

  const handleStopPlaying = () => {
    setPlaying(false);
    webRTCAdaptor.current.stop(playingStream.current);
  };

  const handleStreamIdChange = (event: any) => {
    setStreamId(event.target.value);
  };

  useEffect(() => {
    if (webRTCAdaptor.current === undefined || webRTCAdaptor.current === null) {
      webRTCAdaptor.current = new WebRTCAdaptor({
        websocket_url: "wss://test.antmedia.io:/WebRTCAppEE/websocket",
        mediaConstraints: {
          video: true,
          audio: true,
        },
        peerconnection_config: {
          iceServers: [{ urls: "stun:stun1.l.google.com:19302" }],
        },
        sdp_constraints: {
          OfferToReceiveAudio: true,
          OfferToReceiveVideo: true, // Set to true to receive video
        },
        remoteVideoId: "remoteVideo",
        callback: (info: any, obj: any) => {
          if (info === "initialized") {
            setWebsocketConnected(true);
          }
        },
        callbackError: function (error: any, message: any) {
          console.log(error, message);
          if (error === "no_stream_exist") {
            handleStopPlaying();
            setPlaying(false);
            alert(error);
          }
        },
      });
    }
  }, []);

  return (
    <Container className="text-center">
      <h1>Play Page</h1>

      <Row className="mb-4">
        <Col>
          <video
            id="remoteVideo"
            controls
            autoPlay
            muted
            playsInline
            style={{
              width: "40vw",
              height: "60vh",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          ></video>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Row>
          <div className="mb-3">
            <input
              className="form-control form-control-lg"
              type="text"
              defaultValue={streamId}
              onChange={handleStreamIdChange}
            />
            <label className="form-label" htmlFor="streamId">
              Enter Stream Id
            </label>
          </div>
        </Row>
        <Col>
          {!playing ? (
            <Button
              variant="primary"
              disabled={!websocketConnected}
              onClick={handlePlay}
            >
              Start Playing
            </Button>
          ) : (
            <Button variant="danger" onClick={handleStopPlaying}>
              Stop Playing
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};
