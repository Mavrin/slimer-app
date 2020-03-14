import * as React from "react";
import * as PropTypes from "prop-types";
import electron from "electron";
import "./app.css";
import { AppLayout } from "./AppLayout";
import { ConvertProgress } from "./ConvertProgress";
import {
  initialState,
  appReducer,
  chooseFilesAction,
  chooseOutputDirAction,
  reset,
  convert
} from "./appReducer";
import { Header } from "./Header";
import { UploadForm } from "./UploadForm";

const { useCallback, useReducer } = React;

export function App({ ffmpegService, fileService }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { step, files = [], outputDir } = state;
  const onChooseFiles = useCallback(() => {
    electron.remote.dialog
      .showOpenDialog({ properties: ["openFile", "multiSelections"] })
      .then(data => {
        dispatch(
          chooseFilesAction({
            files: fileService.getFilesInfo({ paths: data.filePaths })
          })
        );
      });
    //dispatch(chooseFilesAction({ files: e.currentTarget.files }));
  }, []);
  const onChooseOutputDir = useCallback(() => {
    electron.remote.dialog
      .showOpenDialog({ properties: ["openDirectory"] })
      .then(data => {
        dispatch(chooseOutputDirAction({ path: data.filePaths[0] }));
      });
    // dispatch(chooseOutputDirAction({ path: e.currentTarget.files[0].path }));
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
        selectedFiles={files}
        outputDir={outputDir}
        onChooseFiles={onChooseFiles}
        onChooseOutputDir={onChooseOutputDir}
        onSubmit={onSubmit}
      />
    ) : (
      <>
        <div className="step-final">
          <ConvertProgress
            openFile={fileService.openFile}
            progress={state.convertProgress}
          />
          <button onClick={onReset} id="new" className="button" type="button">
            Convert more
          </button>
        </div>
        <div id="message" />
      </>
    );
  return (
    <AppLayout
      onChooseFiles={onChooseFiles}
      content={content}
      header={<Header step={state.step} />}
    />
  );
}

App.propTypes = {
  ffmpegService: PropTypes.shape({}).isRequired,
  fileService: PropTypes.shape({
    getFilesInfo: PropTypes.func.isRequired,
    openFile: PropTypes.func.isRequired
  }).isRequired
};
