import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const NotFound = () => {
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => history.push('/'), 3000);
  }, [history]);

  return (
    <Col md={4}>
      <Row className='flex-column align-items-center'>
        <div>You'll be redirected to the start page in 3 seconds</div>
        <img
          src='https://camo.githubusercontent.com/2515d63ed9f010c45188fb16aa813f67c886fcb713f8395964abcbd22bd791ef/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f41394563427a64367438445a652f67697068792e676966'
          alt='Are you lost?'
        />
      </Row>
    </Col>
  );
};

export default NotFound;
