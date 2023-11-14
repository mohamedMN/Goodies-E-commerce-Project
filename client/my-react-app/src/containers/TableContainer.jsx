import { useState, useEffect } from "react";
import ErrorComponent from "../components/ErrorComponent";
import UserComponent from "../components/userComponent";
import { useSelector } from "react-redux";
import { AiOutlineSortAscending } from "react-icons/ai";

export default function TableContainer(Props) {
  const { searchValue } = Props;
  const auth = useSelector((state) => state.authReducer?.authData); // user

  const [isAdmin, setIsAdmin] = useState(false)

  const testingInfo = useSelector((state) => state.getAllUsers?.Data?.users);

  useEffect(() => {
    if (auth?.user.role === "Admin") {
      setIsAdmin(true)
    }
  },[auth])
  // filter function for search Button
  if (testingInfo) {
    var results = testingInfo.filter(
      (user) =>
        user.user_name.includes(searchValue.toLowerCase()) ||
        user.email.includes(searchValue.toLowerCase())
    );
  }

  return (
    <table className="table-xs sm:table-xs md:table-sm lg:table-md xl:table-lg table table-zebra w-full table-pin-rows">
      <thead className="table-header-group">
        <tr>
          <th className="bg-primary text-center justify-center items-center table-cell" scope="col">
            <label>Username</label>
            <button><AiOutlineSortAscending size={20} /></button>
          </th>
          <th className="bg-primary text-center justify-center items-center table-cell" scope="col">
            <label>Id</label>
            <button><AiOutlineSortAscending size={20}/></button>
          </th>
          <th className="bg-primary text-center justify-center items-center table-cell" scope="col">
            <label>Role</label>
            <button><AiOutlineSortAscending size={20}/></button>
          </th>
          <th className="bg-primary text-center justify-center items-center table-cell" scope="col">
            <label>Email</label>
            <button><AiOutlineSortAscending size={20}/></button>
          </th>
          {
            isAdmin ? <th className="bg-primary text-center justify-center items-center table-cell  " scope="col">
            <label>Actions</label>
            </th> : null
          }
        </tr>
      </thead>

      <tbody className="Table-Body">
        {testingInfo && testingInfo.length > 0 ? (
          results.length > 0 ? (
            results.map((user, index) => (
              <UserComponent key={index} index={index} isAdmin={isAdmin} managersInfo={user} />
            ))
          ) : (
            <ErrorComponent />
          )
        ) : (
          <ErrorComponent />
        )}
      </tbody>
    </table>
  );
}
