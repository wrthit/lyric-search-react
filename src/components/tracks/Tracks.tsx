import React, { useContext } from 'react'
import TrackListContext from '../../context'
import { Track } from '../../types/Track';
import { TrackList } from '../../types/TrackList';
import Single from './Single';

const Tracks: React.FC = () => {
    const { tracks, heading }: TrackList = useContext<TrackList>(TrackListContext);

    const renderTracks = (tracks: Track[]) => {
        if (tracks.length === 0) {
            return <span>Loading...</span>
        }
        return tracks.map( (track: Track) => {
            return (  
                <Single key={track.track_id} single={track} />
            )
        })
    }
    
    return (
        <React.Fragment>
            <h1>{heading}</h1>
            <div className="row">
                {renderTracks(tracks)}
            </div>
        </React.Fragment>   
    )
}

export default Tracks
