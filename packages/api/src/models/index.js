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
import { SizeGarmentSegment } from './SizeGarmentSegment';

// Garment

GarmentType.hasMany(GarmentSegment);
GarmentSegment.belongsTo(GarmentType);

// Sizechart

Brand.hasMany(Line);

Line.belongsTo(Brand);
Line.hasMany(Collection);

Collection.belongsTo(Line);
Collection.hasMany(Fit);

GarmentType.belongsToMany(Collection, { through: CollectionGarmentType });
Collection.belongsToMany(GarmentType, { through: CollectionGarmentType });

Fit.belongsTo(Collection, { through: CollectionGarmentType });
Fit.belongsTo(GarmentType, { through: CollectionGarmentType });

Fit.hasMany(Size);

Size.belongsTo(Fit);
Size.hasMany(Measurement);

GarmentSegment.belongsToMany(Size, { through: SizeGarmentSegment });
Size.belongsToMany(GarmentSegment, { through: SizeGarmentSegment });

Measurement.belongsTo(Size, { through: SizeGarmentSegment });
Measurement.belongsTo(GarmentSegment, { through: SizeGarmentSegment });

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
