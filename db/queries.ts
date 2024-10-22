import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cardTable } from "./schema";
import { eq, desc } from "drizzle-orm";
import { db } from "./drizzle";

export const useGetCardsQuery = () => {
  const info = useQuery({
    queryKey: ["cards", "list"],
    queryFn: async () => {
      return db
        .select()
        .from(cardTable)
        .where(eq(cardTable.archived, false))
        .orderBy(desc(cardTable.createdAt));
    },
  });
  return info;
};

export const useCreateCardMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newCard: { question: string; answer: string }) => {
      const result = await db
        .insert(cardTable)
        .values({
          question: newCard.question,
          answer: newCard.answer,
          archived: false,
          createdAt: new Date().toISOString(),
        })
        .execute();

      console.log(result);
      return result;
    },
    onSuccess: () => {
      // Invalidate and refetch the habits list query
      queryClient.invalidateQueries({ queryKey: ["cards", "list"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
