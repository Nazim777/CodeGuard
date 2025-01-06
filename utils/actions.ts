"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteTest = async (testId: string) => {
  await prisma.testCase.delete({ where: { id: testId } });
  revalidatePath("/testsgen");
  return {success:true}
};

export const deleteReview = async (reviewId: string) => {
  await prisma.codeReview.delete({
    where: {
      id: reviewId,
    },
  });
  revalidatePath("/dashboard")
  return {success:true}
};
