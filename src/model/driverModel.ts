import mongoose, { Schema, Document, Types } from 'mongoose';
interface IDriver extends Document {
  routeId?: Types.ObjectId;
  isDriverOk: boolean;
}

const driverSchema = new Schema({
  routeId: {
    type: mongoose.Types.ObjectId,
  },
  isDriverOk: {
    type: Boolean,
    default: true,
  },
});

const DriverModel = mongoose.model<IDriver>('Driver', driverSchema);

export default DriverModel;
