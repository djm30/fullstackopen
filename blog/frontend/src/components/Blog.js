import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Blog = ({ blog }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/blogs/${blog.id}`)}
      className="bg-neutral-700 max-w-2xl grow w-full rounded-md px-5 py-5 shadow cursor-pointer hover:scale-105 transition-all"
    >
      <h4 className="text-lg">{blog.title}</h4>
      <p className="text-md">Author: {" " + blog.author}</p>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
