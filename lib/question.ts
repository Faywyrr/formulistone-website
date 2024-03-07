import { PrismaQuestion } from "@/types/user";
import { Random } from "./random";

export function getQuestionByUserId(
  userId: string,
  questions: PrismaQuestion[],
) {
  const random = new Random(userId);
  const index = random.nextInt(0, questions.length - 1);
  const randomQuestion = questions[index];

  return randomQuestion;
}
