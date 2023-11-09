import LeftSideLog from "../containers/LeftSideLog";
import "./../styles/LoginPage.css"
import LoginForm from "./../containers/LoginForm";

function LoginPage(Props) {
  const { navVisible } = Props;
  return (
    <div className={!navVisible ? "page" : "page page-with-navbar"}>
    <div className="Background-Login">
        <LeftSideLog className='LeftSideLoginPage'/>
    </div>
      <div className="Login-Content">
        <LoginForm  />
      </div>
    </div>
  );
}

export default LoginPage;
