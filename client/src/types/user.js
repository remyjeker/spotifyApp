export type Images = {
  height: any,
  url: string,
  width: any
};

export type UserImages = Array<Images>;

export type User = {
  country: string,
  display_name: string,
  email: string,
  external_urls: Array<any>,
  followers: any,
  href: string,
  id: string,
  images: UserImages,
  product: string,
  type: string,
  uri: string
} | null;
