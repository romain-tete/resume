import { createReducer, on } from '@ngrx/store';
import { contactActions as actions } from './contact.actions';
import { Contact } from './experiences.types';

interface ContactState {
  contact: Contact;
  saving: boolean;
  loading: boolean;
  deleting: boolean;
}

const defaultContactState: ContactState = {
  contact: null,
  saving: false,
  loading: false,
  deleting: false,
};

export const contactReducer = createReducer(
  defaultContactState,
  on(actions.read, (state) => ({ ...state, loading: true })),
  on(actions.readSuccess, (state, { contact }) => ({
    ...state,
    contact,
    loading: false,
  })),
  on(actions.readError, (state) => ({ ...state, loading: false })),
  on(actions.save, (state) => ({ ...state, saving: true })),
  on(actions.saveSuccess, (state, { contact }) => ({
    ...state,
    contact,
    saving: false,
  })),
  on(actions.saveError, (state) => ({ ...state, saving: false })),
  on(actions.delete, (state) => ({ ...state, deleting: true })),
  on(actions.deleteSuccess, (state) => ({
    ...state,
    contact: null,
    deleting: false,
  })),
  on(actions.deleteError, (state) => ({ ...state, deleting: false }))
);

type ContactSelector<T> = (state: {
  experiences: { contact: ContactState };
}) => T;
interface ContactSelectors {
  currentContact: ContactSelector<Contact>;
}

export const contactSelectors: ContactSelectors = {
  currentContact: (state) =>
    state.experiences.contact?.deleting === false
      ? state.experiences.contact.contact
      : null,
};
