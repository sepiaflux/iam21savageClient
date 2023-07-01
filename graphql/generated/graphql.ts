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
  active: Scalars['Boolean'];
  gameRound: GameRound;
  id: Scalars['ID'];
  participations: Array<BattleParticipation>;
};

export type BattleCreateInput = {
  battleParticipationsCreateInput: Array<BattleParticipationCreateInput>;
  gameCode: Scalars['ID'];
  roundIndex: Scalars['Int'];
};

export type BattleNextActiveInput = {
  battleId: Scalars['ID'];
};

export type BattleNextActivePayload = {
  __typename?: 'BattleNextActivePayload';
  game: Game;
  newBattle: Battle;
  oldBattle: Battle;
};

export type BattleParticipation = {
  __typename?: 'BattleParticipation';
  /** we use a service for this so this is the link to that service */
  audioURL?: Maybe<Scalars['String']>;
  avatarVideoId?: Maybe<Scalars['String']>;
  avatarVideoURL?: Maybe<Scalars['String']>;
  battle: Battle;
  id: Scalars['ID'];
  openAIFirstPart?: Maybe<Scalars['String']>;
  participant: GameUserLink;
  rapText?: Maybe<Scalars['String']>;
  userRapLines: Array<Scalars['String']>;
  votes: Array<Vote>;
};

export type BattleParticipationCreateInput = {
  attribute1?: InputMaybe<Scalars['String']>;
  attribute2?: InputMaybe<Scalars['String']>;
  attribute3?: InputMaybe<Scalars['String']>;
  battleId: Scalars['ID'];
  openAIFirstPart?: InputMaybe<Scalars['String']>;
  participantId: Scalars['ID'];
  rapText?: InputMaybe<Scalars['String']>;
  userRapLines: Array<Scalars['String']>;
};

export type BattleParticipationUpdateInput = {
  attribute1?: InputMaybe<Scalars['String']>;
  attribute2?: InputMaybe<Scalars['String']>;
  attribute3?: InputMaybe<Scalars['String']>;
  battleId?: InputMaybe<Scalars['ID']>;
  openAIFirstPart?: InputMaybe<Scalars['String']>;
  participantId?: InputMaybe<Scalars['ID']>;
  rapText?: InputMaybe<Scalars['String']>;
  userRapLines: Array<Scalars['String']>;
};

export type BattleSubmitInput = {
  battleId: Scalars['ID'];
  userRapLines: Array<Scalars['String']>;
};

export type BattleSubmitPayload = {
  __typename?: 'BattleSubmitPayload';
  battle: Battle;
};

export type BattleUpdateInput = {
  battleParticipationsCreateInput: Array<BattleParticipationCreateInput>;
  gameCode: Scalars['ID'];
  roundIndex: Scalars['Int'];
};

export type ConnectToCloudFuncPayload = {
  __typename?: 'ConnectToCloudFuncPayload';
  message?: Maybe<Scalars['String']>;
};

export type Game = {
  __typename?: 'Game';
  gameCode: Scalars['String'];
  gameRounds: Array<GameRound>;
  gameUserLinks: Array<GameUserLink>;
  id: Scalars['ID'];
  state: GameState;
};

export type GameCreatePayload = {
  __typename?: 'GameCreatePayload';
  gameUserLink: GameUserLink;
  token?: Maybe<Scalars['String']>;
};

export type GameJoinInput = {
  gameCode: Scalars['ID'];
  name: Scalars['String'];
};

export type GameJoinPayload = {
  __typename?: 'GameJoinPayload';
  gameUserLink: GameUserLink;
  token?: Maybe<Scalars['String']>;
};

export type GameRound = {
  __typename?: 'GameRound';
  active: Scalars['Boolean'];
  battles: Array<Battle>;
  game: Game;
  id: Scalars['ID'];
};

export type GameStartInput = {
  gameCode: Scalars['ID'];
  numberOfRounds: Scalars['Int'];
};

