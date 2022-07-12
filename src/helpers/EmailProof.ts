import { utils } from 'ethers'
import BaseProof from 'helpers/BaseProof'
import Proof from 'models/Proof'
import ProofResult from 'models/ProofResult'

export interface EmailProofSchema extends Proof {
  domain: string
}

export default class EmailProof extends BaseProof implements EmailProofSchema {
  domain: string

  get key() {
    return this.domain
  }

  static get type() {
    return 'email'
  }

  equal(proof: BaseProof): boolean {
    return proof instanceof EmailProof && this.domain === proof.domain
  }

  static fromJSON({
    domain,
    result,
  }: {
    domain: string
    result?: ProofResult
  }) {
    const proof = new EmailProof(domain)
    proof.result = result
    return proof
  }

  toJSON() {
    return {
      type: EmailProof.type,
      domain: this.domain,
      result: this.result,
    }
  }

  constructor(domain: string) {
    super()
    this.domain = domain
  }

  padZeroesOnRightUint8(array: Uint8Array, length: number) {
    const padding = new Uint8Array(length - array.length)
    return utils.concat([array, padding])
  }
}
