import { CircularProgress } from "@mui/material";
import { DeleteLoadingButton } from "../../mui/DeleteLoadingButton ";
import { PrimaryLoadingButton } from "../../mui/PrimaryLoadingButton ";
import styles from "./LoadButton.module.scss";

const LoadButton = ({ loading, children, deleted }) => {
  return (
    <>
      {loading ? deleted ? (
        <DeleteLoadingButton
          loadingPosition={"center"}
          variant="outlined"
          loading={true}
          loadingIndicator={
            <CircularProgress className={`${styles.loading_icon}`} />
          }
        />
      ) : (
        <PrimaryLoadingButton
          loadingPosition={"center"}
          variant="outlined"
          loading={true}
          loadingIndicator={
            <CircularProgress className={`${styles.loading_icon}`} />
          }
        />
      ) : (
        children
      )}
    </>
  );
};

export default LoadButton;