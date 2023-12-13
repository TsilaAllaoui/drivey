import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { api } from "./api";
import Authorize from "./components/Authorize";

const StyledDiv = styled.div`
  background-color: ${({ theme }) => theme.secondary};
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  overflow: hidden;
  position: relative;

  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    * {
      margin: 0.5rem 0;
      color: white;
    }

    p {
      font-size: 1.25rem;
    }
  }

  .main {
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  & > p {
    color: white;
    font-size: 1.75rem;
  }

  footer {
    display: flex;
    gap: 2rem;
    color: white;
    position: absolute;
    bottom: 1rem;

    span {
      a {
        all: unset;
        cursor: pointer;
      }
    }
  }
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  gap: 1rem;

  img {
    transform: scaleY(-1);
  }

  h1 {
    color: white;
    font-size: 3rem;
  }
`;

function App() {
  const [uid, setUid] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname != "/") {
      api.post("/session/" + location.pathname.slice(1)).then((res) => {
        console.log(res.data);
        if (!res.data) {
          navigate("/");
        } else {
          console.log(res.data);
        }
      });
      setUid(location.pathname.slice(1));
    } else setUid("");
  }, [location]);

  return (
    <StyledDiv>
      <div className="header">
        <StyledHeader>
          <img src="icon.svg" alt="icon" />
          <h1>Drivey</h1>
        </StyledHeader>
        <p>The way to upload</p>
      </div>
      <div className="main">
        {uid == "" ? (
          <Authorize updateUid={setUid} />
        ) : (
          <Outlet context={[uid, setUid]} />
        )}
      </div>
      <footer>
        <span>Drivey 2023</span>
        {" - "}
        <span>
          <a href="https://github.com/tsilaallaoui" target="_blank">
            TsilaAllaoui
          </a>
        </span>
      </footer>
    </StyledDiv>
  );
}

export default App;
