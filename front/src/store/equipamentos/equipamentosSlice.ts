import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Equipamento {
  id: number;
  name: string;
  type: string;
  employee: string;
  ip: string;
}

interface EquipamentosState {
  data: Equipamento[];
  loading: boolean;
}

const initialState: EquipamentosState = {
  data: [],
  loading: false,
};

const equipamentosSlice = createSlice({
  name: 'equipamentos',
  initialState,
  reducers: {
    setEquipamentos(state, action: PayloadAction<Equipamento[]>) {
      state.data = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setEquipamentos, setLoading } = equipamentosSlice.actions;
export default equipamentosSlice.reducer;
