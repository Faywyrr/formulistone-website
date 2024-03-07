import { ModalContext } from "@/components/modal/ModalComponent";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import staffAddAction from "@/actions/staff-add-action";
import Resizer from "react-image-file-resizer";

export function resizeFile(image: File): Promise<string> {
  if (image.type === "image/svg+xml") {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.readAsDataURL(image);
    });
  }

  return new Promise((resolve) =>
    Resizer.imageFileResizer(
      image,
      200,
      200,
      "PNG",
      100,
      0,
      (uri) => {
        resolve(uri as string);
      },
      "base64",
    ),
  );
}

export default function StaffAddModal() {
  const router = useRouter();
  const { open, setOpen } = useContext(ModalContext);
  const [question, setQuestion] = useState(0);

  const { execute, result, status } = useAction(staffAddAction, {
    onSuccess: () => {
      setOpen(false);
      router.refresh();
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.currentTarget;
    const image = target.image.files[0];
    if (!image) return;

    const newImage = await resizeFile(image);

    execute({
      name: target.staffName.value,
      description: target.description.value,
      role: target.staffRole.value,
      image: newImage,
      questions: Array.from({ length: question }).map((_, i) => ({
        question: target[`question${i}`].value,
        answer: target[`answer${i}`].value,
      })),
    });
  };

  return (
    <>
      {(result.fetchError || result.serverError) && (
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{result.fetchError || result.serverError}</span>
        </div>
      )}

      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nom</span>
          </label>
          <input
            required
            type="text"
            className="input input-bordered"
            placeholder="Name"
            name="staffName"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input
            required
            type="text"
            className="input input-bordered"
            placeholder="Description"
            name="description"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Role</span>
          </label>
          <input
            required
            type="text"
            className="input input-bordered"
            placeholder="Role"
            name="staffRole"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Questions</span>
          </label>
          <div className="flex flex-row gap-2">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => setQuestion((q) => q + 1)}
            >
              +
            </button>
          </div>
        </div>

        {question > 0 &&
          Array.from({ length: question }).map((_, i) => (
            <div className="form-control" key={i}>
              <label className="label">
                <span className="label-text">Question {i + 1}</span>
              </label>
              <input
                required
                type="text"
                className="input input-bordered"
                placeholder="Question"
                name={`question${i}`}
              />
              <input
                required
                type="text"
                className="input input-bordered"
                placeholder="Réponse"
                name={`answer${i}`}
              />
            </div>
          ))}

        <div className="form-control">
          <label className="label">
            <span className="label-text">Image</span>
          </label>
          <input
            name="image"
            required
            type="file"
            accept="image/*"
            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          />
        </div>

        <div className="flex flex-row justify-end gap-2">
          {status === "executing" && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
          <button className="btn btn-primary">Créer</button>
        </div>
      </form>
    </>
  );
}
