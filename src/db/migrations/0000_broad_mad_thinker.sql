CREATE TABLE "recipes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"ingredients" text[] DEFAULT '{}' NOT NULL,
	"source_link" text,
	"tags" text[] DEFAULT '{}' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reference_box" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"ingredients" text[] DEFAULT '{}' NOT NULL,
	"source_link" text,
	"tags" text[] DEFAULT '{}' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
