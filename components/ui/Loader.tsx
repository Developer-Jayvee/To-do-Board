import { useSelector } from "react-redux";
import { ClockLoader } from "react-spinners";
import type { RootState } from "store";


export default function Loader() {
  const module = useSelector((state: RootState) => state.module);
  return (
    <div
      className={`${module.isLoading ? "" : "hidden"} absolute border bottom-0 top-0 right-0 left-0 z-99 bg-black/50 inset-0 flex justify-center items-center`}
    >
      <ClockLoader
        color="white"
        loading={module.isLoading}
        size={50}
        aria-label="Loading Spinner"
      />
    </div>
  );
}
