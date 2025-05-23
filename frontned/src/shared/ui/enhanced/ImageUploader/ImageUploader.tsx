import { useCallback, useEffect, useRef, useState, type FC } from "react";
import type { PreviewProps } from "./components/Preview";
import Preview from "./components/Preview";
import UploadArea from "./components/UploadArea";

type Props = {
  value?: File;
  onChange: (value: File | undefined) => void;
};

const ImageUploader: FC<Props> = (props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<PreviewProps["src"]>();

  useEffect(() => {
    let fileUrl: string | undefined;

    if (props.value) {
      fileUrl = URL.createObjectURL(props.value);

      setPreview(fileUrl);
    }

    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [props.value]);

  const onRemove = () => {
    setPreview(null);
    props.onChange(undefined);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onUplaod = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="flex flex-col gap-3 grow">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const [file] = e.target.files || [];

          if (file) {
            props.onChange(file);
          }

          // const reader = new FileReader();
          // // TODO: add error handling
          // // TODO: add file size limit
          // // TODO: add file type validation
          // reader.onloadend = () => {
          //   const result = reader.result;

          //   if (typeof result === "string") {
          //     setPreview(result);
          //     props.onChange(file);
          //   }
          // };

          // reader.readAsDataURL(file);
        }}
      />
      {preview ? (
        <Preview src={preview} onRemove={onRemove} />
      ) : (
        <UploadArea onUplaod={onUplaod} />
      )}
    </div>
  );
};

export default ImageUploader;
