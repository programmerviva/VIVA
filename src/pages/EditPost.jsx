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
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-700/50 rounded-lg w-1/3 mx-auto"></div>
              <div className="h-4 bg-gray-700/50 rounded-lg w-1/2 mx-auto"></div>
              <div className="h-[400px] bg-gray-700/50 rounded-2xl mt-8"></div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return post ? (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
              Edit Post
            </h1>
            <p className="text-gray-300/90 text-lg">
              Update your post details below
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-600/30">
            <PostForm post={post} />
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}

export default EditPost;
