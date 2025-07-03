import { useFormStatus } from "react-dom";
import type { SubmitButtonProps } from "../../types/buttons";

import DotLoader from "../loading/DotLoader";
import { cn } from "../../lib/utils";

/**
 *
 * Primary Submit button
 * 
 * @param param0
 * @returns
 */
const PrimarySubmitButton = ({
  text = "Submit",
  className,
  isLoading,
  ref,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  const defaultClass = `flex items-center justify-center w-full bg-gradient-to-r from-[#4c6ef5] to-[#4263eb] text-white px-[.94118rem] py-[1.05882rem] h-[3.2941176471rem] rounded-[12px] hover:bg-blue-700 hover:to-blue-700 transition duration-300`

  return (
    <button
      type="submit"
      className={cn(defaultClass, className)}
      disabled={pending || isLoading}
      ref={ref}
    >
      {pending || isLoading ? (
        <DotLoader
          bgColor="bg-blue-200"
          dotHeight="h-2"
          dotWidth="w-2"
          containerHeight="h-5"
        />
      ) : (
        text
      )}
    </button>
  );
};

export default PrimarySubmitButton;
