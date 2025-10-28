import type { Photo } from "react-photo-album";

function imageLink(
  path: string,
  width: number,
  height: number,
  size: number,
  extension: string
) {
  return `https://images.react-photo-album.com/hiking/${path}.${width}x${height}.${size}w.${extension}`;
}


const photos = [
  {
    src: "image21.3b170653.2400x3200.jpg",
    alt: "A small creek in Yosemite National Park",
  },
].map(({ src, ...rest }) => {
  const matcher = src.match(/^(.*)\.(\d+)x(\d+)\.(.*)$/)!;

  const path = matcher[1];
  const width = Number.parseInt(matcher[2], 10);
  const height = Number.parseInt(matcher[3], 10);
  const extension = matcher[4];

  return {
    src: imageLink(path, width, height, width, extension),
    width,
    height,
    ...rest,
  } as Photo;
});

export default photos;
