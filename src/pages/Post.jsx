import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService
        .getPost(slug)
        .then((post) => {
          if (post) setPost(post);
          else navigate("/");
        })
        .finally(() => setLoading(false));
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8">
        <Container>
          <div className="animate-pulse space-y-8">
            <div className="w-full h-[400px] bg-gray-700/50 rounded-2xl"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-700/50 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700/50 rounded w-full"></div>
              <div className="h-4 bg-gray-700/50 rounded w-2/3"></div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return post ? (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8">
      <Container>
        {/* Image Container with improved responsive design */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative rounded-2xl shadow-2xl overflow-hidden group">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full max-h-[600px] object-contain bg-gray-800/50 backdrop-blur-sm"
            />

            {/* Hover overlay for better image visibility */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Author Controls with improved positioning */}
            {isAuthor && (
              <div className="absolute right-4 top-4 space-x-3 flex">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button className="bg-green-500/90 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm hover:scale-105">
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
                    </span>
                  </Button>
                </Link>
                <Button
                  onClick={deletePost}
                  className="bg-red-500/90 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm hover:scale-105"
                >
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </span>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Content Container with improved typography */}
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="prose prose-lg prose-invert max-w-none prose-img:rounded-xl prose-a:text-orange-400">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
