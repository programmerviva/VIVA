/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

function PostCard({ $id, title, featuredImage, authorName }) {
  return (
    <div className="group relative w-full bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <Link to={`/post/${$id}`}>
        {/* Image Container */}
        <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content Container */}
        <div className="p-5">
          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors duration-200">
            {title}
          </h2>

          {/* Author Info */}
          <div className="flex items-center text-sm text-gray-600">
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">{authorName || "Unknown User"}</span>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>
    </div>
  );
}

export default PostCard;
