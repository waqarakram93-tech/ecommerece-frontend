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
import PostEditor from './PostEditor';

const CreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
    formState: { errors },
    reset,
    control
  } = useForm({ defaultValues });
  const { push } = useHistory();

  const onSubmit = async data => {
    try {
      setLoading(true);
      const {
        data: { _id }
      } = await axios.post(`${process.env.REACT_APP_BLOG_API}/posts`, data);
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
                </Form.Select>
                {errors.genre && <Alert variant='danger'>{errors.genre.message}</Alert>}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className='mb-3' controlId='cover'>
                <Form.Label>Cover</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Image cover'
                  {...register('cover', { required: 'An image is needed for the article' })}
                />
                {errors.cover && <Alert variant='danger'>{errors.cover.message}</Alert>}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className='mb-3' controlId='body'>
                <Form.Label>Content</Form.Label>
                <Controller
                  control={control}
                  name='body'
                  render={({ field: { onChange, value } }) => (
                    <PostEditor onChange={onChange} initialvalue={value} />
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
