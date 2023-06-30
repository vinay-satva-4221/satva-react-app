import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useEffect } from "react";
import { addUserAction, getAllUsersAction } from "./redux/slices/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsersAction());
  }, []);

  const {
    data: usersData,
    isLoading,
    error,
  } = useSelector((state: any) => state?.users);
  console.log("SS: ", usersData);

  const addUser = () => {
    dispatch(addUserAction());
  };

  return (
    <div className="App">
      <h1>Working</h1>
      <button onClick={addUser}>Add</button>
    </div>
  );
}

export default App;
