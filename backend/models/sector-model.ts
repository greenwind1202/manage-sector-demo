import { Schema, model } from 'mongoose';

interface ISector {
  name: string;
  sectors: Array<string>;
  agree_to_term: boolean;
}

const sectorSchema = new Schema<ISector>(
  {
    name: { type: String, required: true },
    sectors: { type: [String], required: true },
    agree_to_term: { type: Boolean, required: true },
  },
  { timestamps: true }
);
const Sector = model<ISector>('sectors', sectorSchema)
export default Sector;
