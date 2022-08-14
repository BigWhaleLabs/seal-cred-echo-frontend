// const bottomContainer = classnames(
//   display('flex'),
//   justifyContent('justify-between'),
//   alignItems('items-center'),
//   flexWrap('flex-wrap')
// )

import { BodyText } from 'components/Text'

// const dropdownWrapper = classnames(
//   margin('md:mb-0', 'mb-4'),
//   display('flex'),
//   flexGrow('grow', 'md:grow-0')
// )

export default function () {
  return (
    <BodyText>Noice</BodyText>
    // <div className={space('space-y-2')}>
    //   <BodyText>Choose a ZK Badge</BodyText>
    //   <div className={bottomContainer}>
    //     <div className={dropdownWrapper}>
    //       <DropDown disabled={status.loading} />
    //     </div>
    //     <Button
    //       type="primary"
    //       loading={status.loading}
    //       disabled={!isValidForm}
    //       title="Tweet"
    //       onClick={async () => {
    //         if (isValidForm) {
    //           try {
    //             PostFormStore.status = {
    //               loading: true,
    //             }
    //             switch (currentPost.constructor) {
    //               case EmailPost:
    //                 await EmailProcessingPostsStore.createPost(
    //                   text,
    //                   currentPost.original
    //                 )
    //                 break
    //               case ERC721Post:
    //                 await ERC721ProcessingPostsStore.createPost(
    //                   text,
    //                   currentPost.original
    //                 )
    //                 break
    //               case ExternalERC721Post:
    //                 await ExternalERC721ProcessingPostsStore.createPost(
    //                   text,
    //                   currentPost.original
    //                 )
    //                 break
    //             }
    //           } catch (error) {
    //             PostFormStore.status.error = parseError(
    //               error,
    //               ErrorList.failedPost
    //             )
    //           } finally {
    //             PostFormStore.status.loading = false
    //           }
    //           onTextChange('')
    //         }
    //       }}
    //       center
    //     >
    //       Tweet
    //     </Button>
    //   </div>
    // </div>
  )
}
