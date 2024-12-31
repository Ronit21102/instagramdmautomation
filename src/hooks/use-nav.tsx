import { usePathname } from "next/navigation";

export const usePaths = () => {
  const pathname = usePathname(); // 1. Get the current URL path.
  const path = pathname.split("/"); // 2. Split the path into segments using '/' as a delimiter.
  let page = path[path.length - 1]; // 3. Extract the last segment of the path.
  return { page, pathname }; // 4. Return both the full path and the last segment.
};
