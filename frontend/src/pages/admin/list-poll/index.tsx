import React from "react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/router";

const MyCardComponent = ({
  imageSrc,
  title,
  description,
  startTime,
  endTime,
  onClick,
}: any) => {
  return (
    <div
      onClick={onClick}
      className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700">
      <img
        className="w-full h-36 object-cover object-center"
        src={imageSrc}
        alt="Card image"
      />

      <div className="p-5">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
          {title}
        </h2>

        <p className="font-normal text-gray-700 dark:text-gray-400 mb-3">
          {description}
        </p>
        <div className="flex justify-between">
          <Badge
            color="gray"
            variant="default"
            className="text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
            starts at {startTime}
          </Badge>
          <Badge
            color="gray"
            variant="default"
            className="text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
            ends at {endTime}
          </Badge>
        </div>
      </div>
    </div>
  );
};

const ballots = [
  {
    ballotName: "India Voting",
    votingType: "abcd",
    startTime: "10/12/2023",
    endTime: "10/12/2023",
    candidates: [
      { partyName: "BJP", candidateName: "Narendra Modi" },
      { partyName: "Congress", candidateName: "Rahul Gandhi" },
    ],
  },
];

export default function ArchivesPage() {
  return <Content title="Archives" />;
}
interface ContentProps {
  title: string;
}

export function Content(props: ContentProps) {
  const router = useRouter();
  return (
    <div className="flex flex-wrap">
      <div className="w-full rounded-3xl bg-gray-800 p-6">
        <div className="mb-8 flex items-center justify-between text-white">
          <p className="text-2xl font-bold">View Polls</p>
          <p className="">{new Date().toLocaleDateString()}</p>
        </div>
        <div className="flex flex-wrap items-center justify-between pb-8">
          {/* <div className="flex flex-wrap text-white">
            <div className="pr-10">
              <div className="text-2xl font-bold">45</div>
              <div className="">In Progress</div>
            </div>
            <div className="pr-10">
              <div className="text-2xl font-bold">24</div>
              <div className="">Upcoming</div>
            </div>
            <div>
              <div className="text-2xl font-bold">62</div>
              <div className="">Total Projects</div>
            </div>
          </div> */}

          <div className="mt-4 flex items-center md:mt-0">
            <button className="bg-transparent text-white" title="List View">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
            <button
              className="ml-2 bg-gray-700 p-2 text-white"
              title="Grid View">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>
          </div>
        </div>
        {ballots.map((ballot, index) => (
          <MyCardComponent
            key={index}
            onClick={() => router.push("/admin/list-poll/1")}
            imageSrc="https://via.placeholder.com/150"
            title={ballot.ballotName}
            description={ballot.candidates
              .map((obj) => obj.partyName)
              .join(", ")}
            startTime={ballot.startTime}
            endTime={ballot.endTime}
          />
        ))}
      </div>
    </div>
  );
}