export type GameStartPayload = {
  __typename?: 'GameStartPayload';
  game: Game;
};

export enum GameState {
  Attributes = 'Attributes',
  Battle = 'Battle',
  FinalScreen = 'FinalScreen',
  Loading = 'Loading',
  Prompt = 'Prompt',
  Results = 'Results',
  Voting = 'Voting',
  WaitingToJoin = 'WaitingToJoin'
}

export type GameUserLink = {
  __typename?: 'GameUserLink';
  SVCModel: SvcModel;
  adlibs: Array<Adlib>;
  battleParticipations: Array<BattleParticipation>;
  battles: Array<Battle>;
  game: Game;
  givenAttributesAuthored: Array<GivenAttribute>;
  id: Scalars['ID'];
  isHost: Scalars['Boolean'];
  user: User;
};

export type GivenAttribute = {
  __typename?: 'GivenAttribute';
  attribute?: Maybe<Scalars['String']>;
  author: GameUserLink;
  game: Game;
  id: Scalars['ID'];
  target: GameUserLink;
};

export type GivenAttributeSubmitInput = {
  attribute: Scalars['String'];
  givenAttributeId: Scalars['ID'];
};

export type GivenAttributeSubmitPayload = {
  __typename?: 'GivenAttributeSubmitPayload';
  givenAttribute: GivenAttribute;
};

export type Mutation = {
  __typename?: 'Mutation';
  battleNextActive?: Maybe<BattleNextActivePayload>;
  battleSubmit?: Maybe<BattleSubmitPayload>;
  /** game gets created instantly (and if eMail then invited) */
  connectToCloudFunc?: Maybe<ConnectToCloudFuncPayload>;
  gameCreate?: Maybe<GameCreatePayload>;
  gameJoin?: Maybe<GameJoinPayload>;
  /** start the game */
  gameStart?: Maybe<GameStartPayload>;
  givenAttributeSubmit?: Maybe<GivenAttributeSubmitPayload>;
  vote?: Maybe<VotePayload>;
};


export type MutationBattleNextActiveArgs = {
  input: BattleNextActiveInput;
};


export type MutationBattleSubmitArgs = {
  input: BattleSubmitInput;
};


export type MutationGameJoinArgs = {
  input: GameJoinInput;
};


export type MutationGameStartArgs = {
  input: GameStartInput;
};


export type MutationGivenAttributeSubmitArgs = {
  input: GivenAttributeSubmitInput;
};


export type MutationVoteArgs = {
  input: VoteInput;
};

export type Query = {
  __typename?: 'Query';
  /** code NOT id */
  game?: Maybe<Game>;
  gameUserLinkByCode?: Maybe<GameUserLink>;
  user?: Maybe<User>;
  viewer?: Maybe<User>;
};


export type QueryGameArgs = {
  gameCode: Scalars['String'];
};


export type QueryGameUserLinkByCodeArgs = {
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
  battlesWhereParticipant: Array<BattleParticipation>;
  gameUserLinks: Array<GameUserLink>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

/** User already exists and gets invited */
export type UserCreateInput = {
  avatar?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
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
  battleParticipation: BattleParticipation;
  id: Scalars['ID'];
  voter: GameUserLink;
};

export type VoteCreateInput = {
  battleId: Scalars['ID'];
  voteeId: Scalars['ID'];
  voterId: Scalars['ID'];
};

export type VoteInput = {
  battleParticipationId: Scalars['ID'];
};

export type VotePayload = {
  __typename?: 'VotePayload';
  battleParticipation: BattleParticipation;
};

export type VoteUpdateInput = {
  battleId?: InputMaybe<Scalars['ID']>;
  voteeId?: InputMaybe<Scalars['ID']>;
  voterId?: InputMaybe<Scalars['ID']>;
};

export type GameInfoFragment = { __typename?: 'Game', id: string, gameCode: string, state: GameState };

export type GameUserLinkInfoFragment = { __typename?: 'GameUserLink', id: string, isHost: boolean, SVCModel: SvcModel, adlibs: Array<Adlib>, game: { __typename?: 'Game', id: string, gameCode: string, state: GameState }, user: { __typename?: 'User', id: string, name: string, avatar?: string | null } };

export type GivenAttributeInfoFragment = { __typename?: 'GivenAttribute', id: string, attribute?: string | null, target: { __typename?: 'GameUserLink', id: string, user: { __typename?: 'User', id: string, name: string } } };

export type GameCreateMutationVariables = Exact<{ [key: string]: never; }>;


export type GameCreateMutation = { __typename?: 'Mutation', gameCreate?: { __typename?: 'GameCreatePayload', token?: string | null, gameUserLink: { __typename?: 'GameUserLink', id: string, isHost: boolean, SVCModel: SvcModel, adlibs: Array<Adlib>, game: { __typename?: 'Game', id: string, gameCode: string, state: GameState }, user: { __typename?: 'User', id: string, name: string, avatar?: string | null } } } | null };

export type GameJoinMutationVariables = Exact<{
  input: GameJoinInput;
}>;


export type GameJoinMutation = { __typename?: 'Mutation', gameJoin?: { __typename?: 'GameJoinPayload', token?: string | null, gameUserLink: { __typename?: 'GameUserLink', id: string, isHost: boolean, SVCModel: SvcModel, adlibs: Array<Adlib>, game: { __typename?: 'Game', id: string, gameCode: string, state: GameState }, user: { __typename?: 'User', id: string, name: string, avatar?: string | null } } } | null };

export type GameStartMutationVariables = Exact<{
  input: GameStartInput;
}>;


export type GameStartMutation = { __typename?: 'Mutation', gameStart?: { __typename?: 'GameStartPayload', game: { __typename?: 'Game', id: string, gameCode: string, state: GameState } } | null };

export type GivenAttributeSubmitMutationVariables = Exact<{
  input: GivenAttributeSubmitInput;
}>;


export type GivenAttributeSubmitMutation = { __typename?: 'Mutation', givenAttributeSubmit?: { __typename?: 'GivenAttributeSubmitPayload', givenAttribute: { __typename?: 'GivenAttribute', id: string, attribute?: string | null, target: { __typename?: 'GameUserLink', id: string, user: { __typename?: 'User', id: string, name: string } } } } | null };

export type BattleSubmitMutationVariables = Exact<{
  input: BattleSubmitInput;
}>;


export type BattleSubmitMutation = { __typename?: 'Mutation', battleSubmit?: { __typename?: 'BattleSubmitPayload', battle: { __typename?: 'Battle', id: string, gameRound: { __typename?: 'GameRound', id: string, active: boolean }, participations: Array<{ __typename?: 'BattleParticipation', id: string, openAIFirstPart?: string | null, userRapLines: Array<string>, participant: { __typename?: 'GameUserLink', id: string, user: { __typename?: 'User', id: string, name: string, avatar?: string | null } } }> } } | null };

export type BattleNextActiveMutationVariables = Exact<{
  input: BattleNextActiveInput;
}>;


export type BattleNextActiveMutation = { __typename?: 'Mutation', battleNextActive?: { __typename?: 'BattleNextActivePayload', oldBattle: { __typename?: 'Battle', id: string, active: boolean }, newBattle: { __typename?: 'Battle', id: string, active: boolean } } | null };

export type GameInfoQueryVariables = Exact<{
  gameCode: Scalars['String'];
}>;


export type GameInfoQuery = { __typename?: 'Query', game?: { __typename?: 'Game', id: string, gameCode: string, state: GameState } | null };

export type GamePlayersQueryVariables = Exact<{
  gameCode: Scalars['String'];
}>;


export type GamePlayersQuery = { __typename?: 'Query', game?: { __typename?: 'Game', id: string, gameCode: string, state: GameState, gameUserLinks: Array<{ __typename?: 'GameUserLink', id: string, SVCModel: SvcModel, isHost: boolean, user: { __typename?: 'User', id: string, name: string, avatar?: string | null } }> } | null };

export type GameUserLinkInfoByCodeQueryVariables = Exact<{
  gameCode: Scalars['String'];
}>;


export type GameUserLinkInfoByCodeQuery = { __typename?: 'Query', gameUserLinkByCode?: { __typename?: 'GameUserLink', id: string, isHost: boolean, SVCModel: SvcModel, adlibs: Array<Adlib>, game: { __typename?: 'Game', id: string, gameCode: string, state: GameState }, user: { __typename?: 'User', id: string, name: string, avatar?: string | null } } | null };

export type GameUserLinkAttributesByCodeQueryVariables = Exact<{
  gameCode: Scalars['String'];
}>;


export type GameUserLinkAttributesByCodeQuery = { __typename?: 'Query', gameUserLinkByCode?: { __typename?: 'GameUserLink', id: string, givenAttributesAuthored: Array<{ __typename?: 'GivenAttribute', id: string, attribute?: string | null, target: { __typename?: 'GameUserLink', id: string, user: { __typename?: 'User', id: string, name: string } } }> } | null };

export type GameUserLinkBattleParticipationsByCodeQueryVariables = Exact<{
  gameCode: Scalars['String'];
}>;


export type GameUserLinkBattleParticipationsByCodeQuery = { __typename?: 'Query', gameUserLinkByCode?: { __typename?: 'GameUserLink', id: string, battleParticipations: Array<{ __typename?: 'BattleParticipation', id: string, openAIFirstPart?: string | null, userRapLines: Array<string>, battle: { __typename?: 'Battle', id: string, gameRound: { __typename?: 'GameRound', id: string, active: boolean }, participations: Array<{ __typename?: 'BattleParticipation', id: string, participant: { __typename?: 'GameUserLink', id: string, user: { __typename?: 'User', id: string, name: string, avatar?: string | null } } }> } }> } | null };

export type GameUserLinkBattlesByCodeQueryVariables = Exact<{
  gameCode: Scalars['String'];
}>;


export type GameUserLinkBattlesByCodeQuery = { __typename?: 'Query', gameUserLinkByCode?: { __typename?: 'GameUserLink', id: string, game: { __typename?: 'Game', id: string, state: GameState, gameRounds: Array<{ __typename?: 'GameRound', id: string, active: boolean, battles: Array<{ __typename?: 'Battle', id: string, active: boolean, participations: Array<{ __typename?: 'BattleParticipation', id: string, rapText?: string | null, audioURL?: string | null, avatarVideoURL?: string | null, participant: { __typename?: 'GameUserLink', id: string, user: { __typename?: 'User', id: string, name: string, avatar?: string | null } } }> }> }> } } | null };

export const GameInfoFragmentDoc = gql`
    fragment GameInfo on Game {
  id
  gameCode
  state
}
    `;
export const GameUserLinkInfoFragmentDoc = gql`
    fragment GameUserLinkInfo on GameUserLink {
  id
  isHost
  game {
    ...GameInfo
  }
  user {
    id
    name
    avatar
  }
  SVCModel
  adlibs
}
    ${GameInfoFragmentDoc}`;
export const GivenAttributeInfoFragmentDoc = gql`
    fragment GivenAttributeInfo on GivenAttribute {
  id
  attribute
  target {
    id
    user {
      id
      name
    }
  }
}
    `;
export const GameCreateDocument = gql`
    mutation gameCreate {
  gameCreate {
    gameUserLink {
      ...GameUserLinkInfo
    }
    token
  }
}
    ${GameUserLinkInfoFragmentDoc}`;

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
 * const { mutate, loading, error, onDone } = useGameCreateMutation();
 */
export function useGameCreateMutation(options: VueApolloComposable.UseMutationOptions<GameCreateMutation, GameCreateMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<GameCreateMutation, GameCreateMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<GameCreateMutation, GameCreateMutationVariables>(GameCreateDocument, options);
}
export type GameCreateMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<GameCreateMutation, GameCreateMutationVariables>;
export const GameJoinDocument = gql`
    mutation gameJoin($input: GameJoinInput!) {
  gameJoin(input: $input) {
    gameUserLink {
      ...GameUserLinkInfo
    }
    token
  }
}
    ${GameUserLinkInfoFragmentDoc}`;

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
    mutation gameStart($input: GameStartInput!) {
  gameStart(input: $input) {
    game {
      ...GameInfo
    }
  }
}
    ${GameInfoFragmentDoc}`;

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
export const GivenAttributeSubmitDocument = gql`
    mutation givenAttributeSubmit($input: GivenAttributeSubmitInput!) {
  givenAttributeSubmit(input: $input) {
    givenAttribute {
      ...GivenAttributeInfo
    }
  }
}
    ${GivenAttributeInfoFragmentDoc}`;

/**
 * __useGivenAttributeSubmitMutation__
 *
 * To run a mutation, you first call `useGivenAttributeSubmitMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useGivenAttributeSubmitMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useGivenAttributeSubmitMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useGivenAttributeSubmitMutation(options: VueApolloComposable.UseMutationOptions<GivenAttributeSubmitMutation, GivenAttributeSubmitMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<GivenAttributeSubmitMutation, GivenAttributeSubmitMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<GivenAttributeSubmitMutation, GivenAttributeSubmitMutationVariables>(GivenAttributeSubmitDocument, options);
}
export type GivenAttributeSubmitMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<GivenAttributeSubmitMutation, GivenAttributeSubmitMutationVariables>;
export const BattleSubmitDocument = gql`
    mutation battleSubmit($input: BattleSubmitInput!) {
  battleSubmit(input: $input) {
    battle {
      id
      gameRound {
        id
        active
      }
      participations {
        id
        openAIFirstPart
        userRapLines
        participant {
          id
          user {
            id
            name
            avatar
          }
        }
      }
    }
  }
}
    `;

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
export const BattleNextActiveDocument = gql`
    mutation battleNextActive($input: BattleNextActiveInput!) {
  battleNextActive(input: $input) {
    oldBattle {
      id
      active
    }
    newBattle {
      id
      active
    }
  }
}
    `;

/**
 * __useBattleNextActiveMutation__
 *
 * To run a mutation, you first call `useBattleNextActiveMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useBattleNextActiveMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useBattleNextActiveMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useBattleNextActiveMutation(options: VueApolloComposable.UseMutationOptions<BattleNextActiveMutation, BattleNextActiveMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<BattleNextActiveMutation, BattleNextActiveMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<BattleNextActiveMutation, BattleNextActiveMutationVariables>(BattleNextActiveDocument, options);
}
export type BattleNextActiveMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<BattleNextActiveMutation, BattleNextActiveMutationVariables>;
export const GameInfoDocument = gql`
    query gameInfo($gameCode: String!) {
  game(gameCode: $gameCode) {
    ...GameInfo
  }
}
    ${GameInfoFragmentDoc}`;

/**
 * __useGameInfoQuery__
 *
 * To run a query within a Vue component, call `useGameInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGameInfoQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGameInfoQuery({
 *   gameCode: // value for 'gameCode'
 * });
 */
export function useGameInfoQuery(variables: GameInfoQueryVariables | VueCompositionApi.Ref<GameInfoQueryVariables> | ReactiveFunction<GameInfoQueryVariables>, options: VueApolloComposable.UseQueryOptions<GameInfoQuery, GameInfoQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GameInfoQuery, GameInfoQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GameInfoQuery, GameInfoQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GameInfoQuery, GameInfoQueryVariables>(GameInfoDocument, variables, options);
}
export function useGameInfoLazyQuery(variables: GameInfoQueryVariables | VueCompositionApi.Ref<GameInfoQueryVariables> | ReactiveFunction<GameInfoQueryVariables>, options: VueApolloComposable.UseQueryOptions<GameInfoQuery, GameInfoQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GameInfoQuery, GameInfoQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GameInfoQuery, GameInfoQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GameInfoQuery, GameInfoQueryVariables>(GameInfoDocument, variables, options);
}
export type GameInfoQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GameInfoQuery, GameInfoQueryVariables>;
export const GamePlayersDocument = gql`
    query gamePlayers($gameCode: String!) {
  game(gameCode: $gameCode) {
    ...GameInfo
    gameUserLinks {
      id
      SVCModel
      isHost
      user {
        id
        name
        avatar
      }
    }
  }
}
    ${GameInfoFragmentDoc}`;

/**
 * __useGamePlayersQuery__
 *
 * To run a query within a Vue component, call `useGamePlayersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGamePlayersQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGamePlayersQuery({
 *   gameCode: // value for 'gameCode'
 * });
 */
export function useGamePlayersQuery(variables: GamePlayersQueryVariables | VueCompositionApi.Ref<GamePlayersQueryVariables> | ReactiveFunction<GamePlayersQueryVariables>, options: VueApolloComposable.UseQueryOptions<GamePlayersQuery, GamePlayersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GamePlayersQuery, GamePlayersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GamePlayersQuery, GamePlayersQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GamePlayersQuery, GamePlayersQueryVariables>(GamePlayersDocument, variables, options);
}
export function useGamePlayersLazyQuery(variables: GamePlayersQueryVariables | VueCompositionApi.Ref<GamePlayersQueryVariables> | ReactiveFunction<GamePlayersQueryVariables>, options: VueApolloComposable.UseQueryOptions<GamePlayersQuery, GamePlayersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GamePlayersQuery, GamePlayersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GamePlayersQuery, GamePlayersQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GamePlayersQuery, GamePlayersQueryVariables>(GamePlayersDocument, variables, options);
}
export type GamePlayersQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GamePlayersQuery, GamePlayersQueryVariables>;
export const GameUserLinkInfoByCodeDocument = gql`
    query gameUserLinkInfoByCode($gameCode: String!) {
  gameUserLinkByCode(gameCode: $gameCode) {
    ...GameUserLinkInfo
  }
}
    ${GameUserLinkInfoFragmentDoc}`;

/**
 * __useGameUserLinkInfoByCodeQuery__
 *
 * To run a query within a Vue component, call `useGameUserLinkInfoByCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGameUserLinkInfoByCodeQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGameUserLinkInfoByCodeQuery({
 *   gameCode: // value for 'gameCode'
 * });
 */
export function useGameUserLinkInfoByCodeQuery(variables: GameUserLinkInfoByCodeQueryVariables | VueCompositionApi.Ref<GameUserLinkInfoByCodeQueryVariables> | ReactiveFunction<GameUserLinkInfoByCodeQueryVariables>, options: VueApolloComposable.UseQueryOptions<GameUserLinkInfoByCodeQuery, GameUserLinkInfoByCodeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GameUserLinkInfoByCodeQuery, GameUserLinkInfoByCodeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GameUserLinkInfoByCodeQuery, GameUserLinkInfoByCodeQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GameUserLinkInfoByCodeQuery, GameUserLinkInfoByCodeQueryVariables>(GameUserLinkInfoByCodeDocument, variables, options);
}
export function useGameUserLinkInfoByCodeLazyQuery(variables: GameUserLinkInfoByCodeQueryVariables | VueCompositionApi.Ref<GameUserLinkInfoByCodeQueryVariables> | ReactiveFunction<GameUserLinkInfoByCodeQueryVariables>, options: VueApolloComposable.UseQueryOptions<GameUserLinkInfoByCodeQuery, GameUserLinkInfoByCodeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GameUserLinkInfoByCodeQuery, GameUserLinkInfoByCodeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GameUserLinkInfoByCodeQuery, GameUserLinkInfoByCodeQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GameUserLinkInfoByCodeQuery, GameUserLinkInfoByCodeQueryVariables>(GameUserLinkInfoByCodeDocument, variables, options);
}
export type GameUserLinkInfoByCodeQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GameUserLinkInfoByCodeQuery, GameUserLinkInfoByCodeQueryVariables>;
export const GameUserLinkAttributesByCodeDocument = gql`
    query gameUserLinkAttributesByCode($gameCode: String!) {
  gameUserLinkByCode(gameCode: $gameCode) {
    id
    givenAttributesAuthored {
      ...GivenAttributeInfo
    }
  }
}
    ${GivenAttributeInfoFragmentDoc}`;

/**
 * __useGameUserLinkAttributesByCodeQuery__
 *
 * To run a query within a Vue component, call `useGameUserLinkAttributesByCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGameUserLinkAttributesByCodeQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGameUserLinkAttributesByCodeQuery({
 *   gameCode: // value for 'gameCode'
 * });
 */
export function useGameUserLinkAttributesByCodeQuery(variables: GameUserLinkAttributesByCodeQueryVariables | VueCompositionApi.Ref<GameUserLinkAttributesByCodeQueryVariables> | ReactiveFunction<GameUserLinkAttributesByCodeQueryVariables>, options: VueApolloComposable.UseQueryOptions<GameUserLinkAttributesByCodeQuery, GameUserLinkAttributesByCodeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GameUserLinkAttributesByCodeQuery, GameUserLinkAttributesByCodeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GameUserLinkAttributesByCodeQuery, GameUserLinkAttributesByCodeQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GameUserLinkAttributesByCodeQuery, GameUserLinkAttributesByCodeQueryVariables>(GameUserLinkAttributesByCodeDocument, variables, options);
}
export function useGameUserLinkAttributesByCodeLazyQuery(variables: GameUserLinkAttributesByCodeQueryVariables | VueCompositionApi.Ref<GameUserLinkAttributesByCodeQueryVariables> | ReactiveFunction<GameUserLinkAttributesByCodeQueryVariables>, options: VueApolloComposable.UseQueryOptions<GameUserLinkAttributesByCodeQuery, GameUserLinkAttributesByCodeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GameUserLinkAttributesByCodeQuery, GameUserLinkAttributesByCodeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GameUserLinkAttributesByCodeQuery, GameUserLinkAttributesByCodeQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GameUserLinkAttributesByCodeQuery, GameUserLinkAttributesByCodeQueryVariables>(GameUserLinkAttributesByCodeDocument, variables, options);
}
export type GameUserLinkAttributesByCodeQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GameUserLinkAttributesByCodeQuery, GameUserLinkAttributesByCodeQueryVariables>;
export const GameUserLinkBattleParticipationsByCodeDocument = gql`
    query gameUserLinkBattleParticipationsByCode($gameCode: String!) {
  gameUserLinkByCode(gameCode: $gameCode) {
    id
    battleParticipations {
      id
      openAIFirstPart
      userRapLines
      battle {
        id
        gameRound {
          id
          active
        }
        participations {
          id
          participant {
            id
            user {
              id
              name
              avatar
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGameUserLinkBattleParticipationsByCodeQuery__
 *
 * To run a query within a Vue component, call `useGameUserLinkBattleParticipationsByCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGameUserLinkBattleParticipationsByCodeQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGameUserLinkBattleParticipationsByCodeQuery({
 *   gameCode: // value for 'gameCode'
 * });
 */
export function useGameUserLinkBattleParticipationsByCodeQuery(variables: GameUserLinkBattleParticipationsByCodeQueryVariables | VueCompositionApi.Ref<GameUserLinkBattleParticipationsByCodeQueryVariables> | ReactiveFunction<GameUserLinkBattleParticipationsByCodeQueryVariables>, options: VueApolloComposable.UseQueryOptions<GameUserLinkBattleParticipationsByCodeQuery, GameUserLinkBattleParticipationsByCodeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GameUserLinkBattleParticipationsByCodeQuery, GameUserLinkBattleParticipationsByCodeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GameUserLinkBattleParticipationsByCodeQuery, GameUserLinkBattleParticipationsByCodeQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GameUserLinkBattleParticipationsByCodeQuery, GameUserLinkBattleParticipationsByCodeQueryVariables>(GameUserLinkBattleParticipationsByCodeDocument, variables, options);
}
export function useGameUserLinkBattleParticipationsByCodeLazyQuery(variables: GameUserLinkBattleParticipationsByCodeQueryVariables | VueCompositionApi.Ref<GameUserLinkBattleParticipationsByCodeQueryVariables> | ReactiveFunction<GameUserLinkBattleParticipationsByCodeQueryVariables>, options: VueApolloComposable.UseQueryOptions<GameUserLinkBattleParticipationsByCodeQuery, GameUserLinkBattleParticipationsByCodeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GameUserLinkBattleParticipationsByCodeQuery, GameUserLinkBattleParticipationsByCodeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GameUserLinkBattleParticipationsByCodeQuery, GameUserLinkBattleParticipationsByCodeQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GameUserLinkBattleParticipationsByCodeQuery, GameUserLinkBattleParticipationsByCodeQueryVariables>(GameUserLinkBattleParticipationsByCodeDocument, variables, options);
}
export type GameUserLinkBattleParticipationsByCodeQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GameUserLinkBattleParticipationsByCodeQuery, GameUserLinkBattleParticipationsByCodeQueryVariables>;
export const GameUserLinkBattlesByCodeDocument = gql`
    query gameUserLinkBattlesByCode($gameCode: String!) {
  gameUserLinkByCode(gameCode: $gameCode) {
    id
    game {
      id
      state
      gameRounds {
        id
        active
        battles {
          id
          active
          participations {
            id
            rapText
            audioURL
            avatarVideoURL
            participant {
              id
              user {
                id
                name
                avatar
              }
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGameUserLinkBattlesByCodeQuery__
 *
 * To run a query within a Vue component, call `useGameUserLinkBattlesByCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGameUserLinkBattlesByCodeQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGameUserLinkBattlesByCodeQuery({
 *   gameCode: // value for 'gameCode'
 * });
 */
export function useGameUserLinkBattlesByCodeQuery(variables: GameUserLinkBattlesByCodeQueryVariables | VueCompositionApi.Ref<GameUserLinkBattlesByCodeQueryVariables> | ReactiveFunction<GameUserLinkBattlesByCodeQueryVariables>, options: VueApolloComposable.UseQueryOptions<GameUserLinkBattlesByCodeQuery, GameUserLinkBattlesByCodeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GameUserLinkBattlesByCodeQuery, GameUserLinkBattlesByCodeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GameUserLinkBattlesByCodeQuery, GameUserLinkBattlesByCodeQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GameUserLinkBattlesByCodeQuery, GameUserLinkBattlesByCodeQueryVariables>(GameUserLinkBattlesByCodeDocument, variables, options);
}
export function useGameUserLinkBattlesByCodeLazyQuery(variables: GameUserLinkBattlesByCodeQueryVariables | VueCompositionApi.Ref<GameUserLinkBattlesByCodeQueryVariables> | ReactiveFunction<GameUserLinkBattlesByCodeQueryVariables>, options: VueApolloComposable.UseQueryOptions<GameUserLinkBattlesByCodeQuery, GameUserLinkBattlesByCodeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GameUserLinkBattlesByCodeQuery, GameUserLinkBattlesByCodeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GameUserLinkBattlesByCodeQuery, GameUserLinkBattlesByCodeQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GameUserLinkBattlesByCodeQuery, GameUserLinkBattlesByCodeQueryVariables>(GameUserLinkBattlesByCodeDocument, variables, options);
}
export type GameUserLinkBattlesByCodeQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GameUserLinkBattlesByCodeQuery, GameUserLinkBattlesByCodeQueryVariables>;