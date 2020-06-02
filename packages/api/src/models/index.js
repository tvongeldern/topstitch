import { Account } from './Account';
import { Brand } from './Brand';
import { Collection } from './Collection';
import { CollectionGarment } from './CollectionGarment';
import { Fit } from './Fit';
import { Segment } from './Segment';
import { Garment } from './Garment';
import { Size } from './Size';
import { Measurement } from './Measurement';
import { Review } from './Review';
import { SizeSegment } from './SizeSegment';
import { SavedSize } from './SavedSize';

// Garment

Garment.hasMany(Segment);
Segment.belongsTo(Garment);

// Sizechart chain

Brand.hasMany(Collection);

Collection.belongsTo(Brand);
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

// Reviews
Size.hasMany(Review);
Review.belongsTo(Size);

// CreatedBy
[
	Brand,
	Collection,
	Fit,
	Size,
	Measurement,
	SavedSize,
	Review,
].forEach((Model) => {
	Account.hasMany(Model, { foreignKey: 'createdBy' });
});

export {
	Account,
	Brand,
	Collection,
	CollectionGarment,
	Fit,
	Segment,
	Garment,
	Size,
	Measurement,
	SavedSize,
	Review,
};
