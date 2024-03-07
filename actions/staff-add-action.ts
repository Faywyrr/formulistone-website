"use server";

import { ActionError, adminAction } from "@/lib/safe-action";
import { createStaff } from "@/lib/staff";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  description: z.string(),
  role: z.string(),
  image: z.string(),
  questions: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    }),
  ),
});

const staffAddAction = adminAction(
  schema,
  async ({ name, description, role, image, questions }) => {
    questions = questions.map((q) => ({
      question: q.question.trim(),
      answer: q.answer,
    }));

    const staff = await createStaff({
      name,
      description,
      role,
      image,
      questions: {
        create: questions,
      },
    });

    if (!staff) throw new ActionError("Staff not created");

    return true;
  },
);

export default staffAddAction;
