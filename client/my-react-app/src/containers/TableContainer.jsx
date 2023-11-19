import { useState, useEffect } from "react";
import ErrorComponent from "../components/ErrorComponent";
import UserComponent from "../components/userComponent";
import { useSelector } from "react-redux";
import { AiOutlineSortAscending } from "react-icons/ai";

export default function TableContainer(Props) {
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
  useEffect(()=>{

    if (testingInfo) {
      var filteredResaults = testingInfo.filter(
        (user) =>
        user.user_name.includes(searchValue.toLowerCase()) ||
        user.email.includes(searchValue.toLowerCase())
        );
      }
      setResaults(filteredResaults)
  },[searchValue])
    
  const sortByName = () => {
    const sortedData = [...resaults].sort((a, b) => {
      // Convert names to lowercase for case-insensitive sorting
      const nameA = a.user_name.toLowerCase();
      const nameB = b.user_name.toLowerCase();

      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

    setResaults(sortedData)
  };
  
  return (
    <table className="table-xs sm:table-xs md:table-sm lg:table-md xl:table-lg table table-zebra w-full table-pin-rows">
      <thead className="table-header-group">
        <tr>
          {isAdmin && (
            <th className="bg-primary text-base-100 text-center justify-center items-center table-cell">
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
            className="bg-primary text-base-100 text-center justify-center items-center table-cell"
            scope="col"
          >
            <label>Username</label>
            <button onClick={sortByName}>
              <AiOutlineSortAscending size={20} />
            </button>
          </th>
          <th
            className="bg-primary text-center text-base-100 justify-center items-center table-cell"
            scope="col"
          >
            <label>Id</label>
            <button>
              <AiOutlineSortAscending size={20} />
            </button>
          </th>
          <th
            className="bg-primary text-center justify-center text-base-100 items-center table-cell"
            scope="col"
          >
            <label>Role</label>
            <button>
              <AiOutlineSortAscending size={20} />
            </button>
          </th>
          <th
            className="bg-primary text-center justify-center items-center text-base-100 table-cell"
            scope="col"
          >
            <label>Email</label>
            <button>
              <AiOutlineSortAscending size={20} />
            </button>
          </th>
          {isAdmin ? (
            <th
              className="bg-primary text-center justify-center items-center text-base-100 table-cell  "
              scope="col"
            >
              <label>Actions</label>
            </th>
          ) : null}
        </tr>
      </thead>

      <tbody className="Table-Body">
        {testingInfo && testingInfo.length > 0 ? (
          resaults.length > 0 ? (
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
        ) : (
          <ErrorComponent />
        )}
      </tbody>
    </table>
  );
}
