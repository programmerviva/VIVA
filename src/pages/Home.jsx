import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService
      .getPosts()
      .then((response) => {
        if (response) {
          setPosts(response.documents || []);
        } else {
          setPosts([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setPosts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-700/50 rounded-xl h-64 w-full"></div>
                <div className="mt-4 space-y-3">
                  <div className="h-4 bg-gray-700/50 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-700/50 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8">
      <Container>
        {posts && posts.length > 0 ? (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 mx-auto space-y-4">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="break-inside-avoid mb-4 transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl"
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
            <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center">
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
            <h2 className="text-2xl font-bold text-white">No posts found</h2>
            <p className="text-gray-400 text-center max-w-md">
              First login here to get your posts.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Home;
