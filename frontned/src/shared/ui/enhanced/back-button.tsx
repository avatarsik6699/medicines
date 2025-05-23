import { Button } from "@shared/ui/button";
import { useRouter } from "@tanstack/react-router";
import { ChevronLeftIcon } from "lucide-react";
import type { FC } from "react";

const BackButton: FC = () => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => router.history.back()}
      className="w-fit"
    >
      <ChevronLeftIcon className="h-4 w-4" />
    </Button>
  );
};

export default BackButton;
