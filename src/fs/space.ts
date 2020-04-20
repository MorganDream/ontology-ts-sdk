import { Address } from '../crypto';
import { bool2VarByte, StringReader } from '../utils';
import { decodeAddress, decodeBool, decodeVarUint, serializeAddress, serializeVarUint } from './utils';

export class SpaceInfo {

    static deserializeHex(hex: string): SpaceInfo {
        const sr: StringReader = new StringReader(hex);
        const spaceOwner = decodeAddress(sr);
        const volume = decodeVarUint(sr);
        const restVol = decodeVarUint(sr);
        const copyNumber = decodeVarUint(sr);
        const payAmount = decodeVarUint(sr);
        const restAmount = decodeVarUint(sr);
        const pdpInterval = decodeVarUint(sr);
        const timeStart = decodeVarUint(sr);
        const timeExpired = decodeVarUint(sr);
        const validFlag = decodeBool(sr);
        return new SpaceInfo(spaceOwner, volume, restVol, copyNumber, payAmount,
            restAmount, pdpInterval, timeStart, timeExpired, validFlag);
    }
    public constructor(
        public readonly spaceOwner: Address,
        public readonly volume: number,
        public readonly restVol: number,
        public readonly copyNumber: number,
        public readonly payAmount: number,
        public readonly restAmount: number,
        public readonly pdpInterval: number,
        public readonly timeStart: number,
        public readonly timeExpired: number,
        public readonly validFlag: boolean
    ) { }

    public serializeHex(): string {
        return serializeAddress(this.spaceOwner)
            + serializeVarUint(this.volume)
            + serializeVarUint(this.restVol)
            + serializeVarUint(this.copyNumber)
            + serializeVarUint(this.payAmount)
            + serializeVarUint(this.restAmount)
            + serializeVarUint(this.pdpInterval)
            + serializeVarUint(this.timeStart)
            + serializeVarUint(this.timeExpired)
            + bool2VarByte(this.validFlag);
    }
}

export class SpaceUpdate {
    static deserializeHex(hex: string): SpaceUpdate {
        const sr: StringReader = new StringReader(hex);
        const spaceOwner = decodeAddress(sr);
        const payer = decodeAddress(sr);
        const newVolume = decodeVarUint(sr);
        const newTimeExpired = decodeVarUint(sr);

        return new SpaceUpdate(spaceOwner, payer, newVolume, newTimeExpired);
    }
    public constructor(
        public readonly spaceOwner: Address,
        public readonly payer: Address,
        public readonly newVolume: number,
        public readonly newTimeExpired: number
    ) { }

    public serializeHex(): string {
        return serializeAddress(this.spaceOwner)
            + serializeAddress(this.payer)
            + serializeVarUint(this.newVolume)
            + serializeVarUint(this.newTimeExpired);
    }
}