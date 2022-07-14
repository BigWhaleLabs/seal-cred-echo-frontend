import {
  alignItems,
  classnames,
  display,
  flexDirection,
  margin,
  space,
} from 'classnames/tailwind'
import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import TextArea from 'components/TextArea'
import useBreakpoints from 'hooks/useBreakpoints'

const sectionContainer = (stretchItems?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    alignItems(stretchItems ? 'items-stretch' : 'items-start')
  )
const childrenContainer = (stretchItems?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    alignItems(stretchItems ? 'items-stretch' : 'items-start'),
    space('space-y-2')
  )

const explanationContainer = classnames(margin('my-4'))
export default function () {
  const {
    handle,
    setHandle,
    isHandleValid,
    bio,
    setBio,
    loadingSave,
    loadingDownload,
    loadingDelete,
    changeBio,
    changeHandle,
    downloadUserData,
    dropUserData,
    errorWithHandle,
    errorWithBio,
    handleIsValid,
    bioIsValid,
    setSuccess,
    success,
  } = useCreateTweet()
  const navigate = useNavigate()
  const { xs, md } = useBreakpoints()

  return (
    <div>
      <div className={explanationContainer}></div>
      <div>
        <TextArea
          text={bio}
          placeholder="Write something here..."
          onTextChange={setBio}
          maxLength={280}
          disabled={loadingSave}
          footer={errorWithBio && <ErrorText>{errorWithBio}</ErrorText>}
        />
        {/* <Button
          loading={loadingSave}
          disabled={!bioIsValid || !handleIsValid}
          title="Save"
          onClick={() => {
            void changeBio()
            setSuccess(!errorWithBio && !errorWithHandle)
          }}
        /> */}
      </div>
    </div>
  )
}
