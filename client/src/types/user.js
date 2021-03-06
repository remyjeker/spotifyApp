export type Images = {
  height: any,
  url: string,
  width: any
};

export type UserImages = Array<Images>;

export type ExtUrls = {
  spotify: string
};

export type Followers = {
  total: number
};

export type User = {
  country: string,
  display_name: string,
  email: string,
  external_urls: ExtUrls,
  followers: Followers,
  href: string,
  id: string,
  images: UserImages,
  product: string,
  type: string,
  uri: string
} | null;
