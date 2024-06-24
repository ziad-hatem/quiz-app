import Quiz from "@/components/Quiz";
import { client } from "@/sanity/lib/client";
import { fetchUsers } from "../(auth)/actions/fetchUsers";

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
  const userId = user?.data.user.id;
  return (
    <>
      <Quiz questions={questions} userId={userId} />
    </>
  );
};

export default page;
