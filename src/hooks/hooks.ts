import { AppDispatch,RootState,AppStore} from "../Redux/Store";
import { useDispatch,useSelector,useStore  } from "react-redux";
import { useNavigate,NavigateFunction } from 'react-router-dom';
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()
export const useAppNavigate = (): NavigateFunction => useNavigate();