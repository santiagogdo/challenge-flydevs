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
    <div className={styles.modal}>
      <CSSTransition unmountOnExit nodeRef={overlayRef} in={props.isOpen} timeout={300} classNames={{
        appear: styles['modal__overlay--appear'],
        appearActive: styles['modal__overlay--appear-active'],
        appearDone: styles['modal__overlay--appear-done-'],
        enter: styles['modal__overlay--enter'],
        enterActive: styles['modal__overlay--enter-active'],
        enterDone: styles['modal__overlay--enter-done'],
        exit: styles['modal__overlay--exit'],
        exitActive: styles['modal__overlay--exit-active'],
        exitDone: styles['modal__overlay--exit-done'],
      }}>
        <div ref={overlayRef} className={styles['modal__overlay']} onClick={props.onClose} />
      </CSSTransition>
      <CSSTransition unmountOnExit nodeRef={modalContainerRef} in={props.isOpen} timeout={300} classNames={{
        appear: styles['modal--appear'],
        appearActive: styles['modal--appear-active'],
        appearDone: styles['modal--appear-done-'],
        enter: styles['modal--enter'],
        enterActive: styles['modal--enter-active'],
        enterDone: styles['modal--enter-done'],
        exit: styles['modal--exit'],
        exitActive: styles['modal--exit-active'],
        exitDone: styles['modal--exit-done'],
      }}>
        <>
          <div ref={modalContainerRef} className={styles['modal__container']}>
            <div className={styles['modal__header']}>
              <span className={styles['modal__header-title']}>{props.header}</span>
              <div className={styles['modal__close-button']}>
                <Image
                  onClick={props.onClose}
                  src="/close-icon.svg"
                  alt={`Close button`}
                  width={30}
                  height={30}
                  layout="fixed" />
              </div>
            </div>
            <div className={styles['modal__body']}>
              {props.children}
            </div>
          </div>
        </>
      </CSSTransition>
    </div>
  );
}

export default Modal;
