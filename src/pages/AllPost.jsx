import { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import service, { account } from "../appwrite/config"; // account bhi import karein
import { Query } from "appwrite";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    account
      .get()
      .then((userData) => {
        return service.getPosts([Query.equal("userId", userData.$id)]);
      })
      .then((postsData) => {
        if (postsData) {
          setPosts(postsData.documents);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="w-full py-14">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/6">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
