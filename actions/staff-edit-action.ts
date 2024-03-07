"use server";

import { ActionError, adminAction } from "@/lib/safe-action";
import { editStaff, getStaff } from "@/lib/staff";
import { z } from "zod";

const schema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  role: z.string(),
  image: z.string(),
  questions: z.array(
    z.object({
      id: z.string().uuid().optional(),
      question: z.string(),
      answer: z.string(),
    }),
  ),
});

const staffEditAction = adminAction(
  schema,
  async ({ id, name, description, role, image, questions }) => {
    questions = questions.map((q) => ({
      id: q.id,
      question: q.question.trim(),
      answer: q.answer.trim(),
    }));
    const staff = await getStaff(id);

    if (!staff) throw new ActionError("Staff not found");

    const result = await editStaff(id, {
      name,
      description,
      role,
      image,
      questions: {
        upsert: questions.map(({ id, question, answer }) => ({
          where: {
            id: id || "",
          },
          update: { question, answer },
          create: { question, answer },
        })),
      },
    });

    if (!result) throw new ActionError("Staff not edited");

    return true;
  },
);

export default staffEditAction;
