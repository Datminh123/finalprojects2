import jwt from 'jsonwebtoken';
import AccountModel from '../models/Account.js';

/**
 * Middleware xác thực JWT token
 * Gắn req.user = { accountId, role, email } để các route sau dùng
 */
export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Vui lòng đăng nhập để tiếp tục!' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const account = await AccountModel.findById(decoded.id);
        
        if (!account) {
            return res.status(401).json({ message: 'Tài khoản không tồn tại!' });
        }

        // Gắn thông tin user vào request — dùng cho phân quyền ở các middleware/route phía sau
        req.user = {
            accountId: decoded.id,
            role: account.role, // Lấy role từ DB (không tin client/token)
            email: account.email
        };

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn!' });
    }
};

/**
 * Middleware phân quyền theo vai trò (RBAC)
 * Sử dụng: roleMiddleware(['admin']) hoặc roleMiddleware(['employer', 'admin'])
 */
export const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `Bạn không có quyền truy cập! Yêu cầu vai trò: ${allowedRoles.join(' hoặc ')}.` 
            });
        }
        next();
    };
};
