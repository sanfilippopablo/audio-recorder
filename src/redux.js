export const START_RECORDING = 'recorder/START_RECORDING'
export const STOP_RECORDING = 'recorder/STOP_RECORDING'
export const UPDATE_RECORDING_TIME = 'recorder/UPDATE_RECORDING_TIME'
export const GET_RECORDINGS = 'recorder/GET_RECORDINGS'
export const UPDATE_RECORDINGS_LIST = 'recorder/UPDATE_RECORDINGS_LIST'
export const NEW_RECORDING = 'recorder/NEW_RECORDING'
export const DELETE_RECORDING = 'recorder/DELETE_RECORDING'
export const PLAY = 'recorder/PLAY'
export const PAUSE = 'recorder/PAUSE'

export const actionCreators = {
  startRecording: () => ({type: START_RECORDING}),
  stopRecording: () => ({type: STOP_RECORDING}),
  play: (id) => ({type: PLAY, id}),
  pause: () => ({type: PAUSE}),
  deleteRecording: (id) => ({type: DELETE_RECORDING, id})
}

const initialState = {
  recordings: [],
  recorder: {
    recording: false,
    time: 0
  },
  player: {
    id: null,
    playing: false
  }
}
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case START_RECORDING:
      return {
        ...state,
        recorder: {
          recording: true,
          time: 0
        }
      }
    case STOP_RECORDING:
      return {
        ...state,
        recorder: {
          ...state.recorder,
          recording: false
        }
      }
    case UPDATE_RECORDING_TIME: {
      return {
        ...state,
        recorder: {
          ...state.recorder,
          time: action.time
        }
      }
    }
    case NEW_RECORDING:
      return {
        ...state,
        recordings: [action.recording, ...state.recordings]
      }
    case UPDATE_RECORDINGS_LIST:
      return {
        ...state,
        recordings: action.recordings
      }
    case DELETE_RECORDING:
      return {
        ...state,
        recordings: state.recordings.filter((r) => r.id !== action.id)
      }
  }
  return state
}
