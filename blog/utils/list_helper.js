const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favouriteBlog = (blogs) => {
  return blogs.reduce((prev, curr) => {
    return prev.likes > curr.likes ? prev : curr;
  }, {});
};

const mostBlogs = (blogs) => {
  const totals = {};
  blogs.forEach((blog) => {
    // If not been added yet, initialize and set value to 0
    if (!totals[`${blog.author}`]) totals[`${blog.author}`] = 0;
    // Add one
    totals[`${blog.author}`] += 1;
  });
  // Find {author, count} with highest blog count
  return Object.entries(totals).reduce((prev, next) => {
    const [author, blogs] = next;
    return prev.blogs > blogs ? prev : { author, blogs };
  }, {});
};

const mostLikes = (blogs) => {
  const totals = {};
  blogs.forEach((blog) => {
    // If not been added yet, initialize and set value to 0
    if (!totals[`${blog.author}`]) totals[`${blog.author}`] = 0;
    // Add amount of likes of current blog
    totals[`${blog.author}`] += blog.likes;
  });
  // Find {author, likes} with highest like count
  return Object.entries(totals).reduce((prev, next) => {
    const [author, likes] = next;
    return prev.likes > likes ? prev : { author, likes };
  }, {});
};

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes };
