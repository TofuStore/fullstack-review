import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    {props.repos.map((repo) => {
      return (
        <>
          <a href={repo.link}>{repo.name}</a>
          <div>size: {repo.size}</div>
        </>
      )
    })}
    There are {props.repos.length} repos.
  </div>
)

export default RepoList;