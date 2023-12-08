import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";

function Authorize({ updateUid }: { updateUid: (v: string) => void }) {
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("new-session-created", (uid) => {
      updateUid(uid);
      navigate("/" + uid);
    });
  }, []);

  return (
    <Box>
      <Button variant="outlined">
        <a
          target="_blank"
          href={`https://accounts.google.com/o/oauth2/auth?scope=https://www.googleapis.com/auth/drive&access_type=offline&redirect_uri=${
            import.meta.env.VITE_API_REDIRECT_URI
          }&response_type=code&client_id=${import.meta.env.VITE_API_CLIENT_ID}`}
        >
          Authorize
        </a>
      </Button>
    </Box>
  );
}

export default Authorize;
