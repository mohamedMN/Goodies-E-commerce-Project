import { useState, useEffect } from "react";
import ErrorComponent from "../components/ErrorComponent";
import UserComponent from "../components/userComponent";
import { useSelector } from "react-redux";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

export default function UsersTableContainer(Props) {
  const { searchValue } = Props;
  const auth = useSelector((state) => state.authReducer?.authData); // user

  const [isAdmin, setIsAdmin] = useState(false);

  const testingInfo = useSelector((state) => state.getAllUsers?.Data?.users);

  useEffect(() => {
    if (auth?.user.role === "Admin") {
      setIsAdmin(true);
    }
  }, [auth]);
  // filter function for search Button
  // filter function for search Button
  let results = [];
  const [sortOrder, setSortOrder] = useState("asc");
  if (testingInfo) {
    if (!searchValue) {
      // If searchValue is empty, show the full array of testingInfo
      results = [...testingInfo];
    } else {
      // If searchValue is not empty, filter the array based on the search criteria
      results = testingInfo.filter(
        (user) =>
          user.user_name.includes(searchValue.toLowerCase()) ||
          user.email.includes(searchValue.toLowerCase())
      );
    }
  }

  const sortByName = () => {
    let sortedData;

    if (sortOrder === "asc") {
      // Sort in descending order
      sortedData = [...results].sort((a, b) =>
        b.user_name.localeCompare(a.user_name)
      );
      setSortOrder("desc");
    } else {
      // Default: sort in ascending order
      sortedData = [...results].sort((a, b) =>
        a.user_name.localeCompare(b.user_name)
      );
      setSortOrder("asc");
    }

    results = sortedData;
  };
  const sortByEmail = () => {
    let sortedData;

    if (sortOrder === "asc") {
      // Sort in descending order
      sortedData = [...results].sort((a, b) => b.email.localeCompare(a.email));
      setSortOrder("desc");
    } else {
      // Default: sort in ascending order
      sortedData = [...results].sort((a, b) => a.email.localeCompare(b.email));
      setSortOrder("asc");
    }

    results = sortedData;
  };

  const sortByRole = () => {
    let sortedData;

    if (sortOrder === "asc") {
      // Sort in descending order
      sortedData = [...results].sort((a, b) => b.role.localeCompare(a.role));
      setSortOrder("desc");
    } else {
      // Default: sort in ascending order
      sortedData = [...results].sort((a, b) => a.role.localeCompare(b.role));
      setSortOrder("asc");
    }

    results = sortedData;
  };

  return (
    <table className="table-xs sm:table-xs md:table-sm lg:table-md xl:table-lg table table-zebra w-full table-pin-rows">
      <thead className="table-header-group">
        <tr>
          {isAdmin && (
            <th className="bg-primary text-base-100 items-center justify-start table-cell">
              <label className="flex items-center w-full justify-around">
                <input
                  type="checkbox"
                  className="checkbox checkbox-secondary font-roboto checkbox-sm"
                />
                <span>Select All</span>
              </label>
            </th>
          )}
          <th
            className="bg-primary text-base-100 items-center justify-start table-cell"
            scope="col"
          >
            <label>Username</label>
            <button onClick={sortByName}>
              {sortOrder === "asc" && <AiOutlineSortAscending size={20} />}
              {sortOrder === "desc" && <AiOutlineSortDescending size={20} />}
            </button>
          </th>
          <th
            className="bg-primary text-base-100 items-center justify-start table-cell"
            scope="col"
          >
            <label>Id</label>
          </th>
          <th
            className="bg-primary text-base-100 items-center justify-start table-cell"
            scope="col"
          >
            <label>Role</label>
            <button onClick={sortByRole}>
              {sortOrder === "asc" && <AiOutlineSortAscending size={20} />}
              {sortOrder === "desc" && <AiOutlineSortDescending size={20} />}
            </button>
          </th>
          <th
            className="bg-primary text-base-100 items-center justify-start table-cell"
            scope="col"
          >
            <label>Email</label>
            <button onClick={sortByEmail}>
              {sortOrder === "asc" && <AiOutlineSortAscending size={20} />}
              {sortOrder === "desc" && <AiOutlineSortDescending size={20} />}
            </button>
          </th>
          {isAdmin ? (
            <th
              className="bg-primary text-base-100 items-center justify-start table-cell"
              scope="col"
            >
              <label>Actions</label>
            </th>
          ) : null}
        </tr>
      </thead>

      <tbody className="Table-Body">
        {testingInfo ? (
          results.map((user, index) => (
            <UserComponent
              key={index}
              index={index}
              isAdmin={isAdmin}
              managersInfo={user}
            />
          ))
        ) : (
          <ErrorComponent />
        )}
      </tbody>
    </table>
  );
}
