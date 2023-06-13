import mongoose, { Schema, Document } from 'mongoose';

export interface IRoute extends Document {
  name: string;
  startFrom: string;
  endTo: string;
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
});

const RouteModel = mongoose.model<IRoute>('Route', routeSchema);

export default RouteModel;
