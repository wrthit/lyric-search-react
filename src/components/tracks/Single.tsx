import React from 'react'
import { Track } from '../../types/Track';
import { Link } from 'react-router-dom';

interface TrackProperties {
    single: Track;
}

const Single: React.FC<TrackProperties> = ({ single }) => {
    return (
        <div className="col-md-6">
            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <h5>
                        {single.artist_name}
                    </h5>
                    <p className="card-text">
                        <strong><i className="fas fa-play" /> Track</strong>: {single.track_name}
                        <br/>
                        <strong><i className="fas fa-compact-disc" /> Album</strong>: {single.album_name}
                    </p>
                    <Link to={`lyrics/track/${single.track_id}`} className="btn btn-dark btn-block">
                        <i className="fas fa-chevron-right"></i> View Lyrics
                    </Link>
                </div>
            </div> 
        </div>
    )
}

export default Single;
