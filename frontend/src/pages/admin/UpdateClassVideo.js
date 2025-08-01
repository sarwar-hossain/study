import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./style/AdminForm.css"; 

const UpdateClassVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: '',
    subject: '',
    topic: '',
    name: '',
    link: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/classvideo/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch video data');
        }
        const data = await response.json();
        setFormData({
          type: data.type || '',
          subject: data.subject || '',
          topic: data.topic || '',
          name: data.name || '',
          link: data.link || ''
        });
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchVideoData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/classvideo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update video');
      }

      navigate('/admin/class-video');
    } catch (error) {
      console.error('Error updating video:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-form-container">
      <h1>Update Class Video</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label>Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Topic</label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Video Link</label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate('/admin/class-video')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update Video'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateClassVideo;