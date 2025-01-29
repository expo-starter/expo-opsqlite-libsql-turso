import type React from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";

import type { CardSchemaType } from "@/db/schema";

type CardProps = {
  onRestore?: (cardId: string) => void;
  onDelete?: (cardId: string) => void;
} & CardSchemaType;

export const MemoryCard: React.FC<CardProps> = ({
  id,
  question,
  answer,
  archived,
  onRestore,
  onDelete,
}: CardProps) => {
  return (
    <Card className="rounded-2xl min-h-[200px]">
      <CardHeader>
        <View className="flex-row gap-4 items-center">
          <CardTitle>
            <View className="pb-2 flex flex-col gap-2 justify-center align-middle items-start w-full">
              <Badge variant="outline">
                <Text className="text-md">#{id}</Text>
              </Badge>
              <Text className="text-lg">{question}</Text>
            </View>
          </CardTitle>

        </View>

        <View className="flex-col">
          <CardDescription className="text-base font-semibold">
            {answer}
          </CardDescription>
        </View>
      </CardHeader>
      <CardContent />
      {/* <CardFooter className="flex-row justify-end gap-2 flex-1 ">
            <Button
              variant="ghost"
              className="text-destructive "
              onPress={() => onDelete?.(id)}
            >
              <Text className="text-destructive">Delete permanently</Text>
            </Button>
            <Button className="bg-pink-600" onPress={() => onRestore?.(id)}>
              <Text>Restore</Text>
            </Button>
          </CardFooter> */}
    </Card>
  );
};
