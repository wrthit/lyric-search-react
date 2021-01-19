import React from 'react';
import { TrackList } from './types/TrackList';

const TrackListContext = React.createContext<TrackList>({ tracks: [], heading: ''});

export const TrackListProvider = TrackListContext.Provider;

export default TrackListContext;


