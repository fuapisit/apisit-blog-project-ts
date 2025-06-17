import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaRegSmile } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";

type Post = {
  id: string;
  title: string;
  image: string;
  description: string;
  author: string;
  date: string;
  category: string;
  content: string;
};

export default function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // สมมติว่าไม่ได้ Login
  const [isLoggedIn] = useState(false);
  const [likeCount, setLikeCount] = useState(321); // ค่าเริ่มต้น mock
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (!postId) return;
    async function fetchPost() {
      try {
        const res = await axios.get(`https://blog-post-project-api.vercel.app/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        setError("ไม่สามารถโหลดบทความนี้ได้");
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [postId]);

  const handleLikeClick = () => {
    if (!isLoggedIn) {
      setShowLoginAlert(true);
      return;
    }
    setLikeCount((prev) => prev + 1);
  };

  const handleCopyLink = () => {
    if (!post) return;
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 3000);
    });
  };

  const shareUrls = {
    facebook: `https://www.facebook.com/share.php?u=${encodeURIComponent(window.location.href)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
    twitter: `https://www.twitter.com/share?&url=${encodeURIComponent(window.location.href)}`,
  };

  const handleShare = (platform: keyof typeof shareUrls) => {
    window.open(shareUrls[platform], "_blank", "noopener,noreferrer");
  };

  const handleCommentSend = () => {
    if (!isLoggedIn) {
      setShowLoginAlert(true);
      return;
    }
    alert("ส่งความคิดเห็น: " + commentText);
    setCommentText("");
  };

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
      <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: post.content }} />

      {/* Like + Copy + Share */}
      <div className="bg-[#f2f1ee] p-4 rounded-xl flex flex-wrap gap-4 items-center justify-between mb-10">
        <button
          onClick={handleLikeClick}
          className="flex items-center gap-2 px-6 py-3 border rounded-full text-black hover:bg-gray-100"
        >
          <FaRegSmile className="text-xl" />
          <span>{likeCount}</span>
        </button>

        <div className="flex gap-3 items-center">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-5 py-3 border rounded-full hover:bg-gray-100"
          >
            <FiCopy className="text-lg" />
            Copy
          </button>
          <button
            onClick={() => handleShare("facebook")}
            className="p-3 border rounded-full hover:bg-gray-100"
          >
            <FaFacebookF />
          </button>
          <button
            onClick={() => handleShare("linkedin")}
            className="p-3 border rounded-full hover:bg-gray-100"
          >
            <FaLinkedinIn />
          </button>
          <button
            onClick={() => handleShare("twitter")}
            className="p-3 border rounded-full hover:bg-gray-100"
          >
            <FaTwitter />
          </button>
        </div>
      </div>

      {/* Comment Section */}
      <div>
        <h2 className="text-xl font-bold mb-2">Comment</h2>
        <div className="border rounded-xl p-4 mb-10">
          <textarea
            className="w-full border-none resize-none outline-none text-gray-600 placeholder:text-gray-400"
            rows={4}
            placeholder="What are your thoughts?"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleCommentSend}
            className="bg-black text-white rounded-full px-6 py-3 hover:opacity-90"
          >
            Send
          </button>
        </div>
      </div>

      {/* Alert Dialog */}
      {showLoginAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center relative shadow-xl">
            {/* ปุ่มปิด */}
            <button
              onClick={() => setShowLoginAlert(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>

            {/* ข้อความหลัก */}
            <h2 className="text-2xl font-bold mb-6">Create an account to continue</h2>

            {/* ปุ่ม Create account */}
            <button
              className="bg-black text-white px-6 py-3 rounded-full font-medium mb-4 hover:opacity-90"
              onClick={() => alert("Redirect to Register Page")}
            >
              Create account
            </button>

            {/* ลิงก์ Log in */}
            <p className="text-gray-500 text-sm">
              Already have an account?{" "}
              <button
                className="underline font-medium text-black"
                onClick={() => alert("Redirect to Login Page")}
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      )}


      {/* Sonner แจ้ง Copy สำเร็จ */}
      {showCopySuccess && (
        <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded shadow-lg z-50">
          ลิงก์บทความถูกคัดลอกไปที่ Clipboard แล้ว
        </div>
      )}
    </div>
  );
}
