import { Link } from "react-router-dom";

const ExpertSideBar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white shadow-lg p-4 space-y-6 sticky top-0">
      <div className="text-xl font-bold text-gray-200"> Dashboard</div>
      <div className="space-y-4">

        <Link to="/expert/spottings">
          <button className="w-full text-left p-2 rounded hover:bg-gray-700 transition">
            Spottings
          </button>
        </Link>

        <button className="w-full text-left p-2 rounded hover:bg-gray-700 transition">
          Data
        </button>
        <button className="w-full text-left p-2 rounded hover:bg-gray-700 transition">
          Help
        </button>
        <button className="w-full text-left p-2 rounded hover:bg-gray-700 transition">
          Map
        </button>
      </div>
    </div>
  );
};

export default ExpertSideBar;
