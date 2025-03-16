import { useEffect } from "react";
import { createPortal } from "react-dom";
// import Document from 'next/document'

const Backdrop = ({ onClose }) => {
    return (
        <div
            className="fixed top-0 left-0 z-20 h-screen w-full bg-black/75"
            onClick={onClose}
        />
    );
};

const ModalOverlay = ({ children }) => {
    return (
        // overlay
        <div className="modal">
            {/* content */}
            <div>{children}</div>
        </div>
    );
};

/*
  document not defined (next js pre-rendering)

  https://www.webtutpro.com/solve-document-is-not-defined-errors-in-next-js-26fea778b868
*/
if (typeof window !== "undefined") {
    var portalElement = document.getElementById("overlays");
}

export default function Modal({ children, onClose }) {
    return (
        <>
            {createPortal(<Backdrop onClose={onClose} />, portalElement)}
            {createPortal(
                <ModalOverlay>{children}</ModalOverlay>,
                portalElement
            )}
        </>
    );
}
