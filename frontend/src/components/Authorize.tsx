import { lighten } from "polished";
import { useEffect } from "react";
import { MdOutlineLockOpen } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { socket } from "../socket";

const StyledDiv = styled.div`
  background-color: ${({ theme }) => theme.secondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  p {
    color: white;
    font-size: 1rem;
  }
`;

const StyledButton = styled.button`
  height: 50px;
  width: 175px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border: none;
  background-color: ${({ theme }) => theme.button.primary};
  cursor: pointer;
  transition: background-color 250ms;

  &:hover {
    background-color: ${({ theme }) => lighten(0.025, theme.button.primary)};
  }

  svg {
    color: white;
    font-size: 1.75rem;
  }

  span {
    all: unset;
    color: white;
    font-weight: bolder;
    font-size: 1.1rem;
  }
`;

function Authorize({ updateUid }: { updateUid: (v: string) => void }) {
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("new-session-created", (uid) => {
      updateUid(uid);
      navigate("/" + uid);
    });
  }, []);

  const openConsentWindow = () => {
    window.open(
      `https://accounts.google.com/o/oauth2/auth?scope=https://www.googleapis.com/auth/drive&access_type=offline&redirect_uri=${
        import.meta.env.VITE_API_REDIRECT_URI
      }&response_type=code&client_id=${import.meta.env.VITE_API_CLIENT_ID}`,
      "_blank"
    );
  };

  return (
    <StyledDiv>
      <p>
        To upload using Drivey, please click the authorize button below and
        accept all prompt.
      </p>
      <StyledButton onClick={openConsentWindow}>
        <MdOutlineLockOpen />
        <span>Authorize</span>
      </StyledButton>
    </StyledDiv>
  );
}

export default Authorize;
