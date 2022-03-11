import { useContext } from "react";
import { AppContext } from "../components/ContextProvider/ContextProvider";

export default function useCustomContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useCustomContext must be used within a CustomContextProvider');
  }
  return context;
};