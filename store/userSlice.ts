import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Krijojmë një interface për User, që përfaqëson të dhënat që marrim nga API.
// Këtu përfshihet id, emri, email-i, si dhe informatat për kompaninë dhe adresën.
export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
    company: {
        name: string;
    };
    address: {
        street: string;
        city: string;
        zipcode: string;
    };
}

// Përcaktojmë tipin e gjendjes (state) që lidhet me user-at.
// "users" mban listën e user-ave, ndërsa "loading" përdoret për të treguar
interface UsersState {
    users: User[];
    loading: boolean;
}

// Gjendja fillestare e slice-it të user-ave.
// Fillimisht nuk kemi të dhëna (users bosh) dhe nuk jemi në gjendje loading.
const initialState: UsersState = {
    users: [],
    loading: false,
};

// Krijojmë slice "users"
// Përmban gjendjen fillestare dhe reducer që ndryshojnë state-in.
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // Vendos listën e user pasi të jenë marrë nga API
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
            state.loading = false; // pasi marrim të dhënat, nuk jemi më në loading
        },

        // Vendos statusin e loading
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },

        // Shton një user të ri në fillim të listës
        addUser: (state, action: PayloadAction<User>) => {
            state.users.unshift(action.payload);
        },

        // Përditëson një user ekzistues sipas id
        updateUser: (state, action: PayloadAction<User>) => {
            const index = state.users.findIndex(u => u.id === action.payload.id);
            if (index !== -1) state.users[index] = action.payload;
        },

        // Fshin një user nga lista sipas id
        deleteUser: (state, action: PayloadAction<number>) => {
            state.users = state.users.filter(u => u.id !== action.payload);
        },
    },
});

// Export actionet për t’i përdorur nëpër komponentë
export const { setUsers, setLoading, addUser, updateUser, deleteUser } = usersSlice.actions;

// Krijojmë store kryesor të Redux dhe regjistrojmë reducer e users
export const store = configureStore({
    reducer: {
        users: usersSlice.reducer,
    },
});

// RootState: përfaqëson gjendjen e plotë të store-it
// AppDispatch: tip për dispatch, që përdoret në thirrjet e action-eve
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
