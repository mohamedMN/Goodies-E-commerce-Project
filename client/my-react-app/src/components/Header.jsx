import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { searchUserName } from "../redux/actions/userAction";
import { useState } from "react";

export default function Header() {
  const dispatch = useDispatch();

  const date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const Todaysdate = date.toLocaleDateString("en-us", options);
  const [searchValue, setSearchValue] = useState("");
  dispatch(searchUserName(searchValue));
  return (
    // <div>
    //   <h1>Today's Date</h1>
    //   <form>
    //           <label style={{ color: "white" }}>Recherche user</label>
    //           <input
    //             type="text"
    //             value={searchValue}
    //             onChange={(e) => setSearchValue(e.target.value)}
    //           />
    //         </form>
    //         <div className='user-info-pannel'>
    //         <div className='user-Profile-Pic'>

    //         </div>
    //         <div>
    //             <label className='usename-label'></label>
    //             <label className='email-Label'></label>
    //         </div>
    //         </div>
    // </div>
    <div className="w-full flex justify-around h-auto">
      <label className="label">
        <span className="text-xs sm:text-sm md:text-md xl:text-xl 2xl:text-xl text-primary font-roboto">
          {Todaysdate}
        </span>
      </label>

      <form className="flex flex-row-reverse items-center form-control">
        <input
          className="bg-transparent outline-none input-xs sm:input-sm md:input-sm lg:input-md xl:input-md 2xl:input-lg "
          placeholder="  Search By Username"
          type="text"
          // value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <AiOutlineSearch className="" />
      </form>
    </div>
  );
}
