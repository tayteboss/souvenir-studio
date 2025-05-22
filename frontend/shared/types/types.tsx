export type MediaType = {
  media: {
    mediaType: "video" | "image";
    video: { asset: { playbackId: string } };
    image: { asset: { url: string; metadata: { lqip: string } }; alt: string };
    mobileImage?: { asset: { url: string; metadata: { lqip: string } } };
    mobileVideo?: { asset: { playbackId: string } };
    caption?: string;
  };
};

export type TransitionsType = {
  hidden: {
    opacity: number;
    transition: {
      duration: number;
    };
  };
  visible: {
    opacity: number;
    transition: {
      duration: number;
      delay?: number;
    };
  };
};

export type SlugType = {
  current: string;
};

export type ImageType = {
  asset: {
    url: string;
    metadata: {
      lqip: string;
      dimensions: {
        aspectRatio: number;
      };
    };
  };
  alt: string;
};
export type HomePageType = {
  seoTitle: string;
  seoDescription: string;
  title: string;
  instagramHandle: string;
  instagramUrl: string;
  email: string;
  informationSnippet: string;
  moreInformation: string;
  images: ImageType[];
};
