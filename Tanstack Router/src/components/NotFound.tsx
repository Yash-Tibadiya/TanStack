import { useNavigate } from "@tanstack/react-router";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
      <br />
      <button onClick={() => navigate({ to: "/" })} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded cursor-pointer">Start Over</button>
    </div>
  );
};

export default NotFound;
