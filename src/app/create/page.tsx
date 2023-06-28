import { Metadata } from "next";
import CreateForm from "./CreateForm";

export const metadata: Metadata = {
  title: "Create New Post | Complex blog",
  description: "The best create a new post for you blog",
};

export default function createPost() {
  return (
    <div className="h-screen w-screen grid content-center gap-4 justify-center items-center">
      <h1>I am Creating form</h1>
      <CreateForm />
    </div>
  );
}
