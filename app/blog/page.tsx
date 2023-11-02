import Link from "next/link";
async function getData() {
  //этот фетч дополнен next ом
  // const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const response = await fetch("https://rickandmortyapi.com/api/character", {
    next: {
      revalidate: 60,
    },
  });
  return response.json();
}

export default async function Blog() {
  const posts = await getData();
  // console.log("characters", posts);

  return (
    <>
      <h1>Blog page</h1>
      {posts.results.map((post: any) => (
        <li key={post.id}>
          <Link href={`/blog/${post.id}`}>{post.name}</Link>
        </li>
      ))}
    </>
  );
}
