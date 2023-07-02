import { Post } from "@/lib/types";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";


export default function Card({ post }: { post: Post }) {

 function truncateString(str: string, len: number) {
   if (str.length <= len) {
     return str;
   }

   let truncated = str.slice(0, len);
   truncated = truncated.slice(0, truncated.lastIndexOf(" "));
   truncated += "...";

   return truncated;
 }

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {post.title}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {truncateString(post.content, 50)}
      </p>
      <div className="flex items-center justify-between">
      <Link
        href={`/posts/${post._id}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Read more
        <svg
          aria-hidden="true"
          className="w-4 h-4 ml-2 -mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </Link>
      {post.published ? <Badge variant={'default'}>published</Badge> : <Badge variant={'destructive'}>unpubished</Badge>}
        </div>
    </div>
  );
}