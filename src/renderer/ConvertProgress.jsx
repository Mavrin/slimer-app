import * as React from "react";
import { Card } from "antd";

export function ConvertProgress({ progress, openFile }) {
  const files = Object.entries(progress);
  if (!files.length) {
    return null;
  }

  return files.map(([path, value]) => {
    const { progress, error, success } = value;
    if (error) {
      return (
        <Card key={path}>
          <div key={path}>
            {path} - {error}
          </div>
        </Card>
      );
    }
    if (success) {
      return (
        <Card key={path}>
          <div onClick={() => openFile(path)} key={path}>
            {path} - done
          </div>
        </Card>
      );
    }
    return (
      <Card key={path}>
        <div>
          {path} - {progress}
        </div>
      </Card>
    );
  });
}
