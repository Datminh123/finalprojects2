import { createContext, useState, useContext } from 'react';
import { authAPI } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Load user từ localStorage khi khởi tạo
    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem('user');
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    const login = async ({ email, password, role }) => {
        const userData = await authAPI.login({ email, password, role });
        
        // Lưu JWT token riêng
        if (userData.token) {
            localStorage.setItem('token', userData.token);
        }
        
        // Lưu user info (không lưu token vào user object)
        const { token, ...userInfo } = userData;
        setUser(userInfo);
        localStorage.setItem('user', JSON.stringify(userInfo));
        return userInfo;
    };

    const register = async (formData) => {
        const userData = await authAPI.register(formData);
        return userData;
    };
    
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    const updateUser = async (newData) => {
        // Không cần gửi email nữa — server lấy từ token
        const updated = await authAPI.updateProfile(newData);
        setUser(updated);
        localStorage.setItem('user', JSON.stringify(updated));
        return updated;
    };

    const changePassword = async ({ oldPassword, newPassword }) => {
        // Không cần gửi email nữa — server lấy từ token
        const result = await authAPI.changePassword({ 
            oldPassword, 
            newPassword 
        });
        return result;
    };

    return (
      <AuthContext.Provider value={{ user, login, register, logout, updateUser, changePassword }}>
        {children}
      </AuthContext.Provider>
    );
};
  
export const useAuth = () => useContext(AuthContext);