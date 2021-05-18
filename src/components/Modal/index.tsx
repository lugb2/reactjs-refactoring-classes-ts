import { ReactNode, useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';

interface ModalProps{
  isOpen: boolean;
  setIsOpen: () => void;
  children: ReactNode;
}

export function Modal({
  isOpen,
  setIsOpen,
  children
}: ModalProps){

  const [ modalStatus, setModalStatus ] = useState(isOpen);
  const isOpenRef = useRef<boolean>();

  useEffect(() => {

    // define a propriedade
    isOpenRef.current = isOpen;
  });

  // pega valor do último estado
  const isOpenPrevious = isOpenRef.current ?? isOpen;

  useEffect(() => {
    
    // verifica se alterado o valor
    if(isOpen !== isOpenPrevious){

      // altera o status
      setModalStatus(isOpen);
    }
  }, [isOpen, isOpenPrevious]);

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#F0F0F5',
          color: '#000000',
          borderRadius: '8px',
          width: '736px',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
    >
      {children}
    </ReactModal>
  );
}
