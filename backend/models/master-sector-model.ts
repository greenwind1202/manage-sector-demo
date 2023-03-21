import { Schema, model } from 'mongoose';

interface IMasterSector {
  id: number;
  name: string;
  level: number;
  parent: number;
}

const masterSectorSchema = new Schema<IMasterSector>(
  {
    id: { type: Number },
    name: { type: String },
    level: { type: Number },
    parent: { type: Number },
  },
  { collection: 'master_sector' }
);
const MasterSector = model<IMasterSector>('master_sector', masterSectorSchema);
export default MasterSector;
