import PropTypes from 'prop-types';

export default function Page({ children }) {
  return (
    <div>
      <h2>Page component here!!</h2>
      {children}
    </div>
  );
}

// to validate the types of props
Page.propTypes = {
  children: PropTypes.any,
};
