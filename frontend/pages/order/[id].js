import PropTypes from 'prop-types';
import SingleOrder from '../../components/SingleOrder';

export default function SingleOrderPage({ query }) {
  return <SingleOrder id={query.id} />;
}

SingleOrderPage.propTypes = {
  query: PropTypes.any,
};
