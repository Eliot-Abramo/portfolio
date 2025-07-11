document.addEventListener("DOMContentLoaded",()=>{document.getElementById("year").textContent=new Date().getFullYear();
document.querySelectorAll(".repo-link").forEach(link=>{
  const repo=link.getAttribute("data-github");
  if(repo&&repo.includes("YOUR_GITHUB_USERNAME")===false){
    link.href=`https://github.com/${repo}`;
  }
});});
