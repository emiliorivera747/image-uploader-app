export interface Image {
  id: string;
  filename: string;
  url: string;
}

export interface ImageListProp {
  images: Image[];
  deleteFn: (id: string) => void;
}

export interface UseImageProp {
  imageResponse: { data: Image[]; status: string };
  searchText: string;
}
