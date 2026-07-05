import { generalLayout } from "@/layouts/general.js";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { Link } from "@/lib/navigation";
import { root } from "@/lib/root";
import { log } from "@point0/core";
import { useState } from "react";
import z from "zod";

export const listUser = root.lets
  .query()
  .loader(async () => {
    const users = await db.query.users.findMany();
    console.log(users);

    return {
      users,
    };
  })
  .query();

export const addUser = root.lets
  .mutation()
  .input(
    z.object({
      name: z.string(),
    }),
  )
  .loader(async ({ input }) => {
    const newUser = await db.insert(users).values({
      name: input.name,
    });
    return {
      newUser,
      message: "new Uasr",
    };
  })
  .mutation({
    async onSuccess(data, variables, onMutateResult, context) {
      await listUser.invalidateQuery();
    },
  });

export default generalLayout
  .lets("page", "home", "/")
  .with(listUser)
  .head({
    title: "My App Forever!",
    titleTemplate: null,
  })
  .page(({ data }) => {
    const [user, setUser] = useState("");
    const { mutateAsync, isPending } = addUser.useMutation();
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Welcome to My App!
          </h1>
          {data?.users?.map((item) => (
            <p key={item.id}>{item.name}</p>
          ))}

          <button
            onClick={async () => {
              await mutateAsync({
                name: user,
              });
              setUser("");
            }}
          >
            {isPending ? "adding" : " add User"}
          </button>

          <input
            className="mx-10 p-3 h-10 border-gray-600 border"
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
            }}
          />
        </div>
      </div>
    );
  });
