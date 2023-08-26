import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <p>Oops! Looks like you're lost.</p>
        <p>Sorry, the page you are looking for does not exist.</p>
        <button>
            <a href="/">Go back to homepage</a>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
