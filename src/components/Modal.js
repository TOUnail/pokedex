import { useRef } from "react";
import { createPortal } from "react-dom";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
const Modal = ({ open, hide, children, title }) => {
  const ref = useRef(null);
  useOnClickOutside(ref, hide);

  return open
    ? createPortal(
        <>
          <div className="modal-backdrop show" />
          <div className="modal d-block" tabIndex={-1}>
            <div className="modal-dialog">
              <div ref={ref} className="modal-content">
                <div className="modal-header text-capitalize">
                  {title.replace("-", " ")}
                </div>
                <div className="modal-body">
                  {children}
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={hide}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )
    : null;
};

export default Modal;
