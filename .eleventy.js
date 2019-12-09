

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/lib");
};

module.exports = {
  dir: {
    input: "src",
    output: "dist"
  }
};
