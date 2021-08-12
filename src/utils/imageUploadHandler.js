import axios from 'axios';

const imageUploadHandler = async (blobInfo, success, failure, progress) => {
  const formData = new FormData();
  formData.append('image', blobInfo.blob(), blobInfo.filename());
  const axiosConfig = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    onUploadProgress: ({ loaded, total }) => progress((loaded / total) * 100)
  };
  try {
    const {
      data: { location }
    } = await axios.post(`${process.env.REACT_APP_BLOG_API}/image-upload`, formData, axiosConfig);
    success(location);
  } catch (error) {
    if (error.response) {
      failure(error.response.data.error);
    } else {
      failure(error.message);
    }
  }
};

export default imageUploadHandler;
