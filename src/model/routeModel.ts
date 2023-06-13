import mongoose, { Schema } from 'mongoose';

interface IRoute {
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
    required: [true, 'Please provide start location of a route.'],
  },
  endTo: {
    type: String,
    required: [true, 'Please provide end locaton of a route'],
  },
});

const RouteModel = mongoose.model<IRoute>('Route', routeSchema);

export default RouteModel;
