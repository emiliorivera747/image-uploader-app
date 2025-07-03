import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";

import PrimarySubmitButton from "../../../components/buttons/PrimarySubmitButton";
import type { UploadButtonProps } from "../types/uploadImage";

/**
 *
 * Upload button with modal functionality
 *
 * @returns button
 */
const UploadButton = ({
  handleSubmit,
  handleFileChange,
  setOpen,
  open,
}: UploadButtonProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="h-[3.4rem] rounded-[12px] px-[1rem] py-[0.8rem] bg-[#212529] text-white flex items-row gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
        </div>
      </DialogTrigger>
      <DialogContent className="h-[50%] ">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
          <form
            onSubmit={handleSubmit}
            className=" h-full flex flex-col justify-between py-4 gap-10"
          >
            <input
              type="file"
              onChange={handleFileChange}
              className="border h-full w-full rounded-[12px] p-4"
            />
            <DialogTrigger>
              <PrimarySubmitButton className="w-full" />
            </DialogTrigger>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
