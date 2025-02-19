import { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (userData) {
      appwriteService
        .getUserPosts(userData.$id)
        .then((response) => {
          if (response) {
            setPosts(response.documents);
          }
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          setPosts([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <Container>
          <div className="flex items-center justify-center">
            <div className="animate-pulse space-y-4">
              <div className="h-48 w-64 bg-gray-700 rounded-xl"></div>
              <div className="h-48 w-64 bg-gray-700 rounded-xl"></div>
              <div className="h-48 w-64 bg-gray-700 rounded-xl"></div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <Container>
        {posts.length > 0 ? (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 mx-auto space-y-4">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="break-inside-avoid mb-4 transform hover:-translate-y-1 transition-transform duration-200"
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">No posts yet</h1>
            <p className="text-gray-400 text-center max-w-md">
              Start sharing your thoughts with the community by creating your
              first post!
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
