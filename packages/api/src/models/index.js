import { Account } from './Account';
import { Brand } from './Brand';
import { Collection } from './Collection';
import { CollectionGarment } from './CollectionGarment';
import { Fit } from './Fit';
import { Segment } from './Segment';
import { Garment } from './Garment';
import { Line } from './Line';
import { Size } from './Size';
import { Measurement } from './Measurement';
import { SizeSegment } from './SizeSegment';

// Garment

Garment.hasMany(Segment);
Segment.belongsTo(Garment);

// Sizechart

Brand.hasMany(Line);

Line.belongsTo(Brand);
Line.hasMany(Collection);

Collection.belongsTo(Line);
Collection.hasMany(Fit);

Garment.belongsToMany(Collection, { through: CollectionGarment });
Collection.belongsToMany(Garment, { through: CollectionGarment });

Fit.belongsTo(Collection, { through: CollectionGarment });
Fit.belongsTo(Garment, { through: CollectionGarment });

Fit.hasMany(Size);

Size.belongsTo(Fit);
Size.hasMany(Measurement);

Segment.belongsToMany(Size, { through: SizeSegment });
Size.belongsToMany(Segment, { through: SizeSegment });

Measurement.belongsTo(Size, { through: SizeSegment });
Measurement.belongsTo(Segment, { through: SizeSegment });

export {
	Account,
	Brand,
	Collection,
	Fit,
	Segment,
	Garment,
	Line,
	Size,
	Measurement,
};
