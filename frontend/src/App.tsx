import "./App.css";
import { api } from "./api";

function App() {
  const createSession = () => {
    api.post("/login");
  };

  return (
    <div>
      <a
        onClick={createSession}
        target="_blank"
        href="https://accounts.google.com/o/oauth2/auth?scope=https://www.googleapis.com/auth/drive&access_type=offline&redirect_uri=http://127.0.0.1:8081&response_type=code&client_id=83308545294-260s30kocb0gjsermuhlflehdsedqa95.apps.googleusercontent.com"
      >
        Authorize
      </a>
    </div>
  );
}

export default App;
