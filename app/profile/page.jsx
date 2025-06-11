'use client'
import React, { useState, Fragment } from 'react'; // Fragment might not be strictly needed here but good to have
import { FaStar, FaEye, FaCodeBranch, FaGithub, FaSpinner, FaExclamationCircle } from "react-icons/fa";
import Link from 'next/link';

const Profile = () => {
    const [username, setUsername] = useState("");
    const [repos, setRepos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searched, setSearched] = useState(false); // To know if a search has been attempted

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        if (error) setError(null); // Clear error when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username.trim()) {
            setError("Please enter a GitHub username.");
            setRepos([]);
            setSearched(true);
            return;
        }

        setIsLoading(true);
        setError(null);
        setRepos([]);
        setSearched(true);

        try {
            const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`); // Fetch 10 most recently updated
            if (res.ok) {
                const data = await res.json();
                if (data.length === 0) {
                    setError(`User "${username}" found, but has no public repositories.`);
                }
                setRepos(data);
            } else if (res.status === 404) {
                setError(`GitHub user "${username}" not found.`);
            } else {
                const errorData = await res.json().catch(() => ({ message: "An unknown error occurred." }));
                setError(`Failed to fetch repositories: ${errorData.message || res.statusText}`);
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setError("An error occurred while connecting to GitHub. Check your network.");
        } finally {
            setIsLoading(false);
        }
    };

    const renderRepoStats = (count, IconComponent, label) => ( // Renamed Icon to IconComponent to avoid conflict
        <div className="flex items-center text-sm text-gray-400" title={label}>
            <IconComponent className="mr-1.5" />
            <span>{count}</span>
        </div>
    );

    return (
        <div className='h-full flex flex-grow w-full bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 text-gray-100 sm:py-12'>
            <div className="container mx-auto px-4">
                <header className="text-center mb-8 sm:mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-2">
                        GitHub Repository Explorer
                    </h1>
                    <p className="text-lg text-gray-400">
                        Find and explore public repositories of any GitHub user.
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-10 sm:mb-12 flex">
                    <label htmlFor="github-username" className="sr-only">GitHub Username</label>
                    <input
                        id="github-username"
                        value={username}
                        onChange={handleUsernameChange}
                        className="flex-grow bg-gray-700 h-12 px-4 rounded-l-md text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-shadow"
                        placeholder="Enter GitHub Username (e.g., torvalds)"
                        type="search"
                        aria-describedby={error ? "error-message" : undefined}
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold h-12 px-6 rounded-r-md transition-colors flex items-center justify-center"
                    >
                        {isLoading ? <FaSpinner className="animate-spin mr-2" /> : 'Search'}
                    </button>
                </form>

                <div className="max-w-2xl mx-auto">
                    {isLoading && (
                        <div className="text-center py-10">
                            <FaSpinner className="animate-spin text-4xl text-blue-400 mx-auto" />
                            <p className="mt-3 text-lg text-gray-300">Fetching repositories...</p>
                        </div>
                    )}

                    {error && !isLoading && (
                        <div id="error-message" role="alert" className="bg-red-700/30 border border-red-600 text-red-300 px-6 py-4 rounded-md text-center flex items-center justify-center">
                            <FaExclamationCircle className="text-xl mr-3" />
                            <p>{error}</p>
                        </div>
                    )}

                    {!isLoading && !error && searched && repos.length === 0 && (
                        <div className="text-center py-10">
                            <FaGithub className="text-5xl text-gray-500 mx-auto mb-4" />
                            <p className="text-xl text-gray-400">
                                No public repositories found for <span className="font-semibold text-gray-200">{username}</span>.
                            </p>
                            <p className="text-gray-500">Or, the user might not have any public repositories.</p>
                        </div>
                    )}

                    {!isLoading && !error && repos.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-200 mb-4 pl-1">
                                Repositories for <span className="text-blue-400">{username}</span>:
                            </h2>
                            {repos.map((repo) => (
                                <Link
                                    className='block'
                                    key={repo.id}
                                    href={`/profile/${repo.name}/${username}`} // Assuming this route structure is desired
                                    // Or link to GitHub directly: href={repo.html_url} target="_blank" rel="noopener noreferrer"
                                >
                                    <div className="bg-gray-800 hover:bg-gray-700/70 border border-gray-700 rounded-lg p-5 shadow-lg transition-all duration-200 ease-in-out hover:shadow-blue-500/30">
                                        <div className="flex justify-between items-start">
                                            <h3 className='text-xl font-semibold text-blue-400 hover:underline mb-1.5 break-all'>
                                                {repo.name}
                                            </h3>
                                            {repo.language && (
                                                <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                                                    {repo.language}
                                                </span>
                                            )}
                                        </div>
                                        {repo.description && (
                                            <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                                                {repo.description}
                                            </p>
                                        )}
                                        <div className="flex items-center space-x-5 mt-auto pt-3 border-t border-gray-700/50">
                                            {renderRepoStats(repo.stargazers_count, FaStar, "Stars")}
                                            {renderRepoStats(repo.forks_count, FaCodeBranch, "Forks")}
                                            {renderRepoStats(repo.watchers_count, FaEye, "Watchers")}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {!isLoading && !error && !searched && (
                         <div className="text-center py-10">
                            <FaGithub className="text-6xl text-gray-600 mx-auto mb-6" />
                            <p className="text-xl text-gray-400">
                                Enter a GitHub username above to discover their public repositories.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile;