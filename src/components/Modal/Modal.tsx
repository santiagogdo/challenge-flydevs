import Image from 'next/image';
import { type ReactNode, type MouseEventHandler, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
  header?: string;
  onClose: MouseEventHandler<HTMLImageElement>;
};

const Modal = (props: ModalProps) => {
  const overlayRef = useRef(null);
  const modalContainerRef = useRef(null);
  return (
    <>
      <CSSTransition unmountOnExit nodeRef={overlayRef} in={props.isOpen} timeout={300} classNames={{
        appear: styles['overlay-transition-appear'],
        appearActive: styles['overlay-transition-appear-active'],
        appearDone: styles['overlay-transition-appear-done-'],
        enter: styles['overlay-transition-enter'],
        enterActive: styles['overlay-transition-enter-active'],
        enterDone: styles['overlay-transition-enter-done'],
        exit: styles['overlay-transition-exit'],
        exitActive: styles['overlay-transition-exit-active'],
        exitDone: styles['overlay-transition-exit-done'],
      }}>
        <div ref={overlayRef} className={styles['modal-overlay']} onClick={props.onClose} />
      </CSSTransition>
      <CSSTransition unmountOnExit nodeRef={modalContainerRef} in={props.isOpen} timeout={300} classNames={{
        appear: styles['modal-transition-appear'],
        appearActive: styles['modal-transition-appear-active'],
        appearDone: styles['modal-transition-appear-done-'],
        enter: styles['modal-transition-enter'],
        enterActive: styles['modal-transition-enter-active'],
        enterDone: styles['modal-transition-enter-done'],
        exit: styles['modal-transition-exit'],
        exitActive: styles['modal-transition-exit-active'],
        exitDone: styles['modal-transition-exit-done'],
      }}>
        <>
          <div ref={modalContainerRef} className={styles['modal-container']}>
            <div className={styles['modal-header']}>
              <span className={styles['modal-header-title']}>{props.header}</span>
              <div className={styles['close-button']}>
                <Image
                  onClick={props.onClose}
                  src="/close-icon.svg"
                  alt={`Close button`}
                  width={30}
                  height={30}
                  layout="fixed" />
              </div>
            </div>
            <div className={styles['modal-body']}>
              {props.children}
            </div>
          </div>
        </>
      </CSSTransition>
    </>
  );
}

export default Modal;
