import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument, UserRole } from './schemas/user.schema';

const SALT_ROUNDS = 12;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  findById(id: string) {
    return this.userModel.findById(id).exec();
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email: email.toLowerCase().trim() }).exec();
  }

  async create(email: string, password: string, name?: string, role: UserRole = 'customer') {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    return this.userModel.create({ email: email.toLowerCase().trim(), passwordHash, name, role });
  }

  async validatePassword(user: UserDocument, password: string) {
    return bcrypt.compare(password, user.passwordHash);
  }

  async countAdmins() {
    return this.userModel.countDocuments({ role: 'admin' }).exec();
  }

  setStripeCustomerId(userId: string, stripeCustomerId: string) {
    return this.userModel.findByIdAndUpdate(userId, { stripeCustomerId }).exec();
  }
}
