import { View, Pressable, RefreshControl } from "react-native";
import { useScrollToTop } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { Link, Stack } from "expo-router";
import * as React from "react";

import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Plus } from "@/components/Icons";
import { sqlite } from "@/db/drizzle";
import { useGetCardsQuery } from "@/db/queries";
import { useRefreshByUser } from "@/lib/hooks/use-refresh-by-user";
import { useRefreshOnFocus } from "@/lib/hooks/use-refresh-onfocus";
import { useQueryClient } from "@tanstack/react-query";
import type { CardSchemaType } from "@/db/schema";
import { MemoryCard } from "@/components/card";

export default function Home() {
  const queryClient = useQueryClient();
  const { data: habits, error, refetch } = useGetCardsQuery();

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  useRefreshOnFocus(refetch);

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const renderItem = React.useCallback(
    ({ item }: { item: CardSchemaType }) => <MemoryCard {...item} />,
    [],
  );

  const renderListEmptyComponent = React.useCallback(() => {
    return () => (
      <View>
        <Text className="text-lg">Hi There 👋</Text>
        <Text className="text-sm">
          This example use sql.js on Web and expo/sqlite on native
        </Text>
        <Text className="text-sm">
          If you change the schema, you need to run{" "}
          <Text className="text-sm font-mono text-muted-foreground bg-muted">
            bun db:generate
          </Text>
          <Text className="text-sm px-1">then</Text>
          <Text className="text-sm font-mono text-muted-foreground bg-muted">
            bun db:migrate
          </Text>
        </Text>
      </View>
    );
  }, []);

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-secondary/30">
        <Text className="text-destructive pb-2 ">Error Loading data</Text>
        <Text>{error.message}</Text>
      </View>
    );
  }
  return (
    <View className="flex flex-col basis-full bg-background  p-8">
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button
              variant={"ghost"}
              onPress={() => {
                sqlite.sync();
                queryClient.invalidateQueries({ queryKey: ["cards", "list"] });
                refetch()
              }}
            >
              <Text>Sync</Text>
            </Button>
          ),
        }}
      />
      <FlashList
        ref={ref}
        className="native:overflow-hidden rounded-t-lg"
        estimatedItemSize={200}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingByUser}
            onRefresh={refetchByUser}
          />
        }
        ListEmptyComponent={renderListEmptyComponent()}
        ItemSeparatorComponent={() => <View className="p-2" />}
        data={habits || []}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListFooterComponent={<View className="py-4" />}
      />
      <View className="absolute bottom-10 right-8">
        <Link href="/create" asChild>
          <Pressable>
            <View className="bg-primary justify-center rounded-full h-[45px] w-[45px]">
              <Plus className="text-background self-center" />
            </View>
          </Pressable>
        </Link>
      </View>

    </View>
  );
}
