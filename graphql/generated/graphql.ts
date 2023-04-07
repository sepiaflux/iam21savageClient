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

export type Battle = {
  __typename?: 'Battle';
  attribute1FirstPlayer?: Maybe<Scalars['String']>;
  attribute1SecondPlayer?: Maybe<Scalars['String']>;
  attribute2FirstPlayer?: Maybe<Scalars['String']>;
  attribute2SecondPlayer?: Maybe<Scalars['String']>;
  attribute3FirstPlayer?: Maybe<Scalars['String']>;
  attribute3SecondPlayer?: Maybe<Scalars['String']>;
  /** we use a service for this so this is the link to that service */
  audioURLFirstPlayer?: Maybe<Scalars['String']>;
  /** we use a service for this so this is the link to that service */
  audioURLSecondPlayer?: Maybe<Scalars['String']>;
  firstPlayer: User;
  game: Game;
  id: Scalars['String'];
  rapTextFirstPlayer?: Maybe<Scalars['String']>;
  rapTextSecondPlayer?: Maybe<Scalars['String']>;
  roundIndex: Scalars['Int'];
  secondPlayer: User;
  votesFirstPlayer: Scalars['Int'];
  votesSecondPlayer: Scalars['Int'];
};

export type BattleCreateInput = {
  attribute1FirstPlayer?: InputMaybe<Scalars['String']>;
  attribute1SecondPlayer?: InputMaybe<Scalars['String']>;
  attribute2FirstPlayer?: InputMaybe<Scalars['String']>;
  attribute2SecondPlayer?: InputMaybe<Scalars['String']>;
  attribute3FirstPlayer?: InputMaybe<Scalars['String']>;
  attribute3SecondPlayer?: InputMaybe<Scalars['String']>;
  firstPlayerId: Scalars['ID'];
  gameId: Scalars['ID'];
  rapTextFirstPlayer?: InputMaybe<Scalars['String']>;
  rapTextSecondPlayer?: InputMaybe<Scalars['String']>;
  roundIndex: Scalars['Int'];
  secondPlayerId: Scalars['ID'];
};

export type BattleSubmitPayload = {
  __typename?: 'BattleSubmitPayload';
  battle: Battle;
};

export type BattleUpdateInput = {
  attribute1FirstPlayer?: InputMaybe<Scalars['String']>;
  attribute1SecondPlayer?: InputMaybe<Scalars['String']>;
  attribute2FirstPlayer?: InputMaybe<Scalars['String']>;
  attribute2SecondPlayer?: InputMaybe<Scalars['String']>;
  attribute3FirstPlayer?: InputMaybe<Scalars['String']>;
  attribute3SecondPlayer?: InputMaybe<Scalars['String']>;
  battle?: InputMaybe<Scalars['Int']>;
  firstPlayerId?: InputMaybe<Scalars['ID']>;
  gameId?: InputMaybe<Scalars['ID']>;
  rapTextFirstPlayer?: InputMaybe<Scalars['String']>;
  rapTextSecondPlayer?: InputMaybe<Scalars['String']>;
  secondPlayerId?: InputMaybe<Scalars['ID']>;
  votesFirstPlayer?: InputMaybe<Scalars['Int']>;
};

export type BattleVotePayload = {
  __typename?: 'BattleVotePayload';
  battle: Battle;
};

export type ConnectToCloudFuncPayload = {
  __typename?: 'ConnectToCloudFuncPayload';
  message?: Maybe<Scalars['String']>;
};

export type Game = {
  __typename?: 'Game';
  battles: Array<Battle>;
  gameCode: Scalars['String'];
  id: Scalars['String'];
  numberOfRounds: Scalars['Int'];
  roundIndex: Scalars['Int'];
  state: GameState;
  users: Array<User>;
};

export type GameCreateInput = {
  numberOfRounds?: InputMaybe<Scalars['Int']>;
  ownerUser: UserCreateInput;
};

export type GameCreatePayload = {
  __typename?: 'GameCreatePayload';
  user: User;
};

