CREATE TABLE `cards` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`question` text NOT NULL,
	`answer` text NOT NULL,
	`archived` integer DEFAULT false,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP)
);
