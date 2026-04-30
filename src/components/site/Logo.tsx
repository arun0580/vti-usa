import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-3">
      <Image
        src="/logo.png"
        alt=""
        width={180}
        height={60}
        className=" rounded-md object-contain"
        priority
      />
    </Link>
  );
}
