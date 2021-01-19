import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TrackListProvider } from '../../context';
import { Track } from '../../types/Track';
import { TrackList } from '../../types/TrackList';
import Tracks from './Tracks';

const TrackContainer: React.FC = () => {
    const [trackList, setTrackList] = useState<TrackList>({
        tracks: [],
        heading: 'Top 10 Tracks'
    });

    useEffect(() => {
        axios.get(`/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                const track_list = res.data.message.body.track_list;
                let nestedTracks: Track[] = [];
                for (let key of Object.keys(track_list)){
                    nestedTracks.push(track_list[key].track)
                }
                setTrackList({tracks:nestedTracks, heading:'Top 10 Tracks'});
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <TrackListProvider value={trackList}>
            <React.Fragment>
                <Tracks />
            </React.Fragment>
        </TrackListProvider>
    )
};

export default TrackContainer;
