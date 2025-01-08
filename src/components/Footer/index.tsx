import Rules from "../Rules";
const Footer = () => {
  return (
    <div
      className="mt-auto grid grid-cols-2 gap-x-4 p-4 border border-t-1 border-orange-800"
      role="contentinfo"
    >
      <div
        className="flex align-items-start place-self-end text-xs lg:text-base"
        data-testid="copyright"
      >
        <p>© Darius Kaya</p>
      </div>
      <div>
        <Rules />
      </div>
    </div>
  );
};

export default Footer;
