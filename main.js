const showData = () => {
  event.preventDefault();

  var username = document.getElementById("username").value;
  var mainURL = `https://api.github.com/users/${username}`;
  var repoURL = `https://api.github.com/users/${username}/repos`;

  axios.get(mainURL).then(response => {
    document.getElementById("invalidUsername").innerHTML = "";
    document.getElementById("cardProfile").innerHTML = `
      <div class="card">
        <div class="row g-0">
          <div class="col-sm-5 col-lg-4 d-flex flex-column justify-content-center align-items-center p-3">
            <img src="${response.data.avatar_url}" class="img-fluid rounded" alt="profilePhoto">
            <h6 class="mt-3 mb-0 text-break text-center">${response.data.name}</h6>
            <small class="mb-3 mt-0 text-break text-muted">@${response.data.login}</small>
          </div>
          <div class="col-sm-7 col-lg-8">
            <div class="card-body d-flex flex-column justify-content-around h-100">
              <ul class="list-group mb-3">
                <li class="list-group-item">Total repos: ${response.data.public_repos}</li>
                <li class="list-group-item">Total gists: ${response.data.public_gists}</li>
                <li class="list-group-item">Followers: ${response.data.followers}</li>
                <li class="list-group-item">Following: ${response.data.following}</li>
              </ul>
              <a href="${response.data.html_url}" class="btn btn-primary" target="_blank">Go to profile</a>
            </div>
          </div>
        </div>
      </div>
    `;
  })
  .catch(err => {
    document.getElementById("invalidUsername").innerHTML = "Enter valid username!";
    document.getElementById("cardProfile").innerHTML = "";
    document.getElementById("tableRepos").innerHTML = "";
  }).then(
    axios.get(repoURL).then(response =>{
      let datas = "";
      response.data.map(values => {
        datas += `
          <tr>
            <td class="align-middle">${values.name} <small class="text-muted">(${values.language})</small></td>
            <td class="align-middle text-end">
              <a href="${values.html_url}" target="_blank" class="btn btn-outline-success m-1">Go to repo</a>
              <a href="${values.html_url}/archive/refs/heads/${values.default_branch}.zip" target="_blank" class="btn btn-success m-1">Download</a>
            </td>
          </tr>
        `;
      })
  
      document.getElementById("tableRepos").innerHTML = `
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Repo name</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            ${datas}
          </tbody>
        </table>
      `;
    })
    .catch(err => {
      document.getElementById("tableRepos").innerHTML = "";
    }) 
  )
}

document.getElementById("searchBtn").addEventListener("click", showData);