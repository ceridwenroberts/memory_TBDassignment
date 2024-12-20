import Image from "next/image";

const Header = () => {
  return (
    <>
      <div className="relative flex-none bg-orange-800">
        <div className="grid grid-cols-3 justify-evenly items-center p-1 lg:p-2">
          <div className="">
            <Image
              src="/logo.png"
              alt="page logo"
              width="30"
              height="30"
              aria-label="logo"
            />
          </div>
          <div className="justify-self-center">
            <h1 className="text-2xl">Memorista</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
