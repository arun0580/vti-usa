export type GallerySegment = "K-12" | "Higher Ed" | "Corporate" | "Government";

export type GalleryInstallation = {
  id: string;
  segment: GallerySegment;
  title: string;
  location: string;
  imageSrc: string;
  imageAlt: string;
};

export type GalleryPageContent = {
  hero: {
    kicker: string;
    title: string;
    description: string;
  };
  cta: {
    title: string;
    subtitle: string;
    body: string;
    buttonLabel: string;
    buttonHref: string;
  };
  installations: GalleryInstallation[];
};
