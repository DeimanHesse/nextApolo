import { Metadata } from "next";

type Props = {
  params: {
    id: string;
  };
};

async function getData(id: string) {
  //этот фетч дополнен next ом
  // const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  console.log("id", id);
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`,
    {
      next: {
        revalidate: 1,
      },
    }
  );
  //   console.log(response.json());
  return response.json();
}

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  return {
    title: id,
  };
}

export default async function Post({ params: { id } }: Props) {
  const post = await getData(id);
  console.log(post);

  return (
    <>
      <h1>{post.name}</h1>
      <h1>{post.status}</h1>
    </>
  );
}
