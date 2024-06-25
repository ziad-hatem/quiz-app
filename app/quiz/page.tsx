import Quiz from "@/components/Quiz";
import { client } from "@/sanity/lib/client";
import { fetchUsers } from "../(auth)/actions/fetchUsers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

async function getData() {
  const query = `*[_type == "questions"]{
    question,
    answers,
    correctAnswer
  }`;

  const data = await client.fetch(query);

  // Shuffle the questions and select 10 random ones
  const shuffledData = data.sort(() => 0.5 - Math.random());
  const selectedQuestions = shuffledData.slice(0, 10);

  return selectedQuestions;
}

const page = async () => {
  const questions = await getData();
  const user = await fetchUsers();
  const userEmail = user?.data.user.email;

  if (!userEmail) {
    return <div>User email not found. Please log in.</div>;
  }

  return (
    <>
      <Quiz questions={questions} userId={user?.data.user.id} />
    </>
  );
};

export default page;
