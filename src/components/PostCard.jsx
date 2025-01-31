import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

// $id appwrite syntax under the hood its = id property
function PostCard({ $id, title, featuredImage }) {
  PostCard.propTypes = {
    $id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    featuredImage: PropTypes.string.isRequired
  };

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
