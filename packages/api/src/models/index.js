import { Account } from './Account';
import { Brand } from './Brand';
import { Collection } from './Collection';
import { CollectionGarmentType } from './CollectionGarmentType';
import { Fit } from './Fit';
import { GarmentSegment } from './GarmentSegment';
import { GarmentType } from './GarmentType';
import { Line } from './Line';
import { Size } from './Size';
import { Measurement } from './Measurement';

// Sizechart

Brand.hasMany(Line);

Line.belongsTo(Brand);
Line.hasMany(Collection);

Collection.belongsTo(Line);

Collection.hasMany(GarmentType);

GarmentType.belongsToMany(Collection, { through: CollectionGarmentType });

Fit.hasOne(Collection, { through: CollectionGarmentType });
Fit.hasOne(GarmentType, { through: CollectionGarmentType });

Fit.hasMany(Size);

Size.belongsTo(Fit);
Size.hasMany(Measurement);

Measurement.belongsTo(Size);

// Garment


// GarmentType.hasMany(GarmentSegment);
// GarmentSegment.belongsTo(GarmentType);

// GarmentType.hasMany(Fit);

// GarmentSegment.belongsToMany(Measurement, { through: 'MeasurementGarmentSegment' });
// Measurement.belongsTo(GarmentSegment);

export {
	Account,
	Brand,
	Collection,
	Fit,
	GarmentSegment,
	GarmentType,
	Line,
	Size,
	Measurement,
};
