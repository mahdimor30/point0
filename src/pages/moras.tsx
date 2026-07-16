import { generalLayout } from "@/layouts/general";
import { Link } from "@/lib/navigation";
import { root } from "@/lib/root";

export default generalLayout
  .lets("page", "content", "/content")
  .head({
    title: "My App Forever!",
    titleTemplate: null,
  })
  .page(() => {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Welcome to My App!
          </h1>
          <p className="text-lg text-slate-700">
            This is a sample app built with Point0. You can use this as a
            starting point for your own app.
          </p>
        </div>
      </div>
    );
  });

export const morasPage = generalLayout
  .lets("page", "moras", "/moras")
  .page(() => {
    return <div>moras</div>;
  });

export const ideaPage = root
  .lets("page", "idea", "/ideas")
  .loader(async (ctx) => {
    return {
      idea: {
        id: 1,
        title: "ssssss",
      },
    };
  })
  .head(({ data: { idea } }) => {
    return {
      title: idea.title,
    };
  })
  .page( (props) => {
    return (
      <div>
        <h1>{props.data.idea.title}</h1>
      </div>
    );
  });
