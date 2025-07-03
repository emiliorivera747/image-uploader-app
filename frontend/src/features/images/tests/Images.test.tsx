import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

// External libraries
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Pages
import Images from "../../../pages/Images";

// Services
import ImageService from "../services/ImageService";

// Hooks
import useImages from "../hooks/useImages";
import useFile from "../hooks/useFile";
import useSearchText from "../hooks/useSearchText";

// Components
import UploadButton from "../components/UploadButton";


/**
 * mock dependencies
 */
jest.mock("../hooks/useImages");
jest.mock("../hooks/useSearchText");
jest.mock("../hooks/useFile");
jest.mock("../components/UploadButton", () => jest.fn());
jest.mock("../components/ImagesList", () => jest.fn());
jest.mock("../services/ImageService");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

/**
 * Rendering Images with ReactQuery
 */
const renderComponent = () => {
  queryClient.clear();
  render(
    <QueryClientProvider client={queryClient}>
      <Images />
    </QueryClientProvider>
  );
};

describe("Images page component", () => {
  const mockImages = [
    { id: "1", url: "image1", filename: "image1" },
    { id: "2", url: "image2", filename: "image2" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    (useSearchText as jest.Mock).mockReturnValue({
      searchText: "",
      handleSearchChange: jest.fn(),
    });

    (useFile as jest.Mock).mockReturnValue({
      file: null,
      handleFileChange: jest.fn(),
    });

    (useImages as jest.Mock).mockReturnValue({
      filteredImages: mockImages,
    });

    (UploadButton as jest.Mock).mockImplementation(({ setOpen }) => (
      <button data-testid="upload-button" onClick={() => setOpen(true)}>
        Upload
      </button>
    ));
  });

  test("renders error state", async () => {
    (ImageService.getAllImages as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch")
    );
    renderComponent();
    expect(
      await screen.findByText("There was an unexpected error")
    ).toBeInTheDocument();
  });

  test("renders loading state", () => {
    (ImageService.getAllImages as jest.Mock).mockReturnValue(
      new Promise(() => {})
    );
    renderComponent();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

//   test("renders images list, search bar, and upload button on success", async () => {
    
//     (ImageService.getAllImages as jest.Mock).mockImplementation(() =>
//       Promise.resolve({ data: mockImages })
//     );

//     (useImages as jest.Mock).mockReturnValue({
//       filteredImages: mockImages,
//     });

//     renderComponent();

//     await waitFor(() => {
//       expect(
//         screen.getByPlaceholderText("Search images...")
//       ).toBeInTheDocument();
//       expect(screen.getByTestId("upload-button")).toBeInTheDocument();
//       expect(screen.getByText("2 Images")).toBeInTheDocument();
//       expect(screen.getAllByRole("img")).toHaveLength(2);
//     });
//   }, 10000);
  
});
