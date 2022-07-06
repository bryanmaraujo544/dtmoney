import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';

export const Toast = styled(ToastContainer).attrs({
  className: 'toast-container',
  toastClassName: 'toast',
  bodyClassName: 'body',
  progressClassName: 'progress',
})`
  /* background-color: orange !important; */

  .toast {
    border-radius: 0.25rem;
    font-family: 'Poppins', sans-serif;
    color: var(--text-title);
    font-weight: 500;
    padding: 0.5rem;
  }

  .progress {
    visibility: hidden;
  }
`;
