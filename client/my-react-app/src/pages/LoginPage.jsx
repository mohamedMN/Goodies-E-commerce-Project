import LoginForm from "./../containers/LoginForm";

function LoginPage(Props) {
  const { navVisible } = Props;
  return (
    <div className={!navVisible ? "page" : "page page-with-navbar"}>
      <div className="Login-Page">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
