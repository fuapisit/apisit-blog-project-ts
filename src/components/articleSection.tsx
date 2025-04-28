import { FC } from "react";

const ArticleSection: FC = () => {
  return (
    <section className="p-8 bg-white">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Latest Articles</h2>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-100 p-6 rounded-xl">
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

        <div className="w-full md:w-auto">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 rounded-lg border w-full md:w-[250px]"
          />
        </div>
      </div>
    </section>
  );
};

export default ArticleSection;

