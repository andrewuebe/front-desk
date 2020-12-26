import React from "react";

function Sources(props) {
  if (props.sources) {
    return (
      <div className="dvd-sources">
      {props.sources.map(function (source, idx) {
      return (
      <a key={idx} href={source.source_url}>{source.source_name}</a>
      );
    })}
    </div>
    );
  } else {
    return <div className="dvd-sources">No sources found.</div>;
  }
}

export default Sources;
