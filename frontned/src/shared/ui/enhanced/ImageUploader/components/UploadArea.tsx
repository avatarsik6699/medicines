import { Upload } from "lucide-react";
import type { FC } from "react";

type Props = {
  onUplaod: () => void;
};

const UploadArea: FC<Props> = (props) => {
  return (
    <div
      className="
        flex flex-col items-center justify-center
        min-h-[200px] size-full
        cursor-pointer
        rounded-md border border-dashed
      "
      onClick={props.onUplaod}
    >
      <Upload className="h-10 w-10 text-muted-foreground" />
      <p className="mt-2 text-sm text-muted-foreground">
        Нажмите для загрузки изображения
      </p>
    </div>
  );
};

export default UploadArea;
