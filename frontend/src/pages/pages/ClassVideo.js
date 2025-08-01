import { useParams, Link } from 'react-router-dom';
import './../../pagescss/ClassVideo.css';
import ClassVideos from '../Database/ClassVideos';
import Payments from '../Database/Payments';

function ClassVideo() {
    const { type, subject, topic, name } = useParams();
    const decodedType = atob(type);
    const decodedSubject = atob(subject);
    const decodedTopic = atob(topic);
    const decodedName = atob(name);

    const { allClassVideo } = ClassVideos();
    const { filterByPhoneAllPayment } = Payments();

    const filteredVideos = allClassVideo.filter(video =>
        video.type === decodedType &&
        video.subject === decodedSubject &&
        video.topic === decodedTopic
    );

    const decodedPath = "class";
    const UserPayment = filterByPhoneAllPayment.find(
        submission => submission.buyed === decodedType
    );

    const isPayment = !!UserPayment;
    let payed = false;

     let price=99;

    if (decodedType === "class") {
        price = 999;
        payed = true;
    }


    return (
        <>

            {isPayment || !payed ? (
                <>
                    <div className="class-video-page">
                        <header className="video-header">
                            <p className="page-title">{decodedName} {decodedSubject} class videos</p>
                        </header>
                        <main className="video-gallery">
                            {filteredVideos.length === 0 ? (
                                <div className="empty-state">
                                    <p>Coming soon videos found for this selection.</p>
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
                                                    <h2 className="video-title">{video.name}</h2>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </main>
                    </div>

                </>
            ) : (
                <>
                    <div className="payment-container">
                        <div className="payment-section">
                            <div className="note-details">
                                <h2 className="note-title">{decodedType}</h2>
                                <div className="detail-row">
                                    <span className="detail-label">About:</span>
                                    <span className="detail-value">This is  out best {decodedType}</span>
                                </div>
                                <div className="price-section">
                                    <span className="price-label">Price:</span>
                                    <span className="price-value">₹{price}</span>
                                </div>
                            </div>
                            <Link
                                to={`/payment/${btoa(encodeURIComponent(decodedPath))}/${btoa(encodeURIComponent(price))}/${btoa(encodeURIComponent(decodedType))}`}
                                className="payment-button"
                            >
                                Purchase Now
                            </Link>
                        </div>
                    </div>

                </>
            )}

        </>
    );
}

export default ClassVideo;