import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  Upload: any;
};

export enum Adlib {
  Datway = 'datway',
  Drip = 'drip',
  ItsLit = 'itsLit',
  Splash = 'splash',
  StraightUp = 'straightUp',
  Twentyone = 'twentyone',
  Wuh = 'wuh',
  Yuh = 'yuh'
}

export type Battle = {
  __typename?: 'Battle';
  battleParticipants: Array<BattleParticipant>;
  game: Game;
  id: Scalars['ID'];
  roundIndex: Scalars['Int'];
};

export type BattleCreateInput = {
  battleParticipantsCreateInput: Array<BattleParticipantCreateInput>;
  gameCode: Scalars['ID'];
  roundIndex: Scalars['Int'];
};

export type BattleFirstSubmitInput = {
  attribute1: Scalars['String'];
  attribute2: Scalars['String'];
  attribute3: Scalars['String'];
  battleId: Scalars['ID'];
  deviceId: Scalars['String'];
};

export type BattleFirstSubmitPayload = {
  __typename?: 'BattleFirstSubmitPayload';
  battleParticipant: BattleParticipant;
};

export type BattleParticipant = {
  __typename?: 'BattleParticipant';
  attribute1?: Maybe<Scalars['String']>;
  attribute2?: Maybe<Scalars['String']>;
  attribute3?: Maybe<Scalars['String']>;
  /** we use a service for this so this is the link to that service */
  audioURL?: Maybe<Scalars['String']>;
  battle: Battle;
  id: Scalars['ID'];
  openAIFirstPart?: Maybe<Scalars['String']>;
  participant: User;
  rapText?: Maybe<Scalars['String']>;
  userMiddlePart?: Maybe<Scalars['String']>;
  votes: Array<Vote>;
};

export type BattleParticipantCreateInput = {
  attribute1?: InputMaybe<Scalars['String']>;
  attribute2?: InputMaybe<Scalars['String']>;
  attribute3?: InputMaybe<Scalars['String']>;
  battleId: Scalars['ID'];
  openAIFirstPart?: InputMaybe<Scalars['String']>;
  participantId: Scalars['ID'];
  rapText?: InputMaybe<Scalars['String']>;
  userMiddlePart?: InputMaybe<Scalars['String']>;
};

export type BattleParticipantUpdateInput = {
  attribute1?: InputMaybe<Scalars['String']>;
  attribute2?: InputMaybe<Scalars['String']>;
  attribute3?: InputMaybe<Scalars['String']>;
  battleId?: InputMaybe<Scalars['ID']>;
  openAIFirstPart?: InputMaybe<Scalars['String']>;
  participantId?: InputMaybe<Scalars['ID']>;
  rapText?: InputMaybe<Scalars['String']>;
  userMiddlePart?: InputMaybe<Scalars['String']>;
};

export type BattleSubmitInput = {
  battleId: Scalars['ID'];
  deviceId: Scalars['String'];
  middlePart: Scalars['String'];
};

export type BattleSubmitPayload = {
  __typename?: 'BattleSubmitPayload';
  battle: Battle;
};

export type BattleUpdateInput = {
  battleParticipantsCreateInput: Array<BattleParticipantCreateInput>;
  gameCode: Scalars['ID'];
  roundIndex: Scalars['Int'];
};

export type ConnectToCloudFuncPayload = {
  __typename?: 'ConnectToCloudFuncPayload';
  message?: Maybe<Scalars['String']>;
};

export type Game = {
  __typename?: 'Game';
  battles: Array<Battle>;
  gameCode: Scalars['String'];
  gameUserLink: Array<GameUserLink>;
  id: Scalars['ID'];
  numberOfRounds: Scalars['Int'];
  roundIndex: Scalars['Int'];
  state: GameState;
};

export type GameCreateInput = {
  numberOfRounds?: InputMaybe<Scalars['Int']>;
};

export type GameCreatePayload = {
  __typename?: 'GameCreatePayload';
  gameUserLink: GameUserLink;
};

export type GameJoinInput = {
  SVCModel: SvcModel;
  adlibs: Array<Adlib>;
  gameCode: Scalars['ID'];
  userId: Scalars['ID'];
};

export type GameJoinPayload = {
  __typename?: 'GameJoinPayload';
  gameUserLink: GameUserLink;
};

export type GameStartInput = {
  gameCode: Scalars['ID'];
};

export type GameStartPayload = {
  __typename?: 'GameStartPayload';
  battles: Array<Battle>;
  game: Game;
};

export enum GameState {
  Battle = 'Battle',
  FinalScreen = 'FinalScreen',
  Prompt = 'Prompt',
  Results = 'Results',
  Voting = 'Voting',
  WaitingToJoin = 'WaitingToJoin'
}

export type GameUserLink = {
  __typename?: 'GameUserLink';
  SVCModel: SvcModel;
  adlibs: Array<Adlib>;
  game: Game;
  id: Scalars['ID'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  battleFirstSubmit?: Maybe<BattleFirstSubmitPayload>;
  battleSubmit?: Maybe<BattleSubmitPayload>;
  /** game gets created instantly (and if eMail then invited) */
  connectToCloudFunc?: Maybe<ConnectToCloudFuncPayload>;
  gameCreate?: Maybe<GameCreatePayload>;
  gameJoin?: Maybe<GameJoinPayload>;
  /** game gets created instantly (and if eMail then invited) */
  gameStart?: Maybe<GameStartPayload>;
  /** game gets created instantly (and if eMail then invited) */
  userCreate?: Maybe<UserCreatePayload>;
  /** employee gets created instantly (and if eMail then invited) */
  vote?: Maybe<VotePayload>;
};


export type MutationBattleFirstSubmitArgs = {
  input: BattleFirstSubmitInput;
};


export type MutationBattleSubmitArgs = {
  input: BattleSubmitInput;
};


export type MutationGameCreateArgs = {
  input: GameCreateInput;
};


export type MutationGameJoinArgs = {
  input: GameJoinInput;
};


export type MutationGameStartArgs = {
  input: GameStartInput;
};


export type MutationUserCreateArgs = {
  input: UserCreateMutationInput;
};


export type MutationVoteArgs = {
  input: VoteInput;
};

export type Query = {
  __typename?: 'Query';
  battle?: Maybe<Battle>;
  battleViewer?: Maybe<Battle>;
  battles: Array<Battle>;
  /** code NOT id */
  game?: Maybe<Game>;
  user?: Maybe<User>;
  viewer?: Maybe<User>;
};


export type QueryBattleArgs = {
  id: Scalars['ID'];
};


export type QueryBattleViewerArgs = {
  userId: Scalars['ID'];
};


export type QueryGameArgs = {
  gameCode: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export enum SvcModel {
  Camila = 'camila',
  Carti = 'carti',
  Drake = 'drake',
  EarlSweatshirt = 'earlSweatshirt',
  FrankOcean = 'frankOcean',
  Juice = 'juice',
  Kanye = 'kanye',
  Kendrick = 'kendrick',
  NickyMinaj = 'nickyMinaj',
  Sza = 'sza',
  Weeknd = 'weeknd',
  YoungThug = 'youngThug'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** code NOT id */
  game?: Maybe<Game>;
};


export type SubscriptionGameArgs = {
  gameCode: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  battlesWhereParticipant: Array<BattleParticipant>;
  deviceId: Scalars['String'];
  gameUserLink: Array<GameUserLink>;
  id: Scalars['ID'];
  isHost: Scalars['Boolean'];
  name: Scalars['String'];
  score: Scalars['Int'];
};

/** User already exists and gets invited */
export type UserCreateInput = {
  avatar?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type UserCreateMutationInput = {
  user: UserCreateInput;
};

export type UserCreatePayload = {
  __typename?: 'UserCreatePayload';
  user: User;
};

export type UserUpdateInput = {
  avatar?: InputMaybe<Scalars['String']>;
  deviceId?: InputMaybe<Scalars['String']>;
  gameCode?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  score?: InputMaybe<Scalars['Int']>;
};

export type Vote = {
  __typename?: 'Vote';
  battleParticipant: BattleParticipant;
  id: Scalars['ID'];
  votee: User;
  voter: User;
};

export type VoteCreateInput = {
  battleId: Scalars['ID'];
  voteeId: Scalars['ID'];
  voterId: Scalars['ID'];
};

export type VoteInput = {
  battleParticipantId: Scalars['ID'];
  voterId: Scalars['ID'];
};

export type VotePayload = {
  __typename?: 'VotePayload';
  battleParticipant: BattleParticipant;
};

export type VoteUpdateInput = {
  battleId?: InputMaybe<Scalars['ID']>;
  voteeId?: InputMaybe<Scalars['ID']>;
  voterId?: InputMaybe<Scalars['ID']>;
};

export type UserFragment = { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean };

export type GameUserLinkFragment = { __typename?: 'GameUserLink', id: string, SVCModel: SvcModel, adlibs: Array<Adlib>, user: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean }, game: { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState } };

export type FullUserFragment = { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean, gameUserLink: Array<{ __typename?: 'GameUserLink', game: { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState } }> };

export type GameFragment = { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState };

export type VoteFragment = { __typename?: 'Vote', id: string, votee: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean }, voter: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean } };

export type BattleParticipantFragment = { __typename?: 'BattleParticipant', id: string, attribute1?: string | null, attribute2?: string | null, attribute3?: string | null, openAIFirstPart?: string | null, userMiddlePart?: string | null, rapText?: string | null, audioURL?: string | null, participant: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean }, votes: Array<{ __typename?: 'Vote', id: string, votee: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean }, voter: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean } }> };

export type BattleFragment = { __typename?: 'Battle', id: string, roundIndex: number, game: { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState }, battleParticipants: Array<{ __typename?: 'BattleParticipant', id: string, attribute1?: string | null, attribute2?: string | null, attribute3?: string | null, openAIFirstPart?: string | null, userMiddlePart?: string | null, rapText?: string | null, audioURL?: string | null, participant: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean }, votes: Array<{ __typename?: 'Vote', id: string, votee: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean }, voter: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean } }> }> };

export type BattleFirstSubmitMutationVariables = Exact<{
  input: BattleFirstSubmitInput;
}>;


export type BattleFirstSubmitMutation = { __typename?: 'Mutation', battleFirstSubmit?: { __typename?: 'BattleFirstSubmitPayload', battleParticipant: { __typename?: 'BattleParticipant', id: string, attribute1?: string | null, attribute2?: string | null, attribute3?: string | null, openAIFirstPart?: string | null, userMiddlePart?: string | null, rapText?: string | null, audioURL?: string | null, participant: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean }, votes: Array<{ __typename?: 'Vote', id: string, votee: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean }, voter: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean } }> } } | null };

export type BattleSubmitMutationVariables = Exact<{
  input: BattleSubmitInput;
}>;


export type BattleSubmitMutation = { __typename?: 'Mutation', battleSubmit?: { __typename?: 'BattleSubmitPayload', battle: { __typename?: 'Battle', id: string, roundIndex: number, game: { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState }, battleParticipants: Array<{ __typename?: 'BattleParticipant', id: string, attribute1?: string | null, attribute2?: string | null, attribute3?: string | null, openAIFirstPart?: string | null, userMiddlePart?: string | null, rapText?: string | null, audioURL?: string | null, participant: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean }, votes: Array<{ __typename?: 'Vote', id: string, votee: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean }, voter: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean } }> }> } } | null };

export type VoteMutationVariables = Exact<{
  input: VoteInput;
}>;


export type VoteMutation = { __typename?: 'Mutation', vote?: { __typename?: 'VotePayload', battleParticipant: { __typename?: 'BattleParticipant', id: string, attribute1?: string | null, attribute2?: string | null, attribute3?: string | null, openAIFirstPart?: string | null, userMiddlePart?: string | null, rapText?: string | null, audioURL?: string | null, participant: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean }, votes: Array<{ __typename?: 'Vote', id: string, votee: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean }, voter: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean } }> } } | null };

export type GameCreateMutationVariables = Exact<{
  input: GameCreateInput;
}>;


export type GameCreateMutation = { __typename?: 'Mutation', gameCreate?: { __typename?: 'GameCreatePayload', gameUserLink: { __typename?: 'GameUserLink', id: string, SVCModel: SvcModel, adlibs: Array<Adlib>, user: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean }, game: { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState } } } | null };

export type GameJoinMutationVariables = Exact<{
  input: GameJoinInput;
}>;


export type GameJoinMutation = { __typename?: 'Mutation', gameJoin?: { __typename?: 'GameJoinPayload', gameUserLink: { __typename?: 'GameUserLink', id: string, SVCModel: SvcModel, adlibs: Array<Adlib>, user: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean }, game: { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState } } } | null };

export type GameStartMutationVariables = Exact<{
  input: GameStartInput;
}>;


export type GameStartMutation = { __typename?: 'Mutation', gameStart?: { __typename?: 'GameStartPayload', game: { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState }, battles: Array<{ __typename?: 'Battle', id: string, roundIndex: number, game: { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState }, battleParticipants: Array<{ __typename?: 'BattleParticipant', id: string, attribute1?: string | null, attribute2?: string | null, attribute3?: string | null, openAIFirstPart?: string | null, userMiddlePart?: string | null, rapText?: string | null, audioURL?: string | null, participant: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean }, votes: Array<{ __typename?: 'Vote', id: string, votee: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean }, voter: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean } }> }> }> } | null };

export type UserCreateMutationVariables = Exact<{
  input: UserCreateMutationInput;
}>;


export type UserCreateMutation = { __typename?: 'Mutation', userCreate?: { __typename?: 'UserCreatePayload', user: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean } } | null };

export type GetGameQueryVariables = Exact<{
  gameCode: Scalars['String'];
}>;


export type GetGameQuery = { __typename?: 'Query', game?: { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState, gameUserLink: Array<{ __typename?: 'GameUserLink', id: string, SVCModel: SvcModel, adlibs: Array<Adlib>, game: { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState }, user: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean } }>, battles: Array<{ __typename?: 'Battle', id: string, roundIndex: number, game: { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState }, battleParticipants: Array<{ __typename?: 'BattleParticipant', id: string, attribute1?: string | null, attribute2?: string | null, attribute3?: string | null, openAIFirstPart?: string | null, userMiddlePart?: string | null, rapText?: string | null, audioURL?: string | null, participant: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean }, votes: Array<{ __typename?: 'Vote', id: string, votee: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean }, voter: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean } }> }> }> } | null };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean } | null };

export type GetBattleQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetBattleQuery = { __typename?: 'Query', battle?: { __typename?: 'Battle', id: string, roundIndex: number, game: { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState }, battleParticipants: Array<{ __typename?: 'BattleParticipant', id: string, attribute1?: string | null, attribute2?: string | null, attribute3?: string | null, openAIFirstPart?: string | null, userMiddlePart?: string | null, rapText?: string | null, audioURL?: string | null, participant: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean }, votes: Array<{ __typename?: 'Vote', id: string, votee: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean }, voter: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean } }> }> } | null };

export type GetBattlesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBattlesQuery = { __typename?: 'Query', battles: Array<{ __typename?: 'Battle', id: string, roundIndex: number, game: { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState }, battleParticipants: Array<{ __typename?: 'BattleParticipant', id: string, attribute1?: string | null, attribute2?: string | null, attribute3?: string | null, openAIFirstPart?: string | null, userMiddlePart?: string | null, rapText?: string | null, audioURL?: string | null, participant: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean }, votes: Array<{ __typename?: 'Vote', id: string, votee: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean }, voter: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean } }> }> }> };

export type GetBattleViewerQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetBattleViewerQuery = { __typename?: 'Query', battleViewer?: { __typename?: 'Battle', id: string, roundIndex: number, game: { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState }, battleParticipants: Array<{ __typename?: 'BattleParticipant', id: string, attribute1?: string | null, attribute2?: string | null, attribute3?: string | null, openAIFirstPart?: string | null, userMiddlePart?: string | null, rapText?: string | null, audioURL?: string | null, participant: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean }, votes: Array<{ __typename?: 'Vote', id: string, votee: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean }, voter: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean } }> }> } | null };

export type GetViewerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetViewerQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', id: string, name: string, score: number, avatar?: string | null, deviceId: string, isHost: boolean } | null };

export const UserFragmentDoc = gql`
    fragment User on User {
  id
  name
  score
  avatar
  deviceId
  isHost
}
    `;
export const GameFragmentDoc = gql`
    fragment Game on Game {
  id
  gameCode
  numberOfRounds
  roundIndex
  state
}
    `;
export const GameUserLinkFragmentDoc = gql`
    fragment GameUserLink on GameUserLink {
  id
  user {
    ...User
  }
  game {
    ...Game
  }
  SVCModel
  adlibs
}
    ${UserFragmentDoc}
${GameFragmentDoc}`;
export const FullUserFragmentDoc = gql`
    fragment FullUser on User {
  ...User
  gameUserLink {
    game {
      ...Game
    }
  }
}
    ${UserFragmentDoc}
${GameFragmentDoc}`;
export const VoteFragmentDoc = gql`
    fragment vote on Vote {
  id
  votee {
    ...User
  }
  voter {
    ...User
  }
}
    ${UserFragmentDoc}`;
export const BattleParticipantFragmentDoc = gql`
    fragment BattleParticipant on BattleParticipant {
  id
  attribute1
  attribute2
  attribute3
  openAIFirstPart
  userMiddlePart
  rapText
  audioURL
  participant {
    ...User
  }
  votes {
    ...vote
  }
}
    ${UserFragmentDoc}
${VoteFragmentDoc}`;
export const BattleFragmentDoc = gql`
    fragment Battle on Battle {
  id
  game {
    ...Game
  }
  battleParticipants {
    ...BattleParticipant
  }
  roundIndex
}
    ${GameFragmentDoc}
${BattleParticipantFragmentDoc}`;
export const BattleFirstSubmitDocument = gql`
    mutation BattleFirstSubmit($input: BattleFirstSubmitInput!) {
  battleFirstSubmit(input: $input) {
    battleParticipant {
      ...BattleParticipant
    }
  }
}
    ${BattleParticipantFragmentDoc}`;

/**
 * __useBattleFirstSubmitMutation__
 *
 * To run a mutation, you first call `useBattleFirstSubmitMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useBattleFirstSubmitMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useBattleFirstSubmitMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useBattleFirstSubmitMutation(options: VueApolloComposable.UseMutationOptions<BattleFirstSubmitMutation, BattleFirstSubmitMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<BattleFirstSubmitMutation, BattleFirstSubmitMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<BattleFirstSubmitMutation, BattleFirstSubmitMutationVariables>(BattleFirstSubmitDocument, options);
}
export type BattleFirstSubmitMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<BattleFirstSubmitMutation, BattleFirstSubmitMutationVariables>;
export const BattleSubmitDocument = gql`
    mutation BattleSubmit($input: BattleSubmitInput!) {
  battleSubmit(input: $input) {
    battle {
      ...Battle
    }
  }
}
    ${BattleFragmentDoc}`;

/**
 * __useBattleSubmitMutation__
 *
 * To run a mutation, you first call `useBattleSubmitMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useBattleSubmitMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useBattleSubmitMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useBattleSubmitMutation(options: VueApolloComposable.UseMutationOptions<BattleSubmitMutation, BattleSubmitMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<BattleSubmitMutation, BattleSubmitMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<BattleSubmitMutation, BattleSubmitMutationVariables>(BattleSubmitDocument, options);
}
export type BattleSubmitMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<BattleSubmitMutation, BattleSubmitMutationVariables>;
export const VoteDocument = gql`
    mutation Vote($input: VoteInput!) {
  vote(input: $input) {
    battleParticipant {
      ...BattleParticipant
    }
  }
}
    ${BattleParticipantFragmentDoc}`;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useVoteMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useVoteMutation(options: VueApolloComposable.UseMutationOptions<VoteMutation, VoteMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<VoteMutation, VoteMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, options);
}
export type VoteMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<VoteMutation, VoteMutationVariables>;
export const GameCreateDocument = gql`
    mutation GameCreate($input: GameCreateInput!) {
  gameCreate(input: $input) {
    gameUserLink {
      ...GameUserLink
    }
  }
}
    ${GameUserLinkFragmentDoc}`;

/**
 * __useGameCreateMutation__
 *
 * To run a mutation, you first call `useGameCreateMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useGameCreateMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useGameCreateMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useGameCreateMutation(options: VueApolloComposable.UseMutationOptions<GameCreateMutation, GameCreateMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<GameCreateMutation, GameCreateMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<GameCreateMutation, GameCreateMutationVariables>(GameCreateDocument, options);
}
export type GameCreateMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<GameCreateMutation, GameCreateMutationVariables>;
export const GameJoinDocument = gql`
    mutation GameJoin($input: GameJoinInput!) {
  gameJoin(input: $input) {
    gameUserLink {
      ...GameUserLink
    }
  }
}
    ${GameUserLinkFragmentDoc}`;

/**
 * __useGameJoinMutation__
 *
 * To run a mutation, you first call `useGameJoinMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useGameJoinMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useGameJoinMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useGameJoinMutation(options: VueApolloComposable.UseMutationOptions<GameJoinMutation, GameJoinMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<GameJoinMutation, GameJoinMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<GameJoinMutation, GameJoinMutationVariables>(GameJoinDocument, options);
}
export type GameJoinMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<GameJoinMutation, GameJoinMutationVariables>;
export const GameStartDocument = gql`
    mutation GameStart($input: GameStartInput!) {
  gameStart(input: $input) {
    game {
      ...Game
    }
    battles {
      ...Battle
    }
  }
}
    ${GameFragmentDoc}
${BattleFragmentDoc}`;

/**
 * __useGameStartMutation__
 *
 * To run a mutation, you first call `useGameStartMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useGameStartMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useGameStartMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useGameStartMutation(options: VueApolloComposable.UseMutationOptions<GameStartMutation, GameStartMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<GameStartMutation, GameStartMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<GameStartMutation, GameStartMutationVariables>(GameStartDocument, options);
}
export type GameStartMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<GameStartMutation, GameStartMutationVariables>;
export const UserCreateDocument = gql`
    mutation UserCreate($input: UserCreateMutationInput!) {
  userCreate(input: $input) {
    user {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;

/**
 * __useUserCreateMutation__
 *
 * To run a mutation, you first call `useUserCreateMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUserCreateMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUserCreateMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUserCreateMutation(options: VueApolloComposable.UseMutationOptions<UserCreateMutation, UserCreateMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UserCreateMutation, UserCreateMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UserCreateMutation, UserCreateMutationVariables>(UserCreateDocument, options);
}
export type UserCreateMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UserCreateMutation, UserCreateMutationVariables>;
export const GetGameDocument = gql`
    query GetGame($gameCode: String!) {
  game(gameCode: $gameCode) {
    ...Game
    gameUserLink {
      ...GameUserLink
      game {
        ...Game
      }
      user {
        ...User
      }
    }
    battles {
      ...Battle
    }
  }
}
    ${GameFragmentDoc}
${GameUserLinkFragmentDoc}
${UserFragmentDoc}
${BattleFragmentDoc}`;

/**
 * __useGetGameQuery__
 *
 * To run a query within a Vue component, call `useGetGameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGameQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetGameQuery({
 *   gameCode: // value for 'gameCode'
 * });
 */
export function useGetGameQuery(variables: GetGameQueryVariables | VueCompositionApi.Ref<GetGameQueryVariables> | ReactiveFunction<GetGameQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetGameQuery, GetGameQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetGameQuery, GetGameQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetGameQuery, GetGameQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetGameQuery, GetGameQueryVariables>(GetGameDocument, variables, options);
}
export function useGetGameLazyQuery(variables: GetGameQueryVariables | VueCompositionApi.Ref<GetGameQueryVariables> | ReactiveFunction<GetGameQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetGameQuery, GetGameQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetGameQuery, GetGameQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetGameQuery, GetGameQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetGameQuery, GetGameQueryVariables>(GetGameDocument, variables, options);
}
export type GetGameQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetGameQuery, GetGameQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($id: ID!) {
  user(id: $id) {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a Vue component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetUserQuery({
 *   id: // value for 'id'
 * });
 */
export function useGetUserQuery(variables: GetUserQueryVariables | VueCompositionApi.Ref<GetUserQueryVariables> | ReactiveFunction<GetUserQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetUserQuery, GetUserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetUserQuery, GetUserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetUserQuery, GetUserQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, variables, options);
}
export function useGetUserLazyQuery(variables: GetUserQueryVariables | VueCompositionApi.Ref<GetUserQueryVariables> | ReactiveFunction<GetUserQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetUserQuery, GetUserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetUserQuery, GetUserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetUserQuery, GetUserQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, variables, options);
}
export type GetUserQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetUserQuery, GetUserQueryVariables>;
export const GetBattleDocument = gql`
    query GetBattle($id: ID!) {
  battle(id: $id) {
    ...Battle
  }
}
    ${BattleFragmentDoc}`;

/**
 * __useGetBattleQuery__
 *
 * To run a query within a Vue component, call `useGetBattleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBattleQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetBattleQuery({
 *   id: // value for 'id'
 * });
 */
