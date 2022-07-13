import classnames, {
  animation,
  borderColor,
  borderRadius,
  borderWidth,
  display,
  height,
  overflow,
  padding,
  position,
  width,
} from 'classnames/tailwind'

const loader = classnames(
  position('relative'),
  display('block'),
  overflow('overflow-hidden'),
  width('w-14'),
  height('h-14')
)
const loaderDiv = classnames(
  height('h-full'),
  borderRadius('rounded-full'),
  padding('p-1'),
  borderWidth('border'),
  borderColor('border-transparent', 'border-t-accent', 'border-b-secondary'),
  animation('animate-rotate')
)

export default function () {
  return (
    <div className={loader}>
      <div className={loaderDiv}>
        <div className={loaderDiv}>
          <div className={loaderDiv}>
            <div className={loaderDiv}>
              <div className={loaderDiv}>
                <div className={loaderDiv}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
