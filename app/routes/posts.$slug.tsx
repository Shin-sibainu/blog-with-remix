import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { marked } from "marked";
import invariant from "tiny-invariant";

import { getPost } from "~/models/post.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.slug, "params.slug is required");

  const post = await getPost(params.slug);
  // return json({ slug: params.slug });
  invariant(post, `Post not found: ${params.slug}`);

  const html = marked(post.markdown);

  return json({ html, post });
};

export default function PostSlug() {
  const { html, post } = useLoaderData<typeof loader>();

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">
        {/* Some Post: {slug} */}
        {post.title}
      </h1>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </main>
  );
}
