import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from 'socket.io-client'
// import SocketClient from "./SocketClient";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import Register from "./pages/register";
import { useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";
import { useEffect } from "react";


function App() {
  // const { auth, status, modal, userType } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());

    const socket = io();
    dispatch({type: GLOBALTYPES.SOCKET, payload: socket })
    return () => socket.close()
  }, [dispatch]);

  return (
    <div className="app">
      <BrowserRouter>
       
          
          <Routes>
          <Route path="/" element={ <Register />} />
         
        
          </Routes>
       
      </BrowserRouter>
    </div>
  );
}

export default App;
