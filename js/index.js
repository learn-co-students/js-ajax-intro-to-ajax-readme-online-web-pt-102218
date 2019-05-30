// your code here
function showRepositories() {
    let response = JSON.parse(this.responseText)
    
    const repoList = `<ul>${response.map(r =>
        '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`;



    document.getElementById('repositories').innerHTML = repoList;
  }

function getRepositories() {
    const req = new XMLHttpRequest();
    req.addEventListener('load', showRepositories);
    req.open("GET",  'https://api.github.com/users/msherman0801/repos')
    req.send();
}


function getCommits(el) {
    const repo = el.dataset.repo;
    const req = new XMLHttpRequest();
    req.addEventListener('load', showCommits);
    req.open("GET", `https://api.github.com/repos/msherman0801/${repo}/commits`)
    req.send();
}

function showCommits() {
    const response = JSON.parse(this.responseText);
    const commitList = `<ul>${response.map(commit => commit.commit.message).join('')}</ul>`
    document.getElementById('commits').innerHTML = commitList;
}