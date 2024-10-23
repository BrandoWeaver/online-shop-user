import { Navigate } from "react-router-dom";
import Sidebar from "./SideBar";
import { ROUTE_PATH } from "../../utils/route-util";
import { useAuthContext } from "../../contexts/AuthContext";

function Account() {
  const { authState } = useAuthContext();
  if (!authState?.isLogIn) {
    return <Navigate to={ROUTE_PATH.login} replace />;
  }
  return (
    <div>
      <Sidebar />
    </div>
  );
}

export default Account;
