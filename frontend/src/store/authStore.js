import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../api/axios";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: true,

      login: (user) =>
        set({
          user,
          isAuthenticated: Boolean(user),
          loading: false,
        }),

      logout: async () => {
        try {
          await api.get("/api/auth/logout", { silent: true });
        } finally {
          set({ user: null, isAuthenticated: false, loading: false });
        }
      },

      getCurrentUser: async () => {
        set({ loading: true });
        try {
          const { data } = await api.get("/api/auth/get-me", { silent: true });
          set({ user: data.user, isAuthenticated: true, loading: false });
          return data.user;
        } catch {
          set({ user: null, isAuthenticated: false, loading: false });
          return null;
        }
      },
    }),
    {
      name: "interview-ai-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
