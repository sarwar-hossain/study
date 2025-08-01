import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminClassVideo = () => {
  const [classVideo, setClassVideo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/classvideo')
      .then((response) => response.json())
      .then((data) => setClassVideo(data))
      .catch((error) => console.error('Error fetching mydata:', error));
  }, []);

  const handleDeleteMyData = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/classvideo/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setClassVideo((prevData) => prevData.filter((item) => item._id !== id));
      } else {
        console.error('Failed to delete MyData item');
      }
    } catch (error) {
      console.error('Error deleting MyData item:', error);
    }
  };


  const handleUpdateClick = (id) => {
    navigate(`/admin/update-class-video/${id}`);
  };

  return (
    <div className="container mx-auto p-4 ">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Class Videos {classVideo.length}</h1>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out"
          onClick={() => navigate("/admin/add-class-video")}
        >
          Upload New Video
        </button>
      </div>
      <hr className="mb-6 border-gray-300" />

      {/* Video List */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classVideo.map((item) => (
          <li
            key={item._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
          >
            {/* Video Thumbnail */}
            <div className="relative w-full h-48 overflow-hidden bg-gray-200">
              <img
                className="w-full h-full object-cover"
                src={`/uploads/${item.img}`}
                alt={item.topic || "Class Video"}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x180?text=No+Image'; // Fallback image
                }}
              />
            </div>

            {/* Video Content */}
            <div className="p-4 flex flex-col flex-grow">
              <div className="text-gray-700 space-y-2 mb-4">
                <p>
                  <strong className="font-semibold">Type:</strong> {item.type}
                </p>
                <p>
                  <strong className="font-semibold">Subject:</strong>{" "}
                  {item.subject}
                </p>
                <p>
                  <strong className="font-semibold">Topic:</strong> {item.topic}
                </p>
                <p>
                  <strong className="font-semibold">Name:</strong> {item.name}
                </p>
                <p className="truncate">
                  <strong className="font-semibold">Link:</strong>{" "}
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {item.link}
                  </a>
                </p>
              </div>

              {/* Video Actions */}
              <div className="mt-auto flex justify-end space-x-3">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-300 ease-in-out"
                  onClick={() => handleDeleteMyData(item._id)}
                >
                  Delete
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition duration-300 ease-in-out"
                  onClick={() => handleUpdateClick(item._id)}
                >
                  Update
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminClassVideo;