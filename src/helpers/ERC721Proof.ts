import BaseProof from 'helpers/BaseProof'
import Proof from 'models/Proof'
import ProofResult from 'models/ProofResult'

export interface ERC721ProofSchema extends Proof {
  contract: string
  account: string
}

export default class ERC721Proof
  extends BaseProof
  implements ERC721ProofSchema
{
  contract: string
  account: string

  get key() {
    return this.contract
  }

  static get type() {
    return 'ERC721'
  }

  equal(proof: BaseProof): boolean {
    return (
      proof instanceof ERC721Proof &&
      this.contract === proof.contract &&
      this.account === proof.account
    )
  }

  static fromJSON({
    contract,
    account,
    result,
  }: {
    contract: string
    account: string
    result?: ProofResult
  }) {
    const proof = new ERC721Proof(contract, account)
    proof.result = result
    return proof
  }

  toJSON() {
    return {
      type: ERC721Proof.type,
      contract: this.contract,
      account: this.account,
      result: this.result,
    }
  }

  constructor(contract: string, account: string) {
    super()
    this.contract = contract
    this.account = account
  }
}
