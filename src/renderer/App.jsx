import React, { useCallback, useReducer } from "react";
import { AppLayout } from "./AppLayout";
import { ConvertProgress } from "./ConvertProgress";
import {
  initialState,
  appReducer,
  chooseFilesAction,
  chooseOutputDirAction,
  submit,
  reset,
  convert
} from "./appReducer";
import { Header } from "./Header";
import { UploadForm } from "./UploadForm";

export function App({ ffmpegService }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { step } = state;
  const onChooseFiles = useCallback(e => {
    dispatch(chooseFilesAction({ files: e.currentTarget.files }));
  }, []);
  const onChooseOutputDir = useCallback(e => {
    dispatch(chooseOutputDirAction({ path: e.currentTarget.files[0].path }));
  }, []);
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      convert({
        dispatch,
        ffmpegService,
        files: state.files,
        outputDir: state.outputDir
      });
    },
    [state.files, state.outputDir]
  );
  const onReset = useCallback(() => {
    dispatch(reset({}));
  }, []);

  const content =
    state.step !== 3 ? (
      <UploadForm
        step={step}
        onChooseFiles={onChooseFiles}
        onChooseOutputDir={onChooseOutputDir}
        onSubmit={onSubmit}
      />
    ) : (
      <>
        <div className="step-final">
          <ConvertProgress progress={state.convertProgress} />
          <button onClick={onReset} id="new" className="button" type="button">
            Convert more
          </button>
        </div>
        <div id="message" />
      </>
    );
  return <AppLayout content={content} header={<Header step={state.step} />} />;
}
