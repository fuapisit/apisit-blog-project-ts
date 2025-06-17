import { FC, useEffect, useState, useCallback } from "react";
import axios from "axios";
import BlogCard from "../components/blogCard";
import { Search as SearchIcon } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";

type Post = {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  author: string;
  date: string;
  likes?: number;
  content?: string;
};

const categories = ["Highlight", "Cat", "Inspiration", "General"] as const;

const API_URL = "https://blog-post-project-api.vercel.app/posts";

const ArticleSection: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>("Highlight");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const formatDate = (isoDate: string): string => {
    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(isoDate).toLocaleDateString("en-GB", options);
  };

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const categoryParam = selectedCategory === "Highlight" ? undefined : selectedCategory;

      const response = await axios.get(API_URL, {
        params: {
          page,
          limit: 6,
          category: categoryParam,
          keyword: searchQuery || undefined,
        },
      });

      const newPosts: Post[] = response.data.posts.map((post: any) => ({
        ...post,
        date: formatDate(post.date),
      }));

      setPosts((prev) => (page === 1 ? newPosts : [...prev, ...newPosts]));
      setHasMore(response.data.currentPage < response.data.totalPages);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, selectedCategory, searchQuery]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleCategoryChange = (value: typeof categories[number]) => {
    if (value === selectedCategory) return;
    setSelectedCategory(value);
    setPage(1);
    setPosts([]);
    setHasMore(true);
  };

  // 🔍 Autocomplete dropdown search
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }

      try {
        const response = await axios.get(API_URL, {
          params: {
            keyword: searchQuery,
            page: 1,
            limit: 5,
          },
        });

        const results = response.data.posts.map((post: any) => ({
          ...post,
          date: formatDate(post.date),
        }));

        setSearchResults(results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) setPage((prev) => prev + 1);
  };

  return (
    <section className="p-8 bg-white">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Latest Articles</h2>

      {/* Filter + Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-100 p-6 rounded-xl mb-6 w-full">
        <div className="hidden md:flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="md:hidden w-full">
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full py-3 rounded-lg border text-gray-700">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 🔍 Search Box + Dropdown */}
        <div className="w-full md:w-auto relative">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 pr-10 rounded-lg border w-full md:w-[250px] focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />

          {/* 🔽 Autocomplete Dropdown */}
          {searchQuery.trim() !== "" && searchResults.length > 0 && (
            <ul className="absolute z-10 top-full mt-1 left-0 w-full bg-white rounded-lg shadow-lg border overflow-hidden">
              {searchResults.map((post) => (
                <li
                  key={post.id}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-left text-sm text-gray-800"
                  onClick={() => window.location.href = `/posts/${post.id}`} // หรือใช้ useNavigate
                >
                  {post.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <BlogCard
              key={post.id}
              id={post.id.toString()}
              image={post.image}
              category={post.category}
              title={post.title}
              description={post.description}
              author={post.author}
              date={post.date}
            />
          ))
        ) : isLoading ? (
          <p className="text-gray-500 col-span-full">Loading...</p>
        ) : (
          <p className="text-gray-500 col-span-full">No articles found.</p>
        )}
      </div>

      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="hover:text-muted-foreground font-medium underline"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "View more"}
          </button>
        </div>
      )}
    </section>
  );
};

export default ArticleSection;
