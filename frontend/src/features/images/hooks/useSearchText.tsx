import { useState } from "react";

/**
 * 
 * Handle everything with search text
 *
 * @return the search text as well as search change handler
 */
const useSearchText = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchText(event.target.value);
  };

  return { handleSearchChange, searchText };
};

export default useSearchText;
