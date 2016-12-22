import localForage from 'localforage'

let audios = localForage.createInstance({name: audios})

export function getAll () {
  return localForage.getItem('recordings').then((recordings) => {
    if (recordings === null) {
      return localForage.setItem('recordings', recordings).then((data) => {
        return []
      })
    } else {
      return recordings
    }
  })
}

export function getAudioForRecording (id) {
  return audios.getItem(id)
}

export function saveRecording (recording, audio) {
  return getAll().then(recordings => {
    console.log(recordings)
    // Get ID
    const id = recordings.map(r => r.id).reduce(Math.max, 0) + 1
    const rec = {
      ...recording,
      id
    }
    // Save audio
    return audios.setItem(id, audio).then(() => {
      // Save metadata to recordings
      return localForage.setItem('recordings', [
        ...recordings,
        rec
      ]).then(() => {
        return rec
      })
    })
  })
}

export default {
  getAll,
  getAudioForRecording,
  saveRecording
}
