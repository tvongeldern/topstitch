import { Account } from './Account';
import { Brand } from './Brand';
import { Collection } from './Collection';
import { Fit } from './Fit';
import { GarmentSegment } from './GarmentSegment';
import { GarmentType } from './GarmentType';
import { Line } from './Line';
import { Size } from './Size';
import { Measurement } from './Measurement';

Brand.hasMany(Line);

Line.belongsTo(Brand);
Line.hasMany(Collection);

Collection.belongsTo(Line);
Collection.hasMany(GarmentType);
Collection.hasMany(Fit);

Fit.belongsTo(Collection);
Fit.hasOne(GarmentType);
Fit.hasMany(Size);

Size.belongsTo(Fit);
Size.hasMany(Measurement);

Measurement.belongsTo(Size);
Measurement.hasOne(GarmentSegment);

GarmentSegment.belongsTo(GarmentType);
GarmentType.hasMany(GarmentSegment);

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
