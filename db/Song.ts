import { Model, DataTypes, v4 } from '../deps.ts';

class Song extends Model {
  static table = 'songs';

  static fields = {
    id: { type: DataTypes.UUID, primaryKey: true },
    title: DataTypes.STRING,
    url: DataTypes.STRING,
  };

  static timestamps = true;
}

export default Song;