export type GameJoinPayload = {
  __typename?: 'GameJoinPayload';
  user: User;
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

export type Mutation = {
  __typename?: 'Mutation';
  /** employee gets created instantly (and if eMail then invited) */
  battleSubmit?: Maybe<BattleSubmitPayload>;
  /** employee gets created instantly (and if eMail then invited) */
  battleVote?: Maybe<BattleVotePayload>;
  /** game gets created instantly (and if eMail then invited) */
  connectToCloudFunc?: Maybe<ConnectToCloudFuncPayload>;
  /** game gets created instantly (and if eMail then invited) */
  gameCreate?: Maybe<GameCreatePayload>;
  /** game gets created instantly (and if eMail then invited) */
  gameJoin?: Maybe<GameJoinPayload>;
  /** game gets created instantly (and if eMail then invited) */
  gameStart?: Maybe<GameStartPayload>;
};


export type MutationBattleSubmitArgs = {
  input: BattleSubmitInput;
};


export type MutationBattleVoteArgs = {
  input: BattleVoteInput;
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

export type Query = {
  __typename?: 'Query';
  battle?: Maybe<Battle>;
  battleViewer?: Maybe<Battle>;
  battles: Array<Battle>;
  /** if no game ID is given, the game is returned, if he has one! */
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
  gameId: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  deviceId: Scalars['String'];
  game: Game;
  id: Scalars['String'];
  name: Scalars['String'];
  owner: Scalars['Boolean'];
  score: Scalars['Int'];
};

/** User already exists and gets invited */
export type UserCreateInput = {
  avatar?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type UserUpdateInput = {
  avatar?: InputMaybe<Scalars['String']>;
  deviceId?: InputMaybe<Scalars['String']>;
  gameId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  score?: InputMaybe<Scalars['Int']>;
};

export type BattleSubmitInput = {
  attribute1: Scalars['String'];
  attribute2: Scalars['String'];
  attribute3: Scalars['String'];
  battleId: Scalars['ID'];
  deviceId: Scalars['String'];
};

export type BattleVoteInput = {
  battleId: Scalars['ID'];
  voteeId: Scalars['ID'];
  voterId: Scalars['ID'];
};

export type GameJoinInput = {
  gameCode: Scalars['ID'];
  user: UserCreateInput;
};

export type GameStartInput = {
  gameId: Scalars['ID'];
};

export type UserInfoFragment = { __typename?: 'User', id: string, name: string, owner: boolean, score: number, avatar?: string | null, deviceId: string };

export type UserGameInfoFragment = { __typename?: 'User', id: string, name: string, owner: boolean, score: number, avatar?: string | null, deviceId: string, game: { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState } };

export type GameInfoFragment = { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState };

export type GameUsersInfoFragment = { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState, users: Array<{ __typename?: 'User', id: string, name: string, owner: boolean, score: number, avatar?: string | null, deviceId: string }> };

export type BattleInfoFragment = { __typename?: 'Battle', id: string, attribute1FirstPlayer?: string | null, attribute1SecondPlayer?: string | null, attribute2FirstPlayer?: string | null, attribute2SecondPlayer?: string | null, attribute3FirstPlayer?: string | null, attribute3SecondPlayer?: string | null, audioURLFirstPlayer?: string | null, audioURLSecondPlayer?: string | null, rapTextFirstPlayer?: string | null, rapTextSecondPlayer?: string | null, roundIndex: number, votesFirstPlayer: number, votesSecondPlayer: number, firstPlayer: { __typename?: 'User', id: string, name: string, owner: boolean, score: number, avatar?: string | null, deviceId: string }, secondPlayer: { __typename?: 'User', id: string, name: string, owner: boolean, score: number, avatar?: string | null, deviceId: string }, game: { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState } };

export type GameBattlesInfoFragment = { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState, battles: Array<{ __typename?: 'Battle', id: string, attribute1FirstPlayer?: string | null, attribute1SecondPlayer?: string | null, attribute2FirstPlayer?: string | null, attribute2SecondPlayer?: string | null, attribute3FirstPlayer?: string | null, attribute3SecondPlayer?: string | null, audioURLFirstPlayer?: string | null, audioURLSecondPlayer?: string | null, rapTextFirstPlayer?: string | null, rapTextSecondPlayer?: string | null, roundIndex: number, votesFirstPlayer: number, votesSecondPlayer: number, firstPlayer: { __typename?: 'User', id: string, name: string, owner: boolean, score: number, avatar?: string | null, deviceId: string }, secondPlayer: { __typename?: 'User', id: string, name: string, owner: boolean, score: number, avatar?: string | null, deviceId: string }, game: { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState } }> };

export type BattleSubmitMutationVariables = Exact<{
  input: BattleSubmitInput;
}>;


export type BattleSubmitMutation = { __typename?: 'Mutation', battleSubmit?: { __typename?: 'BattleSubmitPayload', battle: { __typename?: 'Battle', id: string, attribute1FirstPlayer?: string | null, attribute1SecondPlayer?: string | null, attribute2FirstPlayer?: string | null, attribute2SecondPlayer?: string | null, attribute3FirstPlayer?: string | null, attribute3SecondPlayer?: string | null, audioURLFirstPlayer?: string | null, audioURLSecondPlayer?: string | null, rapTextFirstPlayer?: string | null, rapTextSecondPlayer?: string | null, roundIndex: number, votesFirstPlayer: number, votesSecondPlayer: number, firstPlayer: { __typename?: 'User', id: string, name: string, owner: boolean, score: number, avatar?: string | null, deviceId: string }, secondPlayer: { __typename?: 'User', id: string, name: string, owner: boolean, score: number, avatar?: string | null, deviceId: string }, game: { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState } } } | null };

export type BattleVoteMutationVariables = Exact<{
  input: BattleVoteInput;
}>;


export type BattleVoteMutation = { __typename?: 'Mutation', battleVote?: { __typename?: 'BattleVotePayload', battle: { __typename?: 'Battle', id: string, attribute1FirstPlayer?: string | null, attribute1SecondPlayer?: string | null, attribute2FirstPlayer?: string | null, attribute2SecondPlayer?: string | null, attribute3FirstPlayer?: string | null, attribute3SecondPlayer?: string | null, audioURLFirstPlayer?: string | null, audioURLSecondPlayer?: string | null, rapTextFirstPlayer?: string | null, rapTextSecondPlayer?: string | null, roundIndex: number, votesFirstPlayer: number, votesSecondPlayer: number, firstPlayer: { __typename?: 'User', id: string, name: string, owner: boolean, score: number, avatar?: string | null, deviceId: string }, secondPlayer: { __typename?: 'User', id: string, name: string, owner: boolean, score: number, avatar?: string | null, deviceId: string }, game: { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState } } } | null };

export type GameCreateMutationVariables = Exact<{
  input: GameCreateInput;
}>;


export type GameCreateMutation = { __typename?: 'Mutation', gameCreate?: { __typename?: 'GameCreatePayload', user: { __typename?: 'User', id: string, name: string, owner: boolean, score: number, avatar?: string | null, deviceId: string, game: { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState } } } | null };

export type GameJoinMutationVariables = Exact<{
  input: GameJoinInput;
}>;


export type GameJoinMutation = { __typename?: 'Mutation', gameJoin?: { __typename?: 'GameJoinPayload', user: { __typename?: 'User', id: string, name: string, owner: boolean, score: number, avatar?: string | null, deviceId: string, game: { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState } } } | null };

export type GameStartMutationVariables = Exact<{
  input: GameStartInput;
}>;


export type GameStartMutation = { __typename?: 'Mutation', gameStart?: { __typename?: 'GameStartPayload', game: { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState }, battles: Array<{ __typename?: 'Battle', id: string, attribute1FirstPlayer?: string | null, attribute1SecondPlayer?: string | null, attribute2FirstPlayer?: string | null, attribute2SecondPlayer?: string | null, attribute3FirstPlayer?: string | null, attribute3SecondPlayer?: string | null, audioURLFirstPlayer?: string | null, audioURLSecondPlayer?: string | null, rapTextFirstPlayer?: string | null, rapTextSecondPlayer?: string | null, roundIndex: number, votesFirstPlayer: number, votesSecondPlayer: number, firstPlayer: { __typename?: 'User', id: string, name: string, owner: boolean, score: number, avatar?: string | null, deviceId: string }, secondPlayer: { __typename?: 'User', id: string, name: string, owner: boolean, score: number, avatar?: string | null, deviceId: string }, game: { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState } }> } | null };

export type GetGameQueryVariables = Exact<{
  gameId: Scalars['ID'];
}>;


export type GetGameQuery = { __typename?: 'Query', game?: { __typename?: 'Game', numberOfRounds: number, roundIndex: number, state: GameState, id: string, gameCode: string, users: Array<{ __typename?: 'User', id: string, name: string, owner: boolean, score: number, avatar?: string | null, deviceId: string }> } | null };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name: string, owner: boolean, score: number, avatar?: string | null, deviceId: string } | null };

export type GetBattleQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetBattleQuery = { __typename?: 'Query', battle?: { __typename?: 'Battle', id: string, attribute1FirstPlayer?: string | null, attribute1SecondPlayer?: string | null, attribute2FirstPlayer?: string | null, attribute2SecondPlayer?: string | null, attribute3FirstPlayer?: string | null, attribute3SecondPlayer?: string | null, audioURLFirstPlayer?: string | null, audioURLSecondPlayer?: string | null, rapTextFirstPlayer?: string | null, rapTextSecondPlayer?: string | null, roundIndex: number, votesFirstPlayer: number, votesSecondPlayer: number, firstPlayer: { __typename?: 'User', id: string, name: string, owner: boolean, score: number, avatar?: string | null, deviceId: string }, secondPlayer: { __typename?: 'User', id: string, name: string, owner: boolean, score: number, avatar?: string | null, deviceId: string }, game: { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState } } | null };

export type GetBattlesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBattlesQuery = { __typename?: 'Query', battles: Array<{ __typename?: 'Battle', id: string, attribute1FirstPlayer?: string | null, attribute1SecondPlayer?: string | null, attribute2FirstPlayer?: string | null, attribute2SecondPlayer?: string | null, attribute3FirstPlayer?: string | null, attribute3SecondPlayer?: string | null, audioURLFirstPlayer?: string | null, audioURLSecondPlayer?: string | null, rapTextFirstPlayer?: string | null, rapTextSecondPlayer?: string | null, roundIndex: number, votesFirstPlayer: number, votesSecondPlayer: number, firstPlayer: { __typename?: 'User', id: string, name: string, owner: boolean, score: number, avatar?: string | null, deviceId: string }, secondPlayer: { __typename?: 'User', id: string, name: string, owner: boolean, score: number, avatar?: string | null, deviceId: string }, game: { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState } }> };

export type GetBattleViewerQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetBattleViewerQuery = { __typename?: 'Query', battleViewer?: { __typename?: 'Battle', id: string, attribute1FirstPlayer?: string | null, attribute1SecondPlayer?: string | null, attribute2FirstPlayer?: string | null, attribute2SecondPlayer?: string | null, attribute3FirstPlayer?: string | null, attribute3SecondPlayer?: string | null, audioURLFirstPlayer?: string | null, audioURLSecondPlayer?: string | null, rapTextFirstPlayer?: string | null, rapTextSecondPlayer?: string | null, roundIndex: number, votesFirstPlayer: number, votesSecondPlayer: number, firstPlayer: { __typename?: 'User', id: string, name: string, owner: boolean, score: number, avatar?: string | null, deviceId: string }, secondPlayer: { __typename?: 'User', id: string, name: string, owner: boolean, score: number, avatar?: string | null, deviceId: string }, game: { __typename?: 'Game', id: string, gameCode: string, numberOfRounds: number, roundIndex: number, state: GameState } } | null };

export type GetViewerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetViewerQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', id: string, name: string, owner: boolean, score: number, avatar?: string | null, deviceId: string } | null };

export const UserInfoFragmentDoc = gql`
    fragment UserInfo on User {
  id
  name
  owner
  score
  avatar
  deviceId
}
    `;
export const GameInfoFragmentDoc = gql`
    fragment GameInfo on Game {
  id
  gameCode
  numberOfRounds
  roundIndex
  state
}
    `;
export const UserGameInfoFragmentDoc = gql`
    fragment UserGameInfo on User {
  ...UserInfo
  game {
    ...GameInfo
  }
}
    ${UserInfoFragmentDoc}
${GameInfoFragmentDoc}`;
export const GameUsersInfoFragmentDoc = gql`
    fragment GameUsersInfo on Game {
  ...GameInfo
  users {
    ...UserInfo
  }
}
    ${GameInfoFragmentDoc}
${UserInfoFragmentDoc}`;
export const BattleInfoFragmentDoc = gql`
    fragment BattleInfo on Battle {
  id
  attribute1FirstPlayer
  attribute1SecondPlayer
  attribute2FirstPlayer
  attribute2SecondPlayer
  attribute3FirstPlayer
  attribute3SecondPlayer
  audioURLFirstPlayer
  audioURLSecondPlayer
  firstPlayer {
    ...UserInfo
  }
  secondPlayer {
    ...UserInfo
  }
  game {
    ...GameInfo
  }
  rapTextFirstPlayer
  rapTextSecondPlayer
  roundIndex
  votesFirstPlayer
  votesSecondPlayer
}
    ${UserInfoFragmentDoc}
${GameInfoFragmentDoc}`;
export const GameBattlesInfoFragmentDoc = gql`
    fragment GameBattlesInfo on Game {
  ...GameInfo
  battles {
    ...BattleInfo
  }
}
    ${GameInfoFragmentDoc}
${BattleInfoFragmentDoc}`;
export const BattleSubmitDocument = gql`
    mutation BattleSubmit($input: battleSubmitInput!) {
  battleSubmit(input: $input) {
    battle {
      ...BattleInfo
    }
  }
}
    ${BattleInfoFragmentDoc}`;

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
export const BattleVoteDocument = gql`
    mutation BattleVote($input: battleVoteInput!) {
  battleVote(input: $input) {
    battle {
      ...BattleInfo
    }
  }
}
    ${BattleInfoFragmentDoc}`;

/**
 * __useBattleVoteMutation__
 *
 * To run a mutation, you first call `useBattleVoteMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useBattleVoteMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useBattleVoteMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useBattleVoteMutation(options: VueApolloComposable.UseMutationOptions<BattleVoteMutation, BattleVoteMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<BattleVoteMutation, BattleVoteMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<BattleVoteMutation, BattleVoteMutationVariables>(BattleVoteDocument, options);
}
export type BattleVoteMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<BattleVoteMutation, BattleVoteMutationVariables>;
export const GameCreateDocument = gql`
    mutation GameCreate($input: GameCreateInput!) {
  gameCreate(input: $input) {
    user {
      ...UserGameInfo
    }
  }
}
    ${UserGameInfoFragmentDoc}`;

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
    mutation GameJoin($input: gameJoinInput!) {
  gameJoin(input: $input) {
    user {
      ...UserGameInfo
    }
  }
}
    ${UserGameInfoFragmentDoc}`;

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
    mutation GameStart($input: gameStartInput!) {
  gameStart(input: $input) {
    game {
      ...GameInfo
    }
    battles {
      ...BattleInfo
    }
  }
}
    ${GameInfoFragmentDoc}
${BattleInfoFragmentDoc}`;

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
export const GetGameDocument = gql`
    query GetGame($gameId: ID!) {
  game(gameId: $gameId) {
    ...GameInfo
    numberOfRounds
    roundIndex
    state
    users {
      ...UserInfo
    }
  }
}
    ${GameInfoFragmentDoc}
${UserInfoFragmentDoc}`;

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
 *   gameId: // value for 'gameId'
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
    ...UserInfo
  }
}
    ${UserInfoFragmentDoc}`;

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
    ...BattleInfo
  }
}
    ${BattleInfoFragmentDoc}`;

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
    ...BattleInfo
  }
}
    ${BattleInfoFragmentDoc}`;

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
    ...BattleInfo
  }
}
    ${BattleInfoFragmentDoc}`;

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
    ...UserInfo
  }
}
    ${UserInfoFragmentDoc}`;

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