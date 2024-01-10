import Image from "next/image"
import Link from 'next/link'

export default function TeamSection() {
  const teamMembers = [
    {
      name: 'Elmer Howard',
      role: 'Chief Executive Officer, Co-Founder',
      image: '/images/team/team-01.jpg',
    },
    {
      name: 'Addie Mann',
      role: 'Co-Founder, Chief Idea Officer',
      image: '/images/team/team-02.jpg',
    },
    {
      name: 'Phillip Hawkins',
      role: 'Chief Product Officer',
      image: '/images/team/team-03.jpg',
    },
    {
      name: 'Sallie Chapman',
      role: 'Chief Design Officer',
      image: '/images/team/team-04.jpg',
    },
  ]

  return (
    <div className="mb-16 text-center sm:mb-20 lg:mb-24">
      <h3 className="text-center font-butler text-2xl leading-tight text-secondary sm:text-3xl md:text-4.5xl lg:text-5xl">
        Our Creative Team
      </h3>
      <p className="pt-3 pb-12 font-hk text-secondary sm:pt-5 sm:pb-16 md:text-lg">
        Meet Our Stylish Heroes
      </p>
      <div className="flex flex-wrap justify-between sm:-mx-5 lg:-mx-3 xl:-mx-4">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="group relative mx-auto w-5/6 pb-10 sm:mx-0 sm:w-1/2 sm:px-5 lg:w-1/4 lg:px-3 lg:pb-0 xl:px-4">
            <div className="relative h-80 rounded bg-cover bg-center bg-no-repeat md:h-88 lg:h-68">
              <Image
                src={member.image}
                alt={`${member.name}'s profile`}
                className="object-cover"
                fill
                sizes="100vw" />
              <div className="bg-gradient-t-team group absolute inset-x-0 bottom-0 z-30 flex items-center justify-center bg-opacity-75 py-12 opacity-0 transition-opacity group-hover:opacity-100">
                <Link
                  href="https://www.google.com"
                  className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl text-v-blue-dark transition-colors hover:text-primary">
                  <i className="bx bxl-twitter"></i>
                </Link>
                <Link
                  href="https://www.google.com"
                  className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl text-v-blue-dark transition-colors hover:text-primary">
                  <i className="bx bxl-linkedin"></i>
                </Link>
                <Link
                  href="https://www.google.com"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl text-v-blue-dark transition-colors hover:text-primary">
                  <i className="bx bxl-facebook-square"></i>
                </Link>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-hk text-xl font-medium text-secondary transition-colors group-hover:text-primary md:text-2xl">
                {member.name}
              </h4>
              <p className="mt-1 font-hk text-base text-secondary">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
