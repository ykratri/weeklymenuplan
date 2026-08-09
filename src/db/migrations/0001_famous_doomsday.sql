ALTER TABLE "recipes" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "reference_box" ADD COLUMN "user_id" uuid NOT NULL;