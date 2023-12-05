import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Authorize from "./components/Authorize";
import { api } from "./api";

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
    <div className="main">
      <h1>Drivey</h1>
      {uid == "" ? (
        <Authorize updateUid={setUid} />
      ) : (
        <Outlet context={[uid, setUid]} />
      )}
    </div>
  );
}

export default App;
