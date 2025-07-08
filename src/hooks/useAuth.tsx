import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import type { User, AuthState, LoginCredentials } from '@/types/auth';
import { AuthService } from '@/services/authService';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
  switchUser: (userId: string) => void;
}

type AuthAction = 
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_ERROR' }
  | { type: 'LOGOUT' }
  | { type: 'SET_USER'; payload: User };

const initialState: AuthState = {
  user: AuthService.getCurrentUser(),
  isAuthenticated: !!AuthService.getCurrentUser(),
  isLoading: false
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    
    case 'LOGIN_ERROR':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const user = await AuthService.login(credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR' });
      throw error;
    }
  };

  const logout = async () => {
    await AuthService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  const hasPermission = (permission: string) => {
    return AuthService.hasPermission(permission as any);
  };

  const hasRole = (role: string) => {
    return AuthService.hasRole(role as any);
  };

  const switchUser = (userId: string) => {
    const users = AuthService.getAllUsers();
    const user = users.find(u => u.id === userId);
    if (user) {
      AuthService['currentUser'] = user;
      dispatch({ type: 'SET_USER', payload: user });
    }
  };

  const contextValue: AuthContextType = {
    ...state,
    login,
    logout,
    hasPermission,
    hasRole,
    switchUser
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}