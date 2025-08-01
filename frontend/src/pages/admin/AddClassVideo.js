import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/AdminForm.css"; 

const AddClassVideo = () => {
    const [formData, setFormData] = useState({
        type: "",
        subject: "",
        topic: "",
        name: "",
        link: "",
        img: null,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, img: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("type", formData.type);
            formDataToSend.append("subject", formData.subject);
            formDataToSend.append("topic", formData.topic);
            formDataToSend.append("name", formData.name);
            formDataToSend.append("link", formData.link);
            formDataToSend.append("img", formData.img);

            const response = await fetch("http://localhost:3000/classvideo", {
                method: "POST",
                body: formDataToSend,
            });

            if (response.ok) {
                alert("Item added successfully!");
                setFormData({ type: "", subject: "", topic: "", name: "", link: "", img: null });
                navigate("/admin/class-video");
            } else {
                alert("Failed to add item.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="admin-form-container">
            <h2>Add New Video</h2>
            <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-group">
                    <label>Type:</label>
                    <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Subject:</label>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Topic:</label>
                    <input
                        type="text"
                        name="topic"
                        value={formData.topic}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Link:</label>
                    <input
                        type="text"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Thumbnail Image:</label>
                    <input
                        type="file"
                        name="img"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-btn">Add Video</button>
                    <button 
                        type="button" 
                        className="view-btn"
                        onClick={() => navigate("/admin/class-video")}
                    >
                        View Videos
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddClassVideo;