import React, { useContext } from 'react'
import { TrackListAction, TrackListContext } from '../../context'
import { Track } from '../../types/Track';
import { TrackList } from '../../types/TrackList';
import Single from './Single';

const Tracks: React.FC = () => {
    const { state } = useContext<{state:TrackList, dispatch:React.Dispatch<TrackListAction>}>(TrackListContext)

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
            <h1 className="text-center">{state.heading}</h1>
            <div className="row">
                {renderTracks(state.tracks)}
            </div>
        </React.Fragment>   
    )
}

export default Tracks
