import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/new'>Create</Link>
      </li>
      <li>
        <Link to='/edit'>Edit</Link>
      </li>
    </ul>
  );
};

export default Navigation;
