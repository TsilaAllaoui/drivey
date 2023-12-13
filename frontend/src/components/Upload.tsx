import { lighten } from "polished";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { api } from "../api";
import { socket } from "../socket";
import ProgressBar from "./ProgressBar";

type WgetInfo = {
  file: string;
  size: string;
  progress: string;
  speed: string;
  eta: string;
};

const StyledForm = styled.form`
  background-color: ${({ theme }) => theme.secondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 4rem;

  .Toastify__close-button {
    width: 20px;
    height: 20px;
    background-color: transparent;
  }

  label {
    color: white;
    font-size: 1rem;
  }

  input {
    height: 25px;
    width: 500px;
    max-width: 500px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;

    &:focus {
      outline: none;
    }
  }

  button {
    cursor: pointer;
    height: 30px;
    width: 100px;
    background-color: ${({ theme }) => theme.button.upload};
    border: none;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    transition: background-color 250ms;

    &:hover {
      background-color: ${({ theme }) => lighten(0.025, theme.button.upload)};
    }
  }

  .infos {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    p {
      display: flex;
      gap: 2rem;
      color: white;
      font-size: 0.75rem;
    }

    .progress {
      display: flex;
      align-items: center;
    }
  }
`;

function Upload() {
  const location = useLocation();
  const [wgetInfo, setWgetInfo] = useState<WgetInfo>({
    file: "",
    eta: "",
    progress: "",
    size: "",
    speed: "",
  });
  const [url, setUrl] = useState("");

  const urlInputRef = useRef<HTMLInputElement>(null);

  const uploadFromUrl = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api.post("/upload", {
      url,
      uid: location.pathname.slice(1),
    });
  };

  useEffect(() => {
    socket.on("percentage", (data) => {
      console.log(data);
      setWgetInfo(data);
    });
    socket.on("finished", (data) => {
      console.log(data);
      toast.success("Upload finished!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        setWgetInfo({
          file: "",
          progress: "",
          speed: "",
          size: "",
          eta: "",
        });
        urlInputRef.current!.value = "";
      }, 2500);
    });
  }, []);

  return (
    <StyledForm onSubmit={uploadFromUrl}>
      <label htmlFor="url">File URL</label>
      <input
        type="text"
        id="url"
        aria-describedby="url-help"
        ref={urlInputRef}
        onChange={(e) => setUrl(e.currentTarget.value)}
      />
      <button type="submit">Upload</button>
      {wgetInfo?.file != "" ? (
        <div className="infos">
          <p>
            <span>File Name:</span>
            <span>{wgetInfo?.file}</span>
          </p>
          <p>
            {" "}
            <span>File Size:</span>
            <span>{wgetInfo?.size}</span>
          </p>

          <p className="progress">
            <span>Progress:</span>
            <ProgressBar
              percentage={parseInt(wgetInfo.progress.replace("%", ""))}
            />
          </p>
          <p>
            <span>Speed:</span>
            <span>{wgetInfo?.speed}</span>
          </p>
          <p
            onClick={() => {
              toast.success("Upload finished!", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
              });
            }}
          >
            <span>Eta:</span>
            <span>{wgetInfo?.eta}</span>
          </p>
        </div>
      ) : null}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
      />
    </StyledForm>
  );
}

export default Upload;
