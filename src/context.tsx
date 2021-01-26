import React, { Dispatch, useReducer } from 'react';
import { TrackList } from './types/TrackList';

const initialState: TrackList = {
    tracks: [], 
    heading: ''
}

export type TrackListAction = {
    type: string;
    payload: TrackList;
}

const TrackListContext = React.createContext<{state: TrackList, dispatch: Dispatch<TrackListAction>}>({
    state: initialState,
    dispatch: () => null
})

const TrackListReducer = (state: TrackList, action: TrackListAction) => {
    const { payload } = action
    console.log('in reducer')
    switch (action.type) {
        case "SEARCH_RESULTS": {
            return {
                ...state,
                tracks: payload.tracks,
                heading: 'Search Results'
            }
        }
        case "TOP_10": {
            return {
                ...state,
                tracks: payload.tracks,
                heading: 'Top 10 Results'
            }
        }
        default: 
            return state
    }
}

const TrackListProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(TrackListReducer, initialState)
    console.log('in provider')
    return (
        <TrackListContext.Provider value={{state, dispatch}}>
            {children}
        </TrackListContext.Provider>
    )
}

export { TrackListContext, TrackListProvider };


