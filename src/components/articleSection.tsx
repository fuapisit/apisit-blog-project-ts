import { FC } from "react";
import blogPosts from "../data/blogPosts";
import BlogCard from "../components/BlogCard";
import { Search as SearchIcon } from "lucide-react";

const ArticleSection: FC = () => {
  return (
    <section className="p-8 bg-white">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Latest Articles</h2>

      {/* Filter + Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-100 p-6 rounded-xl mb-6">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3">
          {["Highlight", "Cat", "Inspiration", "General"].map((category) => (
            <button
              key={category}
              className="bg-white px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200 transition"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="w-full md:w-auto relative">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 pr-10 rounded-lg border w-full md:w-[250px] focus:outline-none"
          />
          <SearchIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogPosts.map((post) => (
          <BlogCard
            key={post.id}
            image={post.image}
            category={post.category}
            title={post.title}
            description={post.description}
            author={post.author}
            date={post.date}
          />
        ))}
      </div>
    </section>
  );
};

export default ArticleSection;
