import { useState } from "react";

export const usePages = () => {
  const [pages, setPages] = useState<string[]>([]);

  return { value: pages, set: setPages };
};
