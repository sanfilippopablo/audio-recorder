import localForage from 'localforage'

let audios = localForage.createInstance({name: 'audios'})

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
    // Get ID
    const id = recordings.map(r => r.id).reduce((a, b) => Math.max(a, b), 0) + 1
    console.log(id)
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

export function deleteRecording (id) {
  return Promise.all([
    audios.removeItem(id),
    localForage.getItem('recordings', (recordings) => {
      return localForage.setItem('recordings', recordings.filter((r) => r.id !== id))
    })
  ]).then(() => {return})
}

export default {
  getAll,
  getAudioForRecording,
  saveRecording
}
