import { useState, Fragment } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image';
import PostEditor from './PostEditor';

const CreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const defaultValues = {
    title: '',
    genre: '',
    cover: '',
    author: 'Jorge Paul',
    body: ''
  };
  const {
    register,
    handleSubmit,
    formState,
    reset,
    control,
    setValue,
    setError: formError
  } = useForm({ defaultValues });
  const { errors } = formState;

  const { push } = useHistory();

  const onSubmit = async data => {
    try {
      setLoading(true);
      const {
        data: { _id }
      } = await axios.post(`${process.env.REACT_APP_BLOG_API}/posts`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setLoading(false);
      reset();
      push(`/post/${_id}`);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setTimeout(() => setError(null), 3000);
        setLoading(false);
      } else {
        setError('Network error');
        setTimeout(() => setError(null), 3000);
        setLoading(false);
      }
    }
  };

  const uploadPicture = async e => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const {
        data: { location }
      } = await axios.post(`${process.env.REACT_APP_BLOG_API}/image-upload`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setPreview(location);
      setValue('cover', location);
    } catch (error) {
      if (error.response) {
        formError('cover', { type: 'manual', message: error.response.data.error });
      } else {
        formError('cover', { type: 'manual', message: error.message });
      }
    }
  };

  if (loading) return <Spinner animation='border' variant='primary' />;
  return (
    <Fragment>
      <Col>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>{error && <Alert variant='danger'>{error}</Alert>}</Row>
          <Row>
            <Col>
              <Form.Group className='mb-3' controlId='title'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Title'
                  {...register('title', { required: 'Title is required' })}
                />
                {errors.title && <Alert variant='danger'>{errors.title.message}</Alert>}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3' controlId='genre'>
                <Form.Label>Category</Form.Label>
                <Form.Select {...register('genre', { required: 'Please select a genre' })}>
                  <option value='fantasy'>Fantasy</option>
                  <option value='sci-fi'>Sci-Fi</option>
                  <option value='history'>History</option>
                  <option value='sports'>Sports</option>
                  <option value='tv/movies'>TV/Movies</option>
                  <option value='code'>Code</option>
                </Form.Select>
                {errors.genre && <Alert variant='danger'>{errors.genre.message}</Alert>}
              </Form.Group>
            </Col>
          </Row>
          <Row className='align-items-center'>
            <Col>
              <Form.Group className='mb-3' controlId='coverSelect'>
                <Form.Label>Cover</Form.Label>
                <Form.Control type='file' onChange={uploadPicture} />
                {errors.cover && <Alert variant='danger'>{errors.cover.message}</Alert>}
              </Form.Group>
              <Form.Group className='mb-3' controlId='cover'>
                <Form.Label>Cover</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Banner image'
                  {...register('cover', { required: 'Cover is required' })}
                />
                {errors.cover && <Alert variant='danger'>{errors.cover.message}</Alert>}
              </Form.Group>
            </Col>
            <Col>
              <Image
                src={
                  preview ||
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png'
                }
                style={{ height: '5rem' }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className='mb-3' controlId='body'>
                <Form.Label>Content</Form.Label>
                <Controller
                  control={control}
                  name='body'
                  rules={{ required: 'An article cannot be empty' }}
                  render={({ field: { onChange, value } }) => (
                    <PostEditor onChange={onChange} value={value} />
                  )}
                />
                {errors.body && <Alert variant='danger'>{errors.body.message}</Alert>}
              </Form.Group>
            </Col>
          </Row>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Col>
    </Fragment>
  );
};

export default CreatePost;
