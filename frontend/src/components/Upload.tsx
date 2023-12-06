import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../api";
import { socket } from "../socket";

type WgetInfo = {
  file: string;
  size: string;
  progress: string;
  speed: string;
  eta: string;
};

function Upload() {
  const location = useLocation();
  const [wgetInfo, setWgetInfo] = useState<WgetInfo>();
  const [finished, setFinished] = useState(false);
  const [url, setUrl] = useState("");

  const urlInputRef = useRef<HTMLInputElement>(null);

  const uploadFromUrl = () => {
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
      setFinished(true);
      setTimeout(() => {
        setFinished(false);
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
    <FormControl
      style={{
        width: "50vw",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <InputLabel htmlFor="url">File URL</InputLabel>
      <Input
        id="url"
        aria-describedby="url-help"
        ref={urlInputRef}
        onChange={(e) => setUrl(e.currentTarget.value)}
      />
      <FormHelperText id="url-help">Remote file url to upload</FormHelperText>
      <Button variant="outlined" onClick={uploadFromUrl}>
        Upload
      </Button>
      <p>File Name: {wgetInfo?.file}</p>
      <p>File Size: {wgetInfo?.size}</p>
      <p>Progress: {wgetInfo?.progress}</p>
      <p>Speed: {wgetInfo?.speed}</p>
      <p>Eta: {wgetInfo?.eta}</p>
      {finished ? <p>{`Upload of ${wgetInfo!.file} finished`}</p> : null}
    </FormControl>
  );
}

export default Upload;
