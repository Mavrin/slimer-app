import React from "react";
export function ConvertProgress({ progress }) {
  const files = Object.entries(progress);
  if (!files.length) {
    return null;
  }
  return files.map(([path, value]) => {
    const { progress, error, success } = value;
    if (error) {
      return (
        <div key={path}>
          {path} - {error}
        </div>
      );
    }
    if (success) {
      return <div key={path}>{path} - done</div>;
    }
    return (
      <div key={path}>
        {path} - {progress}
      </div>
    );
  });
}
