import '@/css/popup.css';
import Loader from '@/components/loader';

export default function Popup({ submitStatus, clearStatus }: { submitStatus: any, clearStatus: any }) {


  return (
    <>
      {submitStatus.showStatus &&
        <div className="status-modal-overlay">
          <div className="status-modal">
            <h1 className={`status-modal-title ${submitStatus.hasError ? "error-text" : submitStatus.showLoading ? "" : "success-text"}`}>
              {submitStatus.title}
            </h1>
            <div className="status-modal-message">
              <span>
                {submitStatus.message}
              </span>
            </div>

            {submitStatus.showLoading && <Loader />}

            {submitStatus.showButton && (
              <button onClick={clearStatus} className="btn btn-primary">
                OK
              </button>
            )}
          </div>
        </div>}
    </>
  );
};
