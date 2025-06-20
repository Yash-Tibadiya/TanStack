import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen mx-auto p-2">
        <h1>The Awesome React query</h1>
        <div>
          <Link to="/" className="underline">
            Home
          </Link>{" "}
          <br />
          <Link to="/products" className="underline">
            Products
          </Link>
        </div>
      </div>
    </>
  );
}

export default App;
