import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "./main";

const Optimistic = () => {
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch(
        "http://localhost:3000/posts?_sort=id&_order=desc"
      ).then((data) => data.json());
      return response;
    },
  });
  const { mutate, isError, isPending, variables } = useMutation({
    mutationFn: (newProduct) =>
      fetch("http://localhost:3000/posts", {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
          "content-type": "Application/json",
        },
      }),
    onSuccess: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = {
      id: Date.now(),
      title: e.target.elements.title.value,
    };
    mutate(post);
  };

  const handleRetry = (variables) => {
    mutate(variables);
  };

  return (
    <>
      <div className="p-4 flex gap-12">
        <div className="flex-1">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <input
              className="border mb-4 p-2"
              type="text"
              placeholder="Title"
              name="title"
            />
            <button
              className="border mb-4 p-2 bg-purple-500 text-white"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold mb-4">Posts:</h2>
          <ul>
            {isPending && (
              <li
                className="border-2 p-2 mb-4 font-semibold text-blue-500"
                key={variables.id}
              >
                {variables.title}
              </li>
            )}

            {isError && (
              <li
                className="border-2 p-2 mb-4 font-semibold flex justify-between"
                key={variables.id}
              >
                <span className="text-red-500">{variables.title}</span>
                <button
                  className="text-rose-800"
                  onClick={() => {
                    handleRetry(variables);
                  }}
                >
                  Retry
                </button>
              </li>
            )}

            {posts?.map((post) => {
              return (
                <li className="border-2 p-2 mb-4 font-semibold" key={post.id}>
                  {post.title}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Optimistic;
