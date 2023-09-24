import React from "react";
import Header from "./Header";
import Main from "./Main";

const Layout = ({ linkText, userEmail, name, ...props }) => {
  return (
    <>
      <Header linkText={linkText} userEmail={userEmail} />
      <Main name={name} {...props} />
    </>
  );
};

export default Layout;
