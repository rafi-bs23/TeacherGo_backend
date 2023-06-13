import mongoose, { Schema, Document, ObjectId } from 'mongoose';
interface IDriver extends Document {
  routeId?: ObjectId;
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
