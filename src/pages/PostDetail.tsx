import { FC, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

type Post = {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  author: string;
  date: string;
  content: string;
};

const API_URL = "https://blog-post-project-api.vercel.app/posts";

const PostDetail: FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      setIsLoading(true);
      setError("");
      try {
        // สมมติ API มี endpoint แบบนี้: /posts/:id
        const response = await axios.get(`${API_URL}/${postId}`);

        // แปลงวันที่ให้สวยงาม
        const formattedPost = {
          ...response.data,
          date: new Date(response.data.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
        };

        setPost(formattedPost);
      } catch (err) {
        setError("Failed to load post.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (isLoading) return <p>Loading post...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>No post found.</p>;

  return (
    <article className="max-w-3xl mx-auto p-6">
      <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">
        &larr; Back to articles
      </Link>

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-2">
        {post.author} &middot; {post.date} &middot; Category: {post.category}
      </p>
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-auto rounded-lg mb-6"
      />
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
};

export default PostDetail;
