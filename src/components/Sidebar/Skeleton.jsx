import ContentLoader from 'react-content-loader'

const Skeleton = (props) => {
  return (
    <ContentLoader 
    speed={2}
    width={350}
    height={124}
    viewBox="0 0 350 124"
    backgroundColor="#979595"
    foregroundColor="#ecebeb"
    {...props}
    >
      <circle cx="60" cy="50" r="25" />
      <rect x="34" y="83" rx="5" ry="5" width="50" height="10" />
      <rect x="547" y="222" rx="5" ry="5" width="220" height="10" />
      <rect x="82" y="150" rx="5" ry="5" width="220" height="10" />
      <circle cx="150" cy="50" r="25" />
      <rect x="124" y="83" rx="5" ry="5" width="50" height="10" />
      <circle cx="250" cy="50" r="25" />
      <rect x="224" y="83" rx="5" ry="5" width="50" height="10" />
    </ContentLoader>
  )
}
export default Skeleton;
