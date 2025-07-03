import type { ImageListProp } from "../types/images";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../../../components/ui/dialog";

/**
 *
 * Displays the list of all images
 *
 * @returns List of all images
 */
const ImagesList = ({ images, deleteFn }: ImageListProp) => {
  return (
    <section className="h-full">
      <h1 className="pb-6 text-2xl font-bold">{images?.length} Images</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {images?.map(({ filename, url, id }) => {
          return (
            <div key={filename} className="flex flex-col items-center relative">
              <Dialog>
                <DialogTrigger>
                  <div className="absolute h-10 w-10 rounded-full bg-black opacity-20 flex items-center justify-center right-4 top-4 hover:opacity-80">
                    <MenuSVG />
                  </div>
                </DialogTrigger>
                <DialogContent className="h-[25%] ">
                  <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogTrigger
                      className="w-full bg-red-700 text-white h-[3.4rem] rounded-[12px] flex gap-1 flex-row items-center justify-center"
                      onClick={() => deleteFn(id)}
                    >
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
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                      Delete Image
                    </DialogTrigger>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <img
                style={{ boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px" }}
                loading="lazy"
                src={url}
                className="rounded-[12px] object-cover w-full h-[22rem]"
              />
              <span className="text-[#343a40] flex items-center justify-center  pt-2 font-semibol">
                {filename}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ImagesList;

/**
 * Displays svg with three vertical dots
 *
 * @returns
 */
const MenuSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="white"
      className="size-7"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
      />
    </svg>
  );
};
