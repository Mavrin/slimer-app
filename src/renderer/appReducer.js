import { initProgress } from "./progress";
const CHOOSE_FILES = `CHOOSE_FILES`;
const CHOOSE_OUTPUT_DIR = `CHOOSE_OUTPUT_DIR`;
const CONVERT_CHANGE_PROGRESS = `CONVERT_CHANGE_PROGRESS`;
const CONVERT_ERROR = `CONVERT_ERROR`;
const CONVERT_SUCCESS = `CONVERT_SUCCESS`;
const SUBMIT = `SUBMIT`;
const RESET = `RESET`;

export const chooseFilesAction = payload => {
  return { type: CHOOSE_FILES, payload };
};

export const chooseOutputDirAction = payload => {
  return { type: CHOOSE_OUTPUT_DIR, payload };
};

export const submit = payload => {
  return { type: SUBMIT, payload };
};

export const reset = payload => {
  return { type: RESET, payload };
};

export const convert = ({ dispatch, files, ffmpegService, outputDir }) => {
  dispatch(
    submit(
      files.reduce(function(res, { path }) {
        res[path] = {
          progress: `pending`
        };
        return res;
      }),
      {}
    )
  );
  files.forEach(({ path }) => {
    const progress = initProgress();
    ffmpegService.convert(path, outputDir).then(ffmpeg => {
      ffmpeg.stderr.on("data", data => {
        progress.update(data);
        dispatch({
          type: CONVERT_CHANGE_PROGRESS,
          payload: {
            progress: progress.getCurrentProgress() + "%",
            path: path
          }
        });
      });
      ffmpeg.on("close", code => {
        if (code) {
          return dispatch({
            type: CONVERT_ERROR,
            payload: {
              path: path
            }
          });
        }
        return dispatch({
          type: CONVERT_SUCCESS,
          payload: {
            path: path
          }
        });
      });
    });
  });
};

export const initialState = {
  step: 1,
  files: [],
  outputDir: ``,
  convertProgress: {}
};

export const appReducer = (state, { type, payload }) => {
  switch (type) {
    case CHOOSE_FILES: {
      return {
        ...state,
        step: 2,
        files: Array.from(payload.files)
      };
    }
    case CHOOSE_OUTPUT_DIR: {
      return {
        ...state,
        outputDir: payload.path
      };
    }
    case SUBMIT: {
      return {
        ...state,
        step: 3,
        convertProgress: {}
      };
    }
    case CONVERT_CHANGE_PROGRESS: {
      return {
        ...state,
        convertProgress: {
          ...state.convertProgress,
          [payload.path]: {
            progress: payload.progress
          }
        }
      };
    }
    case CONVERT_SUCCESS: {
      return {
        ...state,
        convertProgress: {
          ...state.convertProgress,
          [payload.path]: {
            success: true
          }
        }
      };
    }
    case CONVERT_ERROR: {
      return {
        ...state,
        convertProgress: {
          ...state.convertProgress,
          [payload.path]: {
            error: `Could not convert video`
          }
        }
      };
    }
    case RESET: {
      return initialState;
    }
    default:
      return state;
  }
};
