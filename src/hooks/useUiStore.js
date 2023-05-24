// Redux Hooks
import { useDispatch, useSelector } from 'react-redux';

// Redux actions
import { onOpenCloseModal } from '@/store';

export const useUiStore = () => {
  const { isModalOpen } = useSelector((state) => state.ui);

  // Dispatch
  const dispatch = useDispatch();

  // Open/close user drawer
  const openCloseModal = () => {
    dispatch(onOpenCloseModal());
  };

  return {
    // Props
    isModalOpen,

    // Methods
    openCloseModal,
  };
};
