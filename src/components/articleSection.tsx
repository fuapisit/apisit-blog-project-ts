import { FC, useState } from "react";
import BlogCard from "./blogCard";
import blogPosts from "../data/blogPosts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const categories = ["Highlight", "Cat", "Inspiration", "General"];

const ArticleSection: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Highlight");

  const filteredPosts =
    selectedCategory === "Highlight"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <section className="p-8 bg-white">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Latest Articles</h2>

      {/* Filter UI */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-100 p-6 rounded-xl mb-6">
        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-2">
          {categories.map((category) => {
            const isSelected = category === selectedCategory;

            return (
              <button
                key={category}
                disabled={isSelected}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-4 py-3 rounded-sm text-sm font-medium transition-colors
                  ${
                    isSelected
                      ? "bg-[#B0A88E] text-white cursor-not-allowed" // สีเข้ม + disabled
                      : "bg-[#DAD6D1] text-muted-foreground cursor-pointer hover:bg-[#E5E1D5]" // สีพื้น + hover อ่อนลง
                  }
                `}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Mobile Select */}
        <div className="md:hidden w-full">
          <Select
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
          >
            <SelectTrigger className="w-full py-3 rounded-sm text-muted-foreground">
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
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPosts.map((post) => (
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
