import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import SocketClient from "./SocketClient";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import Alert from "./component/alert/Alert";
import Header from "./component/header/Header";
import Register from "./pages/register";
import Login from "./pages/login";
import StatusModal from "./component/StatusModal";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";
import { useEffect } from "react";

function App() {
  const { auth, status, modal, userType } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());

    const socket = io();
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className={`App ${(status || modal) && "mode"}`}>
        <div className="main">
          <Routes>
            <Route path="/" element={<Header />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
