import React from 'react'

const SavedCandidatesList = ({ savedCandidates, handleUnsaveCandidate }) => {
    return (
      <>
        {/* <h3 className="text-xl font-bold mt-4 mb-2">Saved Candidates:</h3> */}
        {savedCandidates.length === 0 ? (
          <p className='p-4'>No candidates saved.</p>
        ) : (
          <ul className=" w-[500px] border-gray-300 rounded p-4   ">
            {savedCandidates.map(candidate => (
              <li key={candidate.id} className="mb-2">
                <div className="flex items-center">
                  <div className="flex-grow">
                    <p className="text-lg font-bold cursor-pointer hover:underline">{candidate.name}</p>
                    <p className="text-gray-600">{candidate.jobRole}</p>
                  </div>
                  <p className="text-gray-600">{candidate.location}</p>
                  <button
                    className="bg-slate-900 mx-auto   rounded-md font-semibold  py-2 text-white px-4 ml-4  hover:text-indigo-400"
                    onClick={() => handleUnsaveCandidate(candidate)}
                  >
                    remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }

export default SavedCandidatesList
