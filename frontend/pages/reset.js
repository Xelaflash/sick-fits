import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

// Here we are going to put the reset token in query params
export default function resetPage(props) {
  console.log(props);
  if (!props.query?.token) {
    return <RequestReset />;
  }
  return (
    <div>
      <Reset token={props.query.token} />
    </div>
  );
}

// if you are on at page level you can access query params (in url) via props
