import placeholder from "@app/assets/placeholder-small.png";
import { cn } from "@shared/utils";
import {
  type ComponentPropsWithoutRef,
  useLayoutEffect,
  useState,
} from "react";
import { Skeleton } from "../skeleton";

type OriginalImageProps = ComponentPropsWithoutRef<"img">;

type Props = Omit<OriginalImageProps, "src"> & {
  src?: string | null;
  fallbackSrc?: string;
  fill?: boolean;
  events?: {
    onLoadingComplete?: () => void;
  };
};

export const Image = ({
  src,
  alt = "",
  className,
  fallbackSrc = placeholder,
  events,
  fill = false,
  ...props
}: Props) => {
  const [safeSrc, setSafeSrc] = useState<string | undefined>();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  const handleLoad: OriginalImageProps["onLoad"] = () => {
    setStatus("success");
    events?.onLoadingComplete?.();
  };

  const handleError: OriginalImageProps["onError"] = () => {
    setStatus("error");

    // if (safeSrc !== fallbackSrc) {
    //   setSafeSrc(fallbackSrc);
    // }
  };

  useLayoutEffect(
    function setLatestSrcFx() {
      setSafeSrc(src || fallbackSrc);
    },
    [src, fallbackSrc],
  );

  return (
    <>
      <img
        {...props}
        src={safeSrc}
        alt={alt}
        className={cn(
          {
            "opacity-0 hidden": status === "loading",
            "size-full opacity-100": status === "success",
            "absolute inset-0 object-cover": fill,
          },
          className,
        )}
        onLoad={handleLoad}
        onError={handleError}
      />
      {status === "loading" && <Skeleton className="size-full" />}
    </>
  );
};

export type { Props as ImageProps };
