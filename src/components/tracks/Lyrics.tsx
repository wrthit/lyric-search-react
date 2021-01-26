import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Track } from '../../types/Track'
import Moment from "react-moment"


const Lyrics: React.FC = () => {
    const [track, setTrack] = useState<Track>()
    const [lyrics, setLyrics] = useState<string>('')
    const { id } = useParams<{id: string}>()

    useEffect(() => {
        const lyricsRequest = axios.get(`/track.lyrics.get?track_id=${id}&apikey=${process.env.REACT_APP_MM_KEY}`)
        const trackRequest = axios.get(`/track.get?track_id=${id}&apikey=${process.env.REACT_APP_MM_KEY}`)
        
        axios.all([lyricsRequest, trackRequest])
            .then(axios.spread((lyricsResponse, trackResponse) => {
                setLyrics(lyricsResponse.data.message.body.lyrics.lyrics_body)
                setTrack(trackResponse.data.message.body.track)
            }))
            .catch(err => console.log(err))
    }, [id])
    
    if (track === undefined || lyrics === undefined) {
        return <span>Loading...</span>
    } else {
        return (
            <React.Fragment>
                <Link to="/" className="btn btn-dark btn-sm mb-4">
                    Go Back
                </Link>
                <div className="card">
                    <h5 className="card-header">
                        {track.track_name} by{" "}
                        <span className="text-secondary">{track.artist_name}</span>
                    </h5>
                    <div className="card-body">
                        <p className="card-text">{lyrics}</p>
                    </div>
                </div>

                <ul className="list-group mt-3">
                    <li className="list-group-item">
                        <strong>Album ID</strong>: {track.album_id}
                    </li>
                    <li className="list-group-item">
                        <strong>Explicit Words</strong>:{" "}
                        {track.explicit === 0 ? "No" : "Yes"}
                    </li>
                    <li className="list-group-item">
                        <strong>Release Date</strong>:{" "}
                        <Moment format="MM/DD/YYYY">
                        {track.first_release_date}
                        </Moment>
                    </li>
                </ul>
            </React.Fragment>
        )
    } 
}

export default Lyrics
