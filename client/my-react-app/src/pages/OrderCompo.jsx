import Analytics from "../components/Analytics";
import Chart from "../components/Chart";
import Order from "../components/Order";


export const OrderCompo = (Props) => {
  const { navVisible } = Props;
  return (
    <div
      className={!navVisible ? "page bg-transparent" : "page page-with-navbar"}
    >
      <div className="w-full h-full p-20 absolute top-0 left-0 -z-50">
        <div className="h-1/6 w-full"></div>
        <div className="w-full h-5/6 flex items-center justify-center gap-4">
          <div className="w-4/6 h-full space-y-4 -mt-24 ">
            <Chart />
            <Analytics />
          </div>
          <Order />
        </div>
      </div>
    </div>
  );
};
