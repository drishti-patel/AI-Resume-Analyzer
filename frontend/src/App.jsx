import { useState } from "react";
import API from "./services/api";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] =
    useState(null);
  const [jobDescription,
   setJobDescription] =
   useState("");
  const [matchScore,
   setMatchScore] =
   useState(null);
  const [missingSkills,
   setMissingSkills] =
   useState([]);
   const [files,
   setFiles] = useState([]);

  const [ranking,
   setRanking] = useState([]);
  const [feedback,
   setFeedback] =
   useState([]);
const uploadResume = async () => {
  console.log("Button clicked");

  console.log(file);

  const formData = new FormData();

  formData.append("file", file);

  try {
    const response = await API.post(
      "/upload",
      formData
    );

    console.log(response.data);

  setResult(
    response.data
  );
  } catch (error) {
    console.log(error);
  }
};
const analyzeResume =
async () => {

  const formData =
  new FormData();

  formData.append(
    "file",
    file
  );

  formData.append(
    "job_description",
    jobDescription
  );

  const response =
  await API.post(
    "/match",
    formData
  );
 console.log("Match score received:", response.data.match_score);
  setMatchScore(
  response.data.match_score
  );

  setMissingSkills(
  response.data.missing_skills
  );
  setFeedback(
  response.data.feedback
  );
  };
  const rankResumes =
async () => {

  const formData =
    new FormData();

  files.forEach(
    (file) => {

      formData.append(
        "files",
        file
      );
    }
  );

  formData.append(
    "job_description",
    jobDescription
  );

  const response =
    await API.post(
      "/rank",
      formData
    );

  setRanking(
    response.data.ranking
  );
};
return (
  <div className="min-h-screen bg-gray-100 p-8">
    <div className="max-w-4xl mx-auto">

      <h1 className="text-4xl font-bold text-center mb-8">
        AI Resume Analyzer
      </h1>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">

        <h2 className="text-xl font-semibold mb-4">
          Upload Resume
        </h2>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
          className="mb-4"
        />

        <button
          onClick={uploadResume}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload Resume
        </button>

      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">

        <h2 className="text-xl font-semibold mb-4">
          Job Description
        </h2>

        <textarea
          rows="8"
          value={jobDescription}
          placeholder="Paste Job Description Here..."
          onChange={(e) =>
            setJobDescription(
              e.target.value
            )
          }
          className="w-full border rounded p-3"
        />

        <button
          onClick={analyzeResume}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Analyze Resume
        </button>

      </div>

      {matchScore !== null && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">

          <h2 className="text-2xl font-bold mb-2">
            Match Score
          </h2>

          <p className="text-5xl font-bold text-green-600">
            {matchScore}%
          </p>

        </div>
      )}

      {result && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">

          <h2 className="text-2xl font-bold mb-4">
            Resume Details
          </h2>

          <p>
            <strong>Name:</strong> {result.name}
          </p>

          <p>
            <strong>Email:</strong> {result.email}
          </p>

          <p>
            <strong>Phone:</strong> {result.phone}
          </p>

          <div className="mt-4">

            <h3 className="font-semibold mb-2">
              Skills
            </h3>

            <div className="flex flex-wrap gap-2">

              {result.skills.map(
                (skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                )
              )}

            </div>
          <div className="bg-white rounded-xl shadow-md p-6 mt-6">

  <h2 className="text-2xl font-bold mb-4">
    Resume Ranking
  </h2>

  <input
    type="file"
    multiple
    accept=".pdf"

    onChange={(e) =>
      setFiles(
        [...e.target.files]
      )
    }
  />

  <button
    onClick={rankResumes}
    className="bg-purple-600 text-white px-4 py-2 rounded ml-4"
  >
    Rank Resumes
  </button>

</div>
{
ranking.length > 0 && (

<div className="bg-white rounded-xl shadow-md p-6 mt-6">

  <h2 className="text-2xl font-bold mb-4">
    Resume Rankings
  </h2>

  {
    ranking.map(
      (item, index) => (

      <div
        key={index}
        className="flex justify-between border-b py-2"
      >

        <span>
          #{index + 1}
          {" "}
          {item.filename}
        </span>

        <span>
          {item.score}%
        </span>

      </div>
    ))
  }

</div>

)}
          </div>

        </div>
      )}

      {missingSkills.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">

          <h2 className="text-2xl font-bold mb-4">
            Missing Skills
          </h2>

          <div className="flex flex-wrap gap-2">

            {missingSkills.map(
              (skill, index) => (
                <span
                  key={index}
                  className="bg-red-100 text-red-700 px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              )
            )}

          </div>

        </div>
      )}
     {
feedback.length > 0 && (

<div className="bg-white rounded-xl shadow-md p-6 mt-6">

  <h2 className="text-2xl font-bold mb-4">
    Feedback Suggestions
  </h2>

  <ul className="list-disc pl-6">

    {
      feedback.map(
        (item, index) => (

        <li
          key={index}
          className="mb-2"
        >
          {item}
        </li>
      ))
    }

  </ul>

</div>

)}
    </div>
  </div>
);
}

export default App;