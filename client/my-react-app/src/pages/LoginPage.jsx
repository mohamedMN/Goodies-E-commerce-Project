import LeftSideLog from "../containers/LeftSideLog";
import "./../styles/LoginPage.css"
import LoginForm from "./../containers/LoginForm";

function LoginPage(Props) {
  const { navVisible } = Props;
  const LoginMessage = 'Welcome Back'
  return (
    <div className={!navVisible ? "page" : "page page-with-navbar"}>
      <div className="flex justify-center w-full h-full">
      <div className="self-center w-7/12 sm:w-6/12  md:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-1/3 h-3/5 flex  shadow-sm p-4 shadow-primary bg-primary rounded-2xl ">
        <LoginForm />
      </div>
        
      </div>
    <div className=" bg-primary w-2/3 h-full z-0 ">
        <LeftSideLog message={LoginMessage} />
    </div>
    </div>
  );
}

export default LoginPage;
