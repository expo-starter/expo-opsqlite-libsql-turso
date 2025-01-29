import { zodResolver } from "@hookform/resolvers/zod";
import { createInsertSchema } from "drizzle-zod";
import { Stack, useRouter } from "expo-router";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormTextarea,
} from "@/components/ui/form";

import { Text } from "@/components/ui/text";
import { cardTable } from "@/db/schema";
import { X } from "lucide-react-native";
import { useCreateCardMutation } from "@/db/queries";

const formSchema = createInsertSchema(cardTable, {
  question: (schema) =>
    schema.question.min(4, {
      message: "Please enter the memory card question.",
    }),
  answer: (schema) =>
    schema.answer.min(1, {
      message: "Please enter the memory card answer.",
    }),
});

export default function FormScreen() {
  const router = useRouter();

  const mutation = useCreateCardMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    try {
      await mutation.mutate({
        question: values.question,
        answer: values.answer,
      });
      router.back()
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <ScrollView
      contentContainerClassName="p-6 mx-auto w-full max-w-xl"
      showsVerticalScrollIndicator={true}
      className="bg-background"
      automaticallyAdjustContentInsets={false}
      contentInset={{ top: 12 }}
    >
      <Stack.Screen
        options={{
          headerShadowVisible: true,
          headerRight: () => <Pressable onPress={() => router.dismiss()}><X /></Pressable>
        }}
      />

      <Form {...form}>
        <View className="gap-8">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormTextarea
                label="Question"
                placeholder="Question"
                className="text-foreground"
                description="Enter the question"
                autoCapitalize="none"
                {...field}
              />
            )}
          />

          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormTextarea
                label="Answer"
                placeholder="Answer"
                description="Enter the answer"
                {...field}
              />
            )}
          />



          <Button onPress={form.handleSubmit(handleSubmit)}>
            <Text>Submit</Text>
          </Button>
          <View>
            <Button
              variant="ghost"
              onPress={() => {
                form.reset();
              }}
            >
              <Text>Clear</Text>
            </Button>
          </View>
        </View>
      </Form>
    </ScrollView>
  );
}
