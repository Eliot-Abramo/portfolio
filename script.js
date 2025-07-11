// Replace with your GitHub username
const username = "YOUR_GITHUB_USERNAME";

// Fetch and render public repositories
async function fetchRepos() {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    const data = await response.json();
    renderRepos(data);
  } catch (error) {
    console.error("Error fetching repos:", error);
  }
}

function renderRepos(repos) {
  const repoList = document.getElementById("repo-list");
  repoList.innerHTML = ""; // clear existing
  repos
    .filter(repo => !repo.fork) // exclude forks
    .sort((a, b) => b.stargazers_count - a.stargazers_count) // sort by stars
    .forEach(repo => {
      const div = document.createElement("div");
      div.className = "repo-card";
      div.innerHTML = `
        <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
        <p>${repo.description || ""}</p>
        <p><strong>⭐ ${repo.stargazers_count}</strong> | Updated ${new Date(repo.updated_at).toLocaleDateString()}</p>
      `;
      repoList.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  if (username !== "YOUR_GITHUB_USERNAME") {
    fetchRepos();
  }
});
