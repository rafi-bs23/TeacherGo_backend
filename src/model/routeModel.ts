import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IRoute extends Document {
  name: string;
  startFrom: string;
  endTo: string;
  driver: Types.ObjectId;
  driverName: string;
}

const routeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'A Route must have a name'],
  },
  startFrom: {
    type: String,
    default: '23.801454005206896,90.4261700640749',
  },
  endTo: {
    type: String,
    required: [true, 'Please provide end locaton of a route'],
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: [true, 'A route must need a Driver.'],
  },
  driverName: {
    type: String,
    required: [true, 'A Route must have a name'],
  },
});

const RouteModel = mongoose.model<IRoute>('Route', routeSchema);

export default RouteModel;
