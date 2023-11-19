import { useState, useEffect } from "react";
import ErrorComponent from "../components/ErrorComponent";
import UserComponent from "../components/userComponent";
import { useSelector } from "react-redux";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";

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
  const [resaults, setResaults] = useState(testingInfo);
  const [sortOrder, setSortOrder] = useState("asc");
  useEffect(()=>{

    if (testingInfo) {
      var filteredResaults = testingInfo.filter(
        (user) =>
        user.user_name.includes(searchValue.toLowerCase()) ||
        user.email.includes(searchValue.toLowerCase())
        );
      }
      setResaults(filteredResaults)
      console.log(resaults)
  },[searchValue])
    
  const sortByName = () => {
    let sortedData;

    if (sortOrder === "asc") {
      // Sort in descending order
      sortedData = [...resaults].sort((a, b) => b.user_name.localeCompare(a.user_name));
      setSortOrder("desc");
    } else {
      // Default: sort in ascending order
      sortedData = [...resaults].sort((a, b) => a.user_name.localeCompare(b.user_name));
      setSortOrder("asc");
    }

    setResaults(sortedData);
  };
  const sortByEmail = () => {
    let sortedData;

    if (sortOrder === "asc") {
      // Sort in descending order
      sortedData = [...resaults].sort((a, b) => b.email.localeCompare(a.email));
      setSortOrder("desc");
    } else {
      // Default: sort in ascending order
      sortedData = [...resaults].sort((a, b) => a.email.localeCompare(b.email));
      setSortOrder("asc");
    }

    setResaults(sortedData);
  };
  
  const sortByRole = () => {
    let sortedData;

    if (sortOrder === "asc") {
      // Sort in descending order
      sortedData = [...resaults].sort((a, b) => b.role.localeCompare(a.role));
      setSortOrder("desc");
    } else {
      // Default: sort in ascending order
      sortedData = [...resaults].sort((a, b) => a.role.localeCompare(b.role));
      setSortOrder("asc");
    }

    setResaults(sortedData);
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
            resaults.map((user, index) => (
              <UserComponent
                key={index}
    
                index={index}
                isAdmin={isAdmin}
                managersInfo={user}
              />
            ))
          ) : (
            <ErrorComponent />
          )
        }
      </tbody>
    </table>
  );
}
