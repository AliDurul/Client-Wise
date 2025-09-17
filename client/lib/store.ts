import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { themeSlice } from "./features/theme/themeSlice";
import { ticketSlice } from "./features/tickets/ticketSlice";
import { customerSlice } from "./features/customer/customerSlice";
import { productSlice } from "./features/products/productSlice";
import { faqSlice } from "./features/faq/faqSlice";
import { taskSlice } from "./features/task/taskSlice";
import { chatSlice } from "./features/chat/chatSlice";
import { emailSlice } from "./features/email/emailSlice";

const rootReducer = combineSlices(
    themeSlice,
    emailSlice,
    ticketSlice,
    customerSlice,
    productSlice,
    faqSlice,
    taskSlice,
    chatSlice,
);
export type RootState = ReturnType<typeof rootReducer>;


export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>;
