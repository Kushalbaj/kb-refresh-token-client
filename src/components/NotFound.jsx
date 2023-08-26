import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found--content">
        <h1 className='not-found--heading'>404</h1>
        <p className='not-found--content-p'>Oops! Looks like you're lost.</p>
        <p className='not-found--content-p'>Sorry, the page you are looking for does not exist.</p>
        <button className='not-found--btn'>
            <a className='not-found--a' href="/">Go back to homepage</a>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
