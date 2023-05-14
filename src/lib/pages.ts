import BlogPage from "@/pages/blog/[filename]";

const fs = require("fs");

export function getPageData(slug) {
  const fullPath = path.join("/", `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the id
  return {
    slug,
    ...matterResult.data,
  };
}

export function getAllPageSlugs() {
  const slugs = fs.readdirSync("/");

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return slugs.map((slug) => {
    return {
      params: {
        id: slug.replace(/\.md$/, ""),
      },
    };
  });
}
