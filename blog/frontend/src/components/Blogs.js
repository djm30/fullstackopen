import React from "react";
import Blog from "./Blog";

import { useDispatch, useSelector } from "react-redux";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div className="text-white text-md  mt-4 w-full flex flex-col justify-center grow">
      <div className=" flex justify-center w-full">
        <h4 className=" container lg:mx-80 text-3xl">Latest Blogs</h4>
      </div>

      <div className="blogs space-y-4 pt-10 flex flex-col items-center w-full">
        {blogs.map((blog) => (
          <Blog blog={blog} key={blog.id} />
        ))}
      </div>
    </div>
  );
};

Blogs.propTypes = {};

export default Blogs;
