import { ADD_ABS } from '@utils';
import {
	Garment,
	ShirtTorso,
	ShirtSleevesShort,
	ShirtNeckVNeck,
} from './components';

export class TShirtVNeck extends Garment {
	defaultMeasurements = {
		chestWidth: 762,
	};

	components = [
		ShirtTorso,
		ShirtSleevesShort,
		ShirtNeckVNeck,
	];

	bounds({
		offsets: {
			startHipOffset,
			hipWaistOffset,
			waistArmpitOffset,
			armpitShoulderOffset,
			shoulderNeckOffset,
			shoulderElbowOuterOffset,
		},
	}) {
		const maxWidth = ADD_ABS(
			startHipOffset.x,
			hipWaistOffset.x,
			waistArmpitOffset.x,
			armpitShoulderOffset.x,
			shoulderElbowOuterOffset.x,
		) * 2;
		const maxHeight = ADD_ABS(
			startHipOffset.y,
			hipWaistOffset.y,
			waistArmpitOffset.y,
			armpitShoulderOffset.y,
			shoulderNeckOffset.y,
		);
		const size = Math.ceil(
			Math.max(maxWidth, maxHeight) * 1.1
		);
		return {
			maxWidth,
			maxHeight,
			size,
			middle: size / 2,
			viewBox: [0, 0, size, size].join(' '),
		};
	}

	measurementMap({
		hipLeft,
		hipRight,
		waistLeft,
		waistRight,
		armpitLeft,
		armpitRight,
		shoulderLeft,
		shoulderRight,
		neckLeft,
		neckRight,
		neckFront,
		neckBack,
		elbowOuterLeft,
		elbowInnerLeft,
	}) {
		return {
			hipWidth: {
				left: hipLeft,
				right: hipRight,
			},
			waistWidth: {
				left: waistLeft,
				right: waistRight,
			},
			chestWidth: {
				left: armpitLeft,
				right: armpitRight,
			},
			shoulderWidth: {
				left: shoulderLeft,
				right: shoulderRight,
			},
			neckWidth: {
				left: neckLeft,
				right: neckRight,
			},
			hipToArmpitHeight: {
				top: armpitLeft,
				bottom: hipLeft,
			},
			hipToNeckHeightFront: {
				top: neckFront,
				bottom: hipLeft,
			},
			hipToNeckHeightBack: {
				top: neckBack,
				bottom: hipLeft,
			},
			hipToNeckHeightSide: {
				top: neckLeft,
				bottom: hipLeft,
			},
			sleeveLengthOuter: {
				start: shoulderLeft,
				end: elbowOuterLeft,
			},
			sleeveWidthElbow: {
				start: elbowOuterLeft,
				end: elbowInnerLeft,
			},
			sleeveWidthShoulder: {
				start: shoulderLeft,
				end: armpitLeft,
			},
			neckToShoulderLength: {
				start: shoulderLeft,
				end: neckLeft,
			},
		};
	}
}
