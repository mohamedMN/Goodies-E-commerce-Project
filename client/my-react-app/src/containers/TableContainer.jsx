import {useEffect} from 'react'
import { getUsers } from "../redux/actions/AuthAction";
import ErrorComponent from '../components/ErrorComponent';
import UserComponent from '../components/userComponent';
import { useDispatch , useSelector} from 'react-redux';

export default function TableContainer({searchValue}) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getUsers());
    }, [dispatch]);

    const testingInfo = useSelector((state) => state.getAllUsers?.Data?.users);
  return (
    <table className=" table table-zebra Main-Table table-pin-rows">
            <caption>Users Table for your Back Office</caption>
            <thead >
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
                (() => {
                  const results = testingInfo.filter((user) =>
                    user.user_name.includes(searchValue.toLowerCase())
                  );

                  if (results.length > 0) {
                    return results.map((user, index) => (
                      <UserComponent  
                        key={user.id}
                        index={index}
                        managersInfo={user}
                      />
                    ));
                  } else {
                    return <ErrorComponent />;
                  }
                })()
              ) : (
                <ErrorComponent />
              )}
            </tbody>
          </table>
  )
}