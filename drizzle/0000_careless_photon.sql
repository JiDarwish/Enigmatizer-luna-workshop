CREATE TABLE IF NOT EXISTS "questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"question_text" text NOT NULL,
	"options" text[] NOT NULL,
	"correct_answer_index" integer NOT NULL,
	"answer_given_index" integer NOT NULL,
	"quiz_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quiz" (
	"id" serial PRIMARY KEY NOT NULL,
	"topic" varchar NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questions" ADD CONSTRAINT "questions_quiz_id_quiz_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
