import Link from "next/link";
import Image from "next/image";
import logoAsset from "../../../public/logo.png";

export function Logo({
  alt = "VTI",
  href = "/",
  width = logoAsset.width,
  height = logoAsset.height,
  priority = true,
  className = "group inline-flex items-center gap-3",
  imageClassName = "rounded-md object-contain",
}: {
  alt?: string;
  href?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <Link href={href} className={className}>
      <Image
        src={logoAsset}
        alt={alt}
        width={width}
        height={height}
        className={imageClassName}
        priority={priority}
        unoptimized
      />
    </Link>
  );
}
