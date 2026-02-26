import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from '../backend/config/database';
import { User } from '../backend/models/User';
import { generateToken } from '../backend/utils/jwt';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  await connectDB();

  if (req.method === 'POST') {
    const { action } = req.query;

    try {
      if (action === 'login') {
        const { email, password } = req.body;

        if (!email || !password) {
          return res.status(400).json({
            success: false,
            message: 'Email and password are required',
          });
        }

        const user = await User.findOne({ email: email.toLowerCase() }).select(
          '+password'
        );

        if (!user || !(await user.comparePassword(password))) {
          return res.status(401).json({
            success: false,
            message: 'Invalid email or password',
          });
        }

        if (!user.isActive) {
          return res.status(401).json({
            success: false,
            message: 'User account is inactive',
          });
        }

        const token = generateToken({
          userId: user._id.toString(),
          email: user.email,
          role: user.role,
        });

        return res.status(200).json({
          success: true,
          token,
          user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
          },
        });
      } else if (action === 'register') {
        const { email, password, fullName } = req.body;

        if (!email || !password || !fullName) {
          return res.status(400).json({
            success: false,
            message: 'Email, password, and full name are required',
          });
        }

        const existingUser = await User.findOne({
          email: email.toLowerCase(),
        });

        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: 'User with this email already exists',
          });
        }

        const user = new User({
          email: email.toLowerCase(),
          password,
          fullName,
          role: 'user',
        });

        await user.save();

        const token = generateToken({
          userId: user._id.toString(),
          email: user.email,
          role: user.role,
        });

        return res.status(201).json({
          success: true,
          token,
          user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
          },
        });
      } else {
        return res.status(400).json({
          success: false,
          message: 'Invalid action',
        });
      }
    } catch (error) {
      console.error('Auth error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  } else {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }
}
