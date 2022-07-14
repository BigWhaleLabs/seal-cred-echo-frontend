import { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import CreateTweetStore from 'stores/CreateTweetStore'
import handleError from 'helpers/handleError'
import parseErrorResponce from 'helpers/parseErrors'

export default function useProfile() {
  const { user } = useSnapshot(CreateTweetStore)

  const [bio, setBio] = useState(user?.bio || '')
  const [errorWithBio, setErrorWithBio] = useState<string>()
  const [loadingSave, setLoadingSave] = useState(false)
  const [success, setSuccess] = useState(false)
  const [bioIsValid, setBioIsValid] = useState(false)

  useEffect(() => {
    setBioIsValid(bio.length <= 255)
  }, [bio])

  const changeBio = async () => {
    setLoadingSave(true)
    try {
      if (!user || !UserStore.user) {
        throw new Error('User is not logged in')
      }
      setErrorWithBio(undefined)
      await api.changeBio(bio)
      UserStore.user.bio = bio
      setSuccess(true)
    } catch (error) {
      const {
        message,
        form: { bio: bioError },
      } = parseErrorResponce(
        error,
        'Error with bio, save it somewhere and try again'
      )

      setErrorWithBio(bioError || message)
    } finally {
      setLoadingSave(false)
    }
  }

  return {
    bio,
    setBio,
    loadingSave,
    errorWithBio,
    changeBio,
    bioIsValid,
    success,
    setSuccess,
  }
}
