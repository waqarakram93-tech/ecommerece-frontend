import { useParams } from 'react-router-dom';

const SinglePost = () => {
  const { id } = useParams();
  return <div>Single Post: {id}</div>;
};

export default SinglePost;
