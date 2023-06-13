import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://ryoku.vercel.app',
      lastModified: new Date(),
    },
    {
      url: 'https://ryoku.vercel.app/login',
      lastModified: new Date(),
    },
    {
      url: 'https://ryoku.vercel.app/signup',
      lastModified: new Date(),
    },
  ];
}
