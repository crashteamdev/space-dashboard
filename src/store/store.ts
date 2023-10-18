import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import userReducer from "./user/userSlice";
import counterReducer from "./counter/counterSlice";
import CustomizerReducer from "./customizer/CustomizerSlice";
import EcommerceReducer from "./apps/eCommerce/ECommerceSlice";
import ChatsReducer from "./apps/chat/ChatSlice";
import NotesReducer from "./apps/notes/NotesSlice";
import EmailReducer from "./apps/email/EmailSlice";
import TicketReducer from "./apps/tickets/TicketSlice";
import ContactsReducer from "./apps/contacts/ContactSlice";
import UserProfileReducer from "./apps/userProfile/UserProfileSlice";
import BlogReducer from "./apps/blog/BlogSlice";
import WalletPopupReducer from "./apps/walletPopup/WalletPopupSlice";
import CompanyChangerReducer from "./apps/companyChanger/CompanyChangerSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    walletPopup: WalletPopupReducer,
    companyChanger: CompanyChangerReducer,
    counter: counterReducer,
    customizer: CustomizerReducer,
    ecommerceReducer: EcommerceReducer,
    chatReducer: ChatsReducer,
    emailReducer: EmailReducer,
    notesReducer: NotesReducer,
    contactsReducer: ContactsReducer,
    ticketReducer: TicketReducer,
    userpostsReducer: UserProfileReducer,
    blogReducer: BlogReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

const rootReducer = combineReducers({
  user: userReducer,
  walletPopup: WalletPopupReducer,
  companyChanger: CompanyChangerReducer,
  counter: counterReducer,
  customizer: CustomizerReducer,
  ecommerceReducer: EcommerceReducer,
  chatReducer: ChatsReducer,
  emailReducer: EmailReducer,
  notesReducer: NotesReducer,
  contactsReducer: ContactsReducer,
  ticketReducer: TicketReducer,
  userpostsReducer: UserProfileReducer,
  blogReducer: BlogReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
