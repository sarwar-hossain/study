import { useParams, Link } from 'react-router-dom';
import './../../pagescss/ClassVideoView.css';
import './../../pagescss/ClassVideo.css';
import ClassVideos from '../Database/ClassVideos';


function ClassVideoView() {
  const { type, subject, topic, name, videoId } = useParams();

  const decodedParams = {
    type: decodeURIComponent(atob(type)),
    subject: decodeURIComponent(atob(subject)),
    topic: decodeURIComponent(atob(topic)),
    name: decodeURIComponent(atob(name)),
    videoId: decodeURIComponent(atob(videoId))
  };

  const { allClassVideo } = ClassVideos();


  const filteredVideos = allClassVideo.filter(video =>
    video.type === decodedParams.type &&
    video.subject === decodedParams.subject &&
    video.topic === decodedParams.topic
  );


  const renderVideoPlayer = () => {
    if (!decodedParams.videoId) return <div className="error-message">No video selected</div>;

    const decodedUrl = decodedParams.videoId;
    const isYoutubeUrl = decodedUrl.includes('youtube.com/embed/') ||
      decodedUrl.includes('youtu.be/');

    if (!isYoutubeUrl) return <div className="error-message">Invalid video URL format</div>;

    return (
      <div className="video-main">
        <div className="video-wrapper">
          <iframe
            className="responsive-iframe"
            src={decodedUrl}
            title="Video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <h1> {decodedParams.name} </h1>
      </div>
    );
  };

  return (
    <div className="class-video-view-container">
      {/* Video Player Section */}
      {renderVideoPlayer()}

      {/* Related Videos Section */}
      <div className="related-videos">
        <header className="video-header">
          <h1 className="page-title">More {decodedParams.subject} videos</h1>
          <div className="breadcrumbs">
          </div>
        </header>

        {filteredVideos.length === 0 ? (
          <div className="empty-state">
            <img src="/images/no-videos.svg" alt="No videos" />
            <p>No related videos found</p>
          </div>
        ) : (
          <div className="video-grid">
            {filteredVideos.map((video) => (
              <Link
                to={`/class-video-view/${btoa(encodeURIComponent(video.type))}/${btoa(encodeURIComponent(video.subject))}/${btoa(encodeURIComponent(video.topic))}/${btoa(encodeURIComponent(video.name))}/${btoa(encodeURIComponent(video.link))}`
                }
                className="link"
              >
                <div className="video-card">
                  <div className="thumbnail-container">
                    <img
                      src={`/uploads/${video.img}`}
                      alt={video.name}
                      className="video-thumbnail"
                      onError={(e) => {
                        e.target.src = '/images/thumbnail-fallback.jpg';
                      }}
                    />
                    <div className="play-icon">
                      <svg viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="video-info">
                    <h3 className="video-title">{video.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ClassVideoView;