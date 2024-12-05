import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {
  visibleModal: any = null;

  constructor() {}

  toggleModal(event: any, modalId: string) {
    event.preventDefault();
    const modal = document.getElementById(modalId);
    typeof modal != 'undefined' && modal != null && this.isModalOpen(modal)
      ? this.closeModal(modal)
      : this.openModal(modal);
  }

  isModalOpen(modal: any) {
    return modal.hasAttribute('open') && modal.getAttribute('open') != 'false'
      ? true
      : false;
  }

  openModal(modal: any) {
    if (this.isScrollbarVisible()) {
      document.documentElement.style.setProperty(
        '--scrollbar-width',
        `${this.getScrollbarWidth()}px`
      );
    }
    modal.setAttribute('open', true);
  }

  closeModal(modal: any) {
    this.visibleModal = null;
    modal.removeAttribute('open');
  }

  getScrollbarWidth() {
    const outer: any = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    outer.style.msOverflowStyle = 'scrollbar';
    document.body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
  }

  isScrollbarVisible() {
    return document.body.scrollHeight > screen.height;
  }
}
