import "./../styles/LeftSideLog.css"
import Logo from "./../assets/GoodiesAdmin.svg"


export default function LeftSideLog({message}) {
    return (
    <div className="flex h-full flex-col items-center w-full justify-between py-2 z-50">
        <div className="Logo-container-left">
        <img 
        className="w-full h-full"
        src={Logo}
        alt="Logo"     
        />
        </div>
        <div className="font-roboto font-bold text-center z-50 text-md 2xl:text-6xl xl:text-5xl lg:text-4xl md:text-2xl sm:text-xl ">
{message}
        </div>
        <div className="sm:text-xs xl:text-sm 2xl:text-base text-xs text-center font-roboto">
        if you’re encountering issures with logging in please contact your administrator.
        </div>
    </div>
  )
}
