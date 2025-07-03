import React, { useState } from "react";

// external libraries
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// libraries
import ImageService from "../features/images/services/ImageService";

// hooks
import useImages from "../features/images/hooks/useImages";
import useSearchText from "../features/images/hooks/useSearchText";
import useFile from "../features/images/hooks/useFile";

// Components
import UploadButton from "../features/images/components/UploadButton";
import ImagesList from "../features/images/components/ImagesList";

/**
 * Primary images component, displaying search bar, images list, and upload button.
 *
 * @returns images page
 */
const Images = () => {
  const queryClient = useQueryClient();

  const {
    data: imageResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["images"],
    queryFn: () => ImageService.getAllImages(),
  });

  const deletImageMutation = useMutation({
    mutationFn: (id: string) => ImageService.deleteImage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: (formData: FormData) => ImageService.uploadImage(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });

  const [open, setOpen] = useState(false);

  const { searchText, handleSearchChange } = useSearchText();
  const { filteredImages } = useImages({ imageResponse, searchText });
  const { handleFileChange, file } = useFile();

  if (isError) return <span>There was an unexpected error</span>;
  if (isLoading) return <div>Loading...</div>;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!file) {
      alert("Please select an image!");
      return;
    }
    const fd = new FormData();
    fd.append("image", file);

    try {
      uploadImageMutation.mutate(fd);
      setOpen(false);
    } catch {
      alert("Failed to upload image.");
    }
  };

  const imageDelete = (id: string) => {
    deletImageMutation.mutate(id);
  };

  return (
    <div className="h-screen mx-[10%] pb-[10rem]">
      {/* Search bar and upload button */}
      <div className="flex items-center w-full mt-[4rem] pb-10 justify-between">
        <input
          type="text"
          placeholder="Search images..."
          value={searchText}
          onChange={handleSearchChange}
          className="border rounded-[12px] px-[1rem] py-[0.8rem] border-[#dee2e6] w-[50%] h-[3.4rem] "
        />
        <UploadButton
          data-testid="upload-button"
          handleSubmit={handleSubmit}
          handleFileChange={handleFileChange}
          open={open}
          setOpen={setOpen}
        />
      </div>

      {/* Image List */}
      <ImagesList images={filteredImages} deleteFn={imageDelete} />
    </div>
  );
};

export default Images;
