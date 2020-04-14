import { Address } from '../crypto';
import { hex2VarBytes } from '../utils';
import { serializeVarUint, serializeAddress } from './utils';

export class FileTransfer {
    public constructor(
        public readonly fileHash: string,
        public readonly oriOwner: Address,
        public readonly newOwner: Address
    ) { }

    public serializeHex(): string {
        return hex2VarBytes(this.fileHash)
            + serializeAddress(this.oriOwner)
            + serializeAddress(this.newOwner);
    }
}

export class FileTransferList {
    public constructor(
        public readonly filesTransfer: FileTransfer[] = []
    ) { }

    public serializeHex(): string {
        let str = serializeVarUint(this.filesTransfer.length);

        for (const fileTrans of this.filesTransfer) {
            str += hex2VarBytes(fileTrans.serializeHex());
        }

        return str;
    }
}