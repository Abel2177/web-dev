import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ children, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;

    modalRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = modalRef.current?.querySelectorAll(
        "button, input, select, textarea, a[href]"
      );

      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      ref={modalRef}
      tabIndex="-1"
    >
      <div>
        {children}

        <button onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    document.body
  );
}

export default Modal;