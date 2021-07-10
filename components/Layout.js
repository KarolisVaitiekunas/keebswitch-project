import Navbar from "./Navbar";
function Layout({ children }) {
  return (
    <div style={{ height: "100vh" }}>
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
