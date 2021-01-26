import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { TrackListContext } from '../../context';
import { Track } from '../../types/Track';
import Search from './Search';
import Tracks from './Tracks';

const TrackContainer: React.FC = () => {
    const { state, dispatch } = useContext(TrackListContext)
    
    useEffect(() => {
        axios.get(`/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                const track_list = res.data.message.body.track_list;
                let nestedTracks: Track[] = [];
                for (let key of Object.keys(track_list)){
                    nestedTracks.push(track_list[key].track)
                }
                dispatch({
                            type: 'TOP_10',
                            payload: {
                                ...state,
                                tracks: nestedTracks,
                                heading: 'Top 10 Tracks'
                            }
                        })   
            })
            .catch(err => console.log(err))
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <React.Fragment>
            <Search />
            <Tracks />
        </React.Fragment>
    )
};

export default TrackContainer
