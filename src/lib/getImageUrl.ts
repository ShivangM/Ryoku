import { storage } from '@/utils/appwrite';

const getImageUrl = async (image: Image) => {
  const url = storage.getFileView(image.bucketId, image.fileId);
  return url;
};

export default getImageUrl;
