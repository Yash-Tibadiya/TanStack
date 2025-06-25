import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchUsers, type User } from "../../api/users";

export const Route = createFileRoute("/users/")({
  validateSearch: (search) => {
    return {
      page: search.page || 1,
    };
  },
  component: RouteComponent,
  loaderDeps: ({ search: { page } }) => page,
  loader: async ({ deps: page }) => fetchUsers(page),
});

function RouteComponent() {
  const { data } = Route.useLoaderData();
  return (
    <div className="p-10">
      <h2 className="text-4xl font-bold mb-2">User Listing</h2>
      <ul>
        {data.map((u: User) => (
          <li key={u.id} className="mb-2">
            <Link
              className="text-blue-500 hover:text-blue-700"
              to="/users/$userId"
              params={{ userId: u.id }}
            >
              {u.first_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
