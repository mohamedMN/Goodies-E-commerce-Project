const Analytics = (Props) => {
  const { navVisible } = Props;

  return (
    <div className={navVisible ? "page page-with-navbar" : "page"}>
      <div className="bg-primary text-text-color rounded-lg col-span-2 row-span-4">
        <div className="p-4 border rounded shadow-md">
          <div className="w-screen">
            <div className="font-bold text-2xl mb-4">Dashboard:</div>
            <div className="flex gap-10">
              <div className="flex items-center mb-2">
                <div className="text-text-color">Total Sales:</div>
                <div className="ml-2 text-green-600">+24.00%</div>
              </div>
              <div className="flex items-center mb-2">
                <div className="text-text-color">Today&apos;s Orders:</div>
                <div className="ml-2 text-green-600">+245.00$</div>
              </div>
              <div className="flex items-center mb-2">
                <div className="text-text-color">Today&apos;s Profit:</div>
                <div className="ml-2 text-green-600">+21.00%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
