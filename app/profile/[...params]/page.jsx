import React, { Suspense } from 'react';
import { FaStar, FaEye, FaCodeBranch, FaGithub, FaLink, FaFolder, FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import Link from 'next/link';
import { notFound } from 'next/navigation'; // For error handling

// Helper function to format dates
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// --- Data Fetching Functions ---
async function getRepoDetails(username, repoName) {
  const res = await fetch(`https://api.github.com/repos/${username}/${repoName}`, {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  });
  if (!res.ok) {
    if (res.status === 404) notFound(); // Triggers not-found.js
    throw new Error(`Failed to fetch repo details: ${res.statusText}`); // For other errors
  }
  return res.json();
}

async function getRepoDirectories(username, repoName) {
  const res = await fetch(`https://api.github.com/repos/${username}/${repoName}/contents`, {
    next: { revalidate: 60 }
  });
  if (!res.ok) return []; // Return empty array on error, or handle more gracefully
  const data = await res.json();
  return Array.isArray(data) ? data.filter(item => item.type === 'dir') : [];
}

async function getRepoLanguages(username, repoName) {
  const res = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`, {
    next: { revalidate: 60 }
  });
  if (!res.ok) return {}; // Return empty object on error
  return res.json();
}
// --- End Data Fetching Functions ---


// Function to calculate language percentages
const calculateLanguagePercentages = (languages) => {
    const totalBytes = Object.values(languages).reduce((acc, bytes) => acc + bytes, 0);
    if (totalBytes === 0) return {};

    const percentages = {};
    for (const [lang, bytes] of Object.entries(languages)) {
        percentages[lang] = ((bytes / totalBytes) * 100).toFixed(1);
    }
    return percentages;
};


const RepoPage = async ({ params }) => {
  // Assuming params.params is an array: [repoName, username]
  // This structure is a bit unusual for Next.js dynamic routes.
  // Typically, it would be params.repoName and params.username directly if your folder structure is like /profile/[username]/[repoName]/page.js
  // Adjust if your param structure is different.
  const repoName = params.params[0];
  const username = params.params[1];

  if (!repoName || !username) {
    notFound(); // If params are not as expected
  }

  // Fetch all data concurrently
  let repo, dirs, langs, langPercentages;
  try {
    [repo, dirs, langs] = await Promise.all([
      getRepoDetails(username, repoName),
      getRepoDirectories(username, repoName),
      getRepoLanguages(username, repoName),
    ]);
    langPercentages = calculateLanguagePercentages(langs);
  } catch (error) {
    console.error("Error fetching repository data:", error);
    // Depending on the error, you might want to call notFound() or show a generic error message
    // For now, if getRepoDetails threw (which calls notFound for 404), that will take precedence.
    // If other fetches fail, we might still render with partial data or an error state.
    // For simplicity, if repo failed, it would have called notFound.
    // If dirs or langs fail, we'll proceed with empty data for them.
    if (!repo) notFound(); // Should be handled by getRepoDetails, but as a safeguard
    dirs = dirs || [];
    langs = langs || {};
    langPercentages = calculateLanguagePercentages(langs);
  }


  const renderStat = (Icon, value, label) => (
    <div className="flex flex-col items-center text-center px-2">
      <Icon className="text-xl sm:text-2xl mb-1 text-blue-400" />
      <span className="text-sm sm:text-base font-semibold">{value}</span>
      <span className="text-xs text-gray-400">{label}</span>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-8 md:py-12 px-4">
      <div className="mb-8">
        <Link href={`/profile?search=${username}`} // Link back to the user's profile search result (adjust if needed)
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors group">
          <FaArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to <span className="font-semibold ml-1">{username}'s</span> Repositories
        </Link>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 sm:p-8 shadow-xl">
        {/* Header */}
        <div className="mb-6 pb-6 border-b border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 break-all">
              {repo.name}
            </h1>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-blue-500 text-blue-400 text-sm font-medium rounded-md hover:bg-blue-500 hover:text-gray-900 transition-colors flex-shrink-0"
            >
              <FaGithub className="mr-2" /> View on GitHub
            </a>
          </div>
          {repo.owner && (
            <p className="text-gray-400 mt-1 text-sm">
              Owned by <Link href={`/profile?search=${repo.owner.login}`} className="text-blue-400 hover:underline">{repo.owner.login}</Link>
            </p>
          )}
          {repo.description && (
            <p className="text-gray-300 mt-3 text-base">{repo.description}</p>
          )}
        </div>

        {/* Stats and Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Stats Bar */}
            <div className="col-span-1 md:col-span-2 bg-gray-700/50 p-4 rounded-md">
                <div className="flex justify-around items-center">
                    {renderStat(FaStar, repo.stargazers_count, "Stars")}
                    {renderStat(FaCodeBranch, repo.forks_count, "Forks")}
                    {renderStat(FaEye, repo.watchers_count, "Watchers")}
                    {/* `watchers_count` is often the same as `stargazers_count`. `subscribers_count` is for "Watch" notifications. */}
                </div>
            </div>

            {/* Dates */}
            <div className="bg-gray-700/50 p-4 rounded-md">
                <h3 className="text-lg font-semibold text-gray-200 mb-2 flex items-center"><FaCalendarAlt className="mr-2 text-purple-400"/>Dates</h3>
                <p className="text-sm text-gray-400">Created: <span className="text-gray-300">{formatDate(repo.created_at)}</span></p>
                <p className="text-sm text-gray-400">Last Updated: <span className="text-gray-300">{formatDate(repo.updated_at)}</span></p>
            </div>

            {/* Homepage Link */}
            {repo.homepage && (
            <div className="bg-gray-700/50 p-4 rounded-md">
                <h3 className="text-lg font-semibold text-gray-200 mb-2 flex items-center"><FaLink className="mr-2 text-purple-400"/>Homepage</h3>
                <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-all text-sm">
                    {repo.homepage}
                </a>
            </div>
            )}
        </div>


        {/* Languages */}
        {Object.keys(langs).length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">Languages Used</h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(langPercentages).sort(([,a],[,b]) => b-a).map(([lang, percentage]) => ( // Sort by percentage
                <div key={lang} className="bg-slate-700 text-gray-200 px-3 py-1.5 rounded-full text-sm font-medium shadow">
                  {lang} <span className="text-xs text-slate-400">({percentage}%)</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Directories */}
        {dirs.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">Root Directories</h2>
            <ul className="space-y-2">
              {dirs.map((dir) => (
                <li key={dir.sha} className="bg-gray-700/70 p-3 rounded-md hover:bg-gray-700 transition-colors">
                  <a
                    href={dir.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-300 hover:text-blue-200"
                  >
                    <FaFolder className="mr-3 text-yellow-500 flex-shrink-0" size={20}/>
                    <span className="truncate">{dir.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
         {dirs.length === 0 && Object.keys(langs).length === 0 && (
             <p className="text-center text-gray-500 py-4">No language data or root directories found for this repository.</p>
         )}
      </div>
    </div>
  );
};

export default RepoPage;