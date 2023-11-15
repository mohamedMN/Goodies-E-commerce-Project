import LeftSideLog from "../containers/LeftSideLog";
import "./../styles/LoginPage.css"
import LoginForm from "./../containers/LoginForm";

function LoginPage(Props) {
  const { navVisible } = Props;
  const LoginMessage = 'Welcome Back'
  return (
    <div className={!navVisible ? "page" : "page page-with-navbar"}>
    <div className="bg-primary w-1/3 absolute h-full right-0 z-0">
        <LeftSideLog message={LoginMessage} className='LeftSideLoginPage'/>
    </div>
      <div className="w-7/12 sm:w-6/12 md:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-1/3 h-3/5 flex  shadow-md p-4 shadow-primary bg-secondary rounded-2xl  relative right-[14%]">
        <LoginForm/>
      </div>
    </div>
  );
}

export default LoginPage;