export function useGetBattleQuery(variables: GetBattleQueryVariables | VueCompositionApi.Ref<GetBattleQueryVariables> | ReactiveFunction<GetBattleQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetBattleQuery, GetBattleQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetBattleQuery, GetBattleQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetBattleQuery, GetBattleQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetBattleQuery, GetBattleQueryVariables>(GetBattleDocument, variables, options);
}
export function useGetBattleLazyQuery(variables: GetBattleQueryVariables | VueCompositionApi.Ref<GetBattleQueryVariables> | ReactiveFunction<GetBattleQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetBattleQuery, GetBattleQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetBattleQuery, GetBattleQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetBattleQuery, GetBattleQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetBattleQuery, GetBattleQueryVariables>(GetBattleDocument, variables, options);
}
export type GetBattleQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetBattleQuery, GetBattleQueryVariables>;
export const GetBattlesDocument = gql`
    query GetBattles {
  battles {
    ...Battle
  }
}
    ${BattleFragmentDoc}`;

/**
 * __useGetBattlesQuery__
 *
 * To run a query within a Vue component, call `useGetBattlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBattlesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetBattlesQuery();
 */
export function useGetBattlesQuery(options: VueApolloComposable.UseQueryOptions<GetBattlesQuery, GetBattlesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetBattlesQuery, GetBattlesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetBattlesQuery, GetBattlesQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetBattlesQuery, GetBattlesQueryVariables>(GetBattlesDocument, {}, options);
}
export function useGetBattlesLazyQuery(options: VueApolloComposable.UseQueryOptions<GetBattlesQuery, GetBattlesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetBattlesQuery, GetBattlesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetBattlesQuery, GetBattlesQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetBattlesQuery, GetBattlesQueryVariables>(GetBattlesDocument, {}, options);
}
export type GetBattlesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetBattlesQuery, GetBattlesQueryVariables>;
export const GetBattleViewerDocument = gql`
    query GetBattleViewer($userId: ID!) {
  battleViewer(userId: $userId) {
    ...Battle
  }
}
    ${BattleFragmentDoc}`;

/**
 * __useGetBattleViewerQuery__
 *
 * To run a query within a Vue component, call `useGetBattleViewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBattleViewerQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetBattleViewerQuery({
 *   userId: // value for 'userId'
 * });
 */
export function useGetBattleViewerQuery(variables: GetBattleViewerQueryVariables | VueCompositionApi.Ref<GetBattleViewerQueryVariables> | ReactiveFunction<GetBattleViewerQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetBattleViewerQuery, GetBattleViewerQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetBattleViewerQuery, GetBattleViewerQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetBattleViewerQuery, GetBattleViewerQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetBattleViewerQuery, GetBattleViewerQueryVariables>(GetBattleViewerDocument, variables, options);
}
export function useGetBattleViewerLazyQuery(variables: GetBattleViewerQueryVariables | VueCompositionApi.Ref<GetBattleViewerQueryVariables> | ReactiveFunction<GetBattleViewerQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetBattleViewerQuery, GetBattleViewerQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetBattleViewerQuery, GetBattleViewerQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetBattleViewerQuery, GetBattleViewerQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetBattleViewerQuery, GetBattleViewerQueryVariables>(GetBattleViewerDocument, variables, options);
}
export type GetBattleViewerQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetBattleViewerQuery, GetBattleViewerQueryVariables>;
export const GetViewerDocument = gql`
    query GetViewer {
  viewer {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetViewerQuery__
 *
 * To run a query within a Vue component, call `useGetViewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetViewerQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetViewerQuery();
 */
export function useGetViewerQuery(options: VueApolloComposable.UseQueryOptions<GetViewerQuery, GetViewerQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetViewerQuery, GetViewerQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetViewerQuery, GetViewerQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetViewerQuery, GetViewerQueryVariables>(GetViewerDocument, {}, options);
}
export function useGetViewerLazyQuery(options: VueApolloComposable.UseQueryOptions<GetViewerQuery, GetViewerQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetViewerQuery, GetViewerQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetViewerQuery, GetViewerQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetViewerQuery, GetViewerQueryVariables>(GetViewerDocument, {}, options);
}
export type GetViewerQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetViewerQuery, GetViewerQueryVariables>;