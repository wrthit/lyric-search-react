import axios from 'axios';
import React, { useContext, useState } from 'react';
import { TrackListAction, TrackListContext } from '../../context';
import { Track } from '../../types/Track';
import { TrackList } from '../../types/TrackList';

const Search: React.FC = () => {
    const [trackTitle, setTrackTitle] = useState('');
    const { state, dispatch } = useContext<{state:TrackList, dispatch:React.Dispatch<TrackListAction>}>(TrackListContext)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setTrackTitle(`${e.target.value}`)
    }

    const findTrack = (e: React.FormEvent) => {
        e.preventDefault();

        axios.get(`/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                const track_list = res.data.message.body.track_list
                let nestedTracks: Track[] = [];
                for (let key of Object.keys(track_list)){
                    nestedTracks.push(track_list[key].track)
                }
                dispatch({
                    type: 'SEARCH_RESULTS',
                    payload: {
                        ...state,
                        tracks: nestedTracks,
                        heading: 'Search Results'
                    }
                })  
            })
            .catch(err => console.log(err))
    }

    return (
        <React.Fragment>
            <div className="card card-body mb-4 p-4">
                <h1 className="display-4 text-center">
                    <i className="fas fa-music" /> Search For A Song
                </h1>
                <p className="lead text-center">
                    Get the lyrics for any song
                </p>
                <form onSubmit={findTrack}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control form-control-lg" 
                            placeholder="Song title..."
                            name="trackTitle"
                            value={trackTitle}
                            onChange={onChange}
                        />
                    </div>
                    <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">
                        Get Track Lyrics
                    </button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default Search
