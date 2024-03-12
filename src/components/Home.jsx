import Navbar from "./Navbar";

const Home = (props) => {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="xl:flex  items-center justify-center mt-[150px] mx-5 ">
        <div className="">
          <h1 className="text-5xl font-medium my-5">
            Select Configuration Type{" "}
          </h1>
          <div className="flex flex-wrap">
            <div className="w-[350px] mx-5 bg-[#EAF5FF] px-[30px] py-[20px] h-fit rounded-2xl my-5">
              <h1 className="text-4xl font-bold">Web &nbsp; Configuration </h1>
              <div className="h-[200px] py-8 ">
                <p className="text-2xl mb-10">
                  Configure your Web Flow and Web UI
                </p>
                <a
                  href="/"
                  className="px-8 py-5 bg-green-600 rounded-xl text-white font-bold mt-5"
                >
                  Web Configuration
                </a>
              </div>
            </div>
            <div className="w-[350px] mx-5 bg-[#EAF5FF] px-[30px] py-[20px] h-fit rounded-2xl my-5">
              <h1 className="text-4xl  font-bold ">Mobile Configuration </h1>
              <div className="h-[200px] py-8">
                <p className="text-2xl mb-10">
                  Configure your Mobile Flow and Mobile UI
                </p>
                <a
                  href="/mobile-config"
                  className="px-8 py-5 bg-green-600 rounded-xl text-white font-bold mt-8"
                >
                  Mobile Configuration
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:flex hidden">
          <div className="bg-black w-0.5 h-70 mx-5"></div>
          <div className="ml-[40px] w-[600px]">
            <h1 className="text-8xl font-bold text-[#999696]">
              Welcome to Field Service Configuration
            </h1>
            <h1 className="mt-10 text-2xl font-bold mx-5">
              Configure your Web or Mobile App Here...{" "}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
