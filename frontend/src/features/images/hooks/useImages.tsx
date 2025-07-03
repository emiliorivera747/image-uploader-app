import { useEffect, useState } from "react";
import type { Image } from "../types/images";

import type { UseImageProp } from "../types/images";

/**
 *
 * The hook gets both the filtered and unfiltered images
 *
 * @returns images and filteredImages
 */
const useImages = ({ imageResponse, searchText }: UseImageProp) => {
  const [images, setImages] = useState<Image[]>([]);
  const [filteredImages, setFilteredImages] = useState<Image[]>([]);

  useEffect(() => {
    if (imageResponse?.data) {
      setImages(imageResponse.data);
      setFilteredImages(imageResponse.data);
    }
  }, [imageResponse]);

  useEffect(() => {
    const filtered = images.filter((image: Image) =>
      image.filename.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredImages(filtered);
  }, [searchText, images]);

  return { images, filteredImages };
};

export default useImages;
