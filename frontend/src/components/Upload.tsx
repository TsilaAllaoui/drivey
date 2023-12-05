import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { api } from "../api";

function Upload() {
  const location = useLocation();
  const [percentage, setPercentage] = useState("");

  const uploadFromUrl = () => {
    const input = document.querySelector("#url") as HTMLInputElement;
    const url = input.value;
    console.log(url);
    api.post("/upload", {
      url,
      uid: location.pathname.slice(1),
    });
  };

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_ENDPOINT!);
    socket.on("percentage", (data) => {
      console.log(data);
      setPercentage(data);
    });
    socket.on("test", (data) => {
      console.log(data);
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
      <Input id="url" aria-describedby="url-help" />
      <FormHelperText id="url-help">Remote file url to upload</FormHelperText>
      <Button variant="outlined" onClick={uploadFromUrl}>
        Upload
      </Button>
      <p>Progress: {percentage}</p>
    </FormControl>
  );
}

export default Upload;
