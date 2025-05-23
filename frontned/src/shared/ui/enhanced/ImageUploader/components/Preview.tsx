import { Button } from "@shared/ui/button";
import type { ImageProps } from "@shared/ui/enhanced/image";
import { Image } from "@shared/ui/enhanced/image";
import { X } from "lucide-react";
import type { FC } from "react";

type Props = Pick<ImageProps, "src"> & {
  onRemove: () => void;
};

const Preview: FC<Props> = ({ src, onRemove }) => {
  return (
    <div className="relative h-full">
      <div className="relative min-h-[200px] size-full overflow-hidden rounded-md border">
        <Image src={src} alt="Preview" fill className="object-contain" />
      </div>

      <Button
        type="button"
        variant="destructive"
        size="icon"
        className="absolute right-2 top-2"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export type { Props as PreviewProps };
export default Preview;
