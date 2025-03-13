import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-red-500">404 - Not Found</h1>
      <Link to="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
