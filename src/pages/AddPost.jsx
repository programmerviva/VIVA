import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div className="py-8 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
              Create New Post
            </h1>
            <p className="text-gray-300/90 text-lg">
              Share your thoughts with the community
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-600/30">
            <PostForm />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AddPost;
