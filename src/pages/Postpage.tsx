import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

type Post = {
  id: string;
  title: string;
  image: string;
  description: string;
  author: string;
  date: string;
  category: string;
  content: string; // ถ้า API ส่ง content เป็น HTML หรือ text
};

export default function PostPage() {
  const { postId } = useParams(); // 🔍 ดึง postId จาก URL
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!postId) return;

    async function fetchPost() {
      try {
        const res = await axios.get(`https://blog-post-project-api.vercel.app/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        setError('ไม่สามารถโหลดบทความนี้ได้');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [postId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!post) return <p>ไม่พบบทความ</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <img src={post.image} alt={post.title} className="w-full rounded-md mb-4" />
      <p className="text-gray-600 mb-2">
        <span>{post.category}</span> | <span>{post.author}</span> | <span>{post.date}</span>
      </p>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
