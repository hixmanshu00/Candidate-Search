import React, { useState } from "react";
import candidatesData from "../data/candidates.json";
import SavedCandidatesList from "./SavedCandidates";
import SearchResults from "./SearchResults";

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedJobRole, setSelectedJobRole] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [savedCandidates, setSavedCandidates] = useState([]);
  const [showResult, setshowResult] = useState(true);
  const jobRoles = [
    ...new Set(candidatesData.map((candidate) => candidate.jobRole)),
  ];
  const locations = [
    ...new Set(candidatesData.map((candidate) => candidate.location)),
  ];

  const handleSearch = () => {
    const filteredCandidates = candidatesData.filter(
      (candidate) =>
        (selectedJobRole === "" ||
          candidate.jobRole
            .toLowerCase()
            .includes(selectedJobRole.toLowerCase())) &&
        (selectedLocation === "" ||
          candidate.location
            .toLowerCase()
            .includes(selectedLocation.toLowerCase()))
    );
    setCandidates(filteredCandidates);
  };

  const handleSaveCandidate = (candidate) => {
    const isCandidate = savedCandidates.filter((Candidate)=>  Candidate.id === candidate.id)
    if(isCandidate.length===0){
    setSavedCandidates([...savedCandidates, candidate]);
  }
  candidate.saved= true   
    // if(candidate.saved==true){
    //   candidate.saved=false
    // }
  };

  const handleUnsaveCandidate = (candidate) => {
    const updatedSavedCandidates = savedCandidates.filter(
      (savedCandidate) => savedCandidate.id !== candidate.id
    );
    setSavedCandidates(updatedSavedCandidates);
    candidate.saved= false;
  };

  const handleSwitch = (e) => {
    console.log(e.target.id)
    if((e.target.id === 'search' && showResult === true) || (e.target.id  === 'saved' && showResult === false)){
      return
    }
    else{
    setshowResult(!showResult)
    }
    
  }

  return (
    <div className="container w-full mx-auto p-4 flex items-center content-center justify-around ">
      <div className="flex flex-col mb-4 shadow-xl p-16 rounded-xl ">
        <h2 className="text-2xl font-bold mb-4 text-center text-slate-900">
          Candidate Search
        </h2>
        <input
          type="text"
          className="border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Search by name, role, or location"
          onChange={(e) =>
            setCandidates(
              candidatesData.filter(
                (candidate) =>
                  candidate.name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()) ||
                  candidate.jobRole
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()) ||
                  candidate.location
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
              )
            )
          }
        />
                <h2 className="text-lg font-bold my-2 text-center text-gray-600">
          OR
        </h2>
        <div className="flex my-2">
          <select
            value={selectedJobRole}
            onChange={(e) => setSelectedJobRole(e.target.value)}
            className="border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">All Job Roles</option>
            {jobRoles.map((jobRole) => (
              <option key={jobRole} value={jobRole}>
                {jobRole}
              </option>
            ))}
          </select>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="border border-gray-300 rounded-r px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <button className="w-full mx-auto text-lg  rounded-md font-semibold my-6 py-3 px-6  " onClick={handleSearch}>
            Search
          </button>
      </div>
      <div className="shadow-xl p-12 pb-8 rounded-lg">
        <div className="tabs border-none outline-none ">
          <a className={`tab  text-2xl font-bold mb-2 ${showResult ? 'tab-active' : ''}`} id="search" onClick={handleSwitch}>
            Search Results
          </a>
          <a className={`tab  text-2xl font-bold mb-2 ${!showResult ? 'tab-active' : ''}`} id="saved" onClick={handleSwitch}>
            Saved
          </a>
        </div>
        {showResult ? (
          <SearchResults
            candidates={candidates}
            handleSaveCandidate={handleSaveCandidate}
            handleUnsaveCandidate = {handleUnsaveCandidate}
          />
        ) : (
          <SavedCandidatesList
            savedCandidates={savedCandidates}
            handleUnsaveCandidate={handleUnsaveCandidate}
          />
        )}
      </div>



    </div>
  );
};

export default CandidateSearch;
