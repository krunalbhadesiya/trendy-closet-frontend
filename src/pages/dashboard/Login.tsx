// Import necessary components and libraries
import LoginForm from "@/components/LoginForm";
import LogoD from '../../assets/Logo-D.png';

// Login component for rendering the login page layout
function Login() {

  return (
    <div className="p-4 bg-primary">
      <div className="w-full backdrop-blur-md max-w-md border-2 border-opacity-5 border-white  bg-opacity-15  rounded-lg p-6 shadow-lg ">
        <div className="space-y-4 text-white">
          <div className="flex flex-col items-center space-y-2">
          <img src={ LogoD}  className="w-2/6" alt="Logo" />
            <h2 className="text-2xl font-bold tracking-tight">Login</h2>
          </div>
          <LoginForm/>
        </div>
      </div>
    </div>
  );
}

export default Login;
