import * as React from "react";
import * as PropTypes from "prop-types";

export function Header({ step }) {
  if (step === 1) {
    return (
      <div className="step-1">
        <h1>Welcome to RubberApp</h1>
        <div className="description">
          Compress and prepare videos for the web
        </div>
      </div>
    );
  }
  if (step === 2) {
    return (
      <div className="step-2">
        <h1>Settings</h1>
      </div>
    );
  }
  return null;
}

Header.propTypes = {
  step: PropTypes.number
};
