import { call, put, fork, take, cancel, cancelled, select } from 'redux-saga/effects'
import { delay, takeEvery, eventChannel, END } from 'redux-saga'
import * as duck from './redux'
import RecordingsManager from './RecordingsManager'

navigator.getMedia = ( navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia)

const getMedia = (constraints) => new Promise((resolve, reject) => {
  navigator.getMedia(constraints, (s) => resolve(s), (err) => reject(err))
})

const mediaRecorderData = (mediaRecorder) => eventChannel(emit => {
  mediaRecorder.ondataavailable = (e) => emit(e.data)
  mediaRecorder.onstop = () => emit(END)
  return () => {}
})

function * bootstrapRecordings () {
  const recordings = yield call(RecordingsManager.getAll)
  yield put({
    type: duck.UPDATE_RECORDINGS_LIST,
    recordings
  })
}

function * updateTime () {
  let time = 0
  while (true) {
    yield call(delay, 1000)
    yield put({
      type: duck.UPDATE_RECORDING_TIME,
      time
    })
    time++
  }
}

function * record () {
  // RUTINA PRINCIPAL DE GRABADO

  let time = new Date().toString()

  // Start the saga that will update the time in the UI
  let timeUpdater = yield fork(updateTime)

  // Get stream and create a MediaRecorder
  const stream = yield call(getMedia, {audio: true})
  let mediaRecorder = new MediaRecorder(stream, {mimeType: 'audio/webm; codec=opus'}) // eslint-disable-line no-undef

  // Spin up the saga that will record the chunks
  // and eventually save them.
  const chunksGetter = yield fork(function * () {
    let chunks = []
    const mediaRecorderChannel = yield call(mediaRecorderData, mediaRecorder)
    try {
      while (true) {
        let e = yield take(mediaRecorderChannel)
        chunks.push(e)
      }
    }
    finally {
      if (yield cancelled()) {
        // The record stoped. Time to save the recording.
        // Did you hear? SAVE!!!!
        let blob = new Blob(chunks, {type: mediaRecorder.mimeType})
        let title = time.toString()
        let duration = yield select((state) => state.recorder.time)

        // Save
        const recording = yield call(RecordingsManager.saveRecording, {title, duration}, blob)

        // Add to current state
        yield put({
          type: duck.NEW_RECORDING,
          recording
        })
      }
    }
  })
  mediaRecorder.start()

  yield take(duck.STOP_RECORDING)
  mediaRecorder.stop()
  yield cancel(timeUpdater)
  yield cancel(chunksGetter)

  // Release the stream. If we don't do this, the browser will still
  // keep sending the data and the recording icon will still show
  // in the tab even after the recording stopped.
  stream.getTracks().forEach((streamTrack) => {
    streamTrack.stop()
  })
}

function * playerSaga () {
  let audio
  let playing = false
  while (true) {
    const action = yield take('*')
    switch (action.type) {
      case duck.PLAY:
        if (playing) {
          audio.pause()
        }
        audio = new Audio()
        const blob = yield call(RecordingsManager.getAudioForRecording, action.id)
        audio.src = window.URL.createObjectURL(blob)
        audio.play()
        playing = true
        break
      case duck.PAUSE:
        if (playing) {
          audio.pause()
          playing = false
        }
        break
      default:
    }
  }
}

function * deleteRecording (action) {
  console.log(action)
  const { id } = action
  yield call(RecordingsManager.deleteRecording, id)
}

export default function * () {
  yield [
    bootstrapRecordings(),
    takeEvery(duck.START_RECORDING, record),
    playerSaga(),
    takeEvery(duck.DELETE_RECORDING, deleteRecording)
  ]
}
