import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

function Authorize({ updateUid }: { updateUid: (v: string) => void }) {
  const navigate = useNavigate();
  const createSession = () => {
    api
      .get("/session/login")
      .then((res) => {
        const uid: string = res.data;
        console.log("New UUID: " + uid);
        updateUid(uid);
        navigate("/" + uid);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box>
      <Button variant="outlined">
        {" "}
        <a
          onClick={createSession}
          target="_blank"
          href="https://accounts.google.com/o/oauth2/auth?scope=https://www.googleapis.com/auth/drive&access_type=offline&redirect_uri=http://127.0.0.1:8081&response_type=code&client_id=83308545294-260s30kocb0gjsermuhlflehdsedqa95.apps.googleusercontent.com"
        >
          Authorize
        </a>
      </Button>
    </Box>
  );
}

export default Authorize;
