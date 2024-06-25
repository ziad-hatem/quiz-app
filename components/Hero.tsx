import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { PrismaClient } from "@prisma/client";
import { fetchUsers } from "@/app/(auth)/actions/fetchUsers";

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
const Hero = async () => {
  const user = await fetchUsers();
  const userEmail = user?.data.user.email;

  // Fetch the user's last quiz attempt time
  const dbUser = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  const now = new Date();

  return (
    <section className="relative w-full min-h-[500px] flex items-center justify-center text-center">
      <div className="px-4 md:px-6 max-w-[1500px] mx-auto w-[90%]">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-dark">
            Ready to take this française quiz?
          </h1>
          <p className="text-gray-600">Get ready to ace it.</p>
        </div>
        <div className="mt-6">
          <Link
            href={"/quiz"}
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-gray-50 shadow transition-colors duration-500 hover:bg-primary/80"
          >
            I'm ready
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
