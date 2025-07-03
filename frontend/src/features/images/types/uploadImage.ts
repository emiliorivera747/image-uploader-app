import type { Dispatch, SetStateAction } from 'react';

export interface UploadButtonProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}
