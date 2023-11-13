import ErrorComponent from "../components/ErrorComponent";
import UserComponent from "../components/userComponent";
import { useSelector } from "react-redux";

export default function TableContainer(Props) {
  const { searchValue } = Props;

  const testingInfo = useSelector((state) => state.getAllUsers?.Data?.users);

  // filter function for search Button
  if (testingInfo) {
    var results = testingInfo.filter(
      (user) =>
        user.user_name.includes(searchValue.toLowerCase()) ||
        user.email.includes(searchValue.toLowerCase())
    );
  }

  return (
    <table className=" table table-zebra Main-Table table-pin-rows">
      <caption>Users Table for your Back Office</caption>
      <thead>
        <tr>
          <th className="table-Header" scope="col">
            <label>Username</label>
          </th>
          <th className="table-Header" scope="col">
            <label>Id</label>
          </th>
          <th className="table-Header" scope="col">
            <label>Role</label>
          </th>
          <th className="table-Header" scope="col">
            <label>Email</label>
          </th>
          <th className="table-Header" scope="col">
            <label>Actions</label>
          </th>
        </tr>
      </thead>

      <tbody className="Table-Body">
        {testingInfo && testingInfo.length > 0 ? (
          results.length > 0 ? (
            results.map((user, index) => (
              <UserComponent key={index} index={index} managersInfo={user} />
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
