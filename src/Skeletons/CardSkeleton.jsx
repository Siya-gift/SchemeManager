import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const CardSkeleton = ({ width = "w-24" }) => {
  return (
    <div className={`c_skeleton glass rounded-3xl px-4 py-1.5 border border-white ${width} `}>
      <SkeletonTheme
        baseColor="rgba(255, 255, 255, 0.1)"
        highlightColor="rgba(255, 255, 255, 0.65)"
      >
        <Skeleton borderRadius={150}/>
      </SkeletonTheme>
    </div>
  );
};

export default CardSkeleton;
