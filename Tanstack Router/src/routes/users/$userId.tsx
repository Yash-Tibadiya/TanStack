import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchUser, type User } from "../../api/users";

export const Route = createFileRoute("/users/$userId")({
  loader: async ({ params: { userId } }) => {
    // throw new Error();
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    return fetchUser(userId);
  },
  component: RouteComponent,
  pendingComponent: () => <div className="p-10">Loading...</div>,
  errorComponent: () => (
    <div className="p-10">There was an error fetching data..</div>
  ),
});

function RouteComponent() {
  const { data }: { data: User } = Route.useLoaderData();

  return (
    <div className="p-10">
      <h2 className="text-4xl font-bold mb-2">User Details</h2>
      <div className="flex mb-4">
        <div className="mr-3">
          <img key={data.avatar} src={data.avatar} />
        </div>
        <div className="flex flex-col">
          <span>
            {data.first_name} {data.last_name}
          </span>
          <span>{data.email}</span>
        </div>
      </div>
      <Link to="/users" search={{ page: 2 }}>
        Back to user List
      </Link>
    </div>
  );
}
