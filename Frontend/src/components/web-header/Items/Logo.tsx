import { NavLink } from "react-router-dom";

const Logo = () => {
  return (
    <NavLink to="/">
      <img
        className="md:block hidden"
        width={170}
        draggable="false"
        src="/Headerlogo.png"
        alt=""
      />
      <img
        width={140}
        className="md:hidden block"
        src="/Headerlogo.png"
        alt="" />
    </NavLink>
  );
};

export default Logo;
