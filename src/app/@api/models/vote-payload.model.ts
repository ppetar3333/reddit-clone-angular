import { EReactionType } from './EReactionType';

export class VotePayload {
  constructor(public voteType: EReactionType, public id: number) {}
}
