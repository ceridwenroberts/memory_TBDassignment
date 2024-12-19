import Image from "next/image"

const Header = () => {
  return (
    <>
      <div>
        <Image
          src="/logo.png"
          alt="page logo"
          width="100"
          height="100"
          aria-label="logo"
        />
              <h1>Memorista</h1>
              
      </div>
    </>
  );
};

export default Header;

