import { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService
        .getPost(slug)
        .then((post) => {
          if (post) {
            setPosts(post);
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
          navigate("/");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="flex flex-col items-center space-y-3">
                <div className="h-8 bg-gray-700/50 rounded-lg w-48 md:w-64"></div>
                <div className="h-4 bg-gray-700/50 rounded-lg w-72 md:w-96"></div>
              </div>
              <div className="h-[500px] bg-gray-700/50 rounded-2xl backdrop-blur-lg border border-gray-600/20 shadow-xl"></div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return post ? (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 text-center space-y-3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4 animate-fade-in">
              Edit Post
            </h1>
            <p className="text-gray-300/90 text-lg md:text-xl font-medium">
              Update your post details below
            </p>
          </div>

          {/* Form Container */}
          <div
            className="bg-gray-800/40 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 lg:p-10 border border-gray-600/20 
            transform transition-all duration-300 hover:shadow-blue-500/10 hover:border-gray-500/30"
          >
            <PostForm post={post} />
          </div>

          {/* Back Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center justify-center mx-auto space-x-2 group"
            >
              <svg
                className="w-5 h-5 transform transition-transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Back to Posts</span>
            </button>
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}

export default EditPost;
