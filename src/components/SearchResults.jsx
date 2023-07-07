import React from "react";

const SearchResults = ({
  candidates,
  handleSaveCandidate,
  handleUnsaveCandidate,
}) => {
  return (
    <div className="">
      {/* <h3 className="text-xl font-bold mb-2">Search Results:</h3> */}
      {candidates.length === 0 ? (
        <p className="p-4">No candidates found.</p>
      ) : (
        <ul className=" w-[500px]  rounded p-4">
          {candidates.map((candidate) => (
            <li key={candidate.id} className="mb-2">
              <div className="w-full flex items-center">
                <div className="flex-grow">
                  <p className="text-lg font-bold cursor-pointer hover:underline">
                    {candidate.name}
                  </p>
                  <p className="text-gray-600">{candidate.jobRole}</p>
                </div>
                <p className="text-gray-600">{candidate.location}</p>
                {!candidate.saved ? (
                  <button
                    className=" mx-auto   rounded-md font-semibold  py-2  px-4 ml-4"
                    onClick={() => handleSaveCandidate(candidate)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className=" mx-auto   rounded-md font-semibold  py-2  px-4 ml-4   border-indigo-600 border-2
                    bg-transparent text-indigo-600  "
                    onClick={() => handleUnsaveCandidate(candidate)}
                  >
                    Saved
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
