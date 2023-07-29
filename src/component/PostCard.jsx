import PropTypes from 'prop-types';

import CardBody from "./home/post_card/CardBody";
import CardFooter from "./home/post_card/CardFooter";
import CardHeader from "./home/post_card/CardHeader";
import Comments from './home/Comments';
import InputComment from "./home/InputComment";


const PostCard = ({ post, theme }) => {
  return (
    <div className="card my-3 outer-shadow">
      <CardHeader post={post} />
      <CardBody post={post} theme={theme} />
      <CardFooter post={post} />

      <Comments post={post} />
      <InputComment post={post} />
    </div>
  );
};


PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  theme: PropTypes.bool.isRequired,
};
export default PostCard
