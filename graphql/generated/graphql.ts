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
  firstPlayer: User;
  game: Game;
  id: Scalars['String'];
  rapTextFirstPlayer?: Maybe<Scalars['String']>;
  rapTextSecondPlayer?: Maybe<Scalars['String']>;
  roundIndex: Scalars['Int'];
  secondPlayer: User;
  winner?: Maybe<User>;
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
  winnerUserId?: InputMaybe<Scalars['String']>;
};

export type BattleCreatePayload = {
  __typename?: 'BattleCreatePayload';
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
  winnerUserId?: InputMaybe<Scalars['ID']>;
};

export type Game = {
  __typename?: 'Game';
  battles: Array<Battle>;
  gameCode: Scalars['String'];
  gameOwner: User;
  id: Scalars['String'];
  numberOfRounds: Scalars['Int'];
  roundIndex: Scalars['Int'];
  state: GameState;
  users: Array<User>;
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
  FinalScreen = 'FinalScreen',
  PlayingBattles = 'PlayingBattles',
  WaitingToJoin = 'WaitingToJoin'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** employee gets created instantly (and if eMail then invited) */
  battleCreate?: Maybe<BattleCreatePayload>;
  /** game gets created instantly (and if eMail then invited) */
  gameCreate?: Maybe<GameCreatePayload>;
  /** game gets created instantly (and if eMail then invited) */
  gameJoin?: Maybe<GameJoinPayload>;
  /** game gets created instantly (and if eMail then invited) */
  gameStart?: Maybe<GameStartPayload>;
  /** user gets created instantly (and if eMail then invited) */
  userCreate?: Maybe<UserCreatePayload>;
};


export type MutationBattleCreateArgs = {
  input: BattleCreateInput;
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
  input: UserCreateInput;
};

export type Query = {
  __typename?: 'Query';
  battle?: Maybe<Battle>;
  user?: Maybe<User>;
};


export type QueryBattleArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  battleCreated?: Maybe<Battle>;
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
  deviceId: Scalars['String'];
  name: Scalars['String'];
};

export type UserCreatePayload = {
  __typename?: 'UserCreatePayload';
  user: User;
};

export type UserUpdateInput = {
  avatar?: InputMaybe<Scalars['String']>;
  deviceId?: InputMaybe<Scalars['String']>;
  gameId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  score?: InputMaybe<Scalars['Int']>;
};

export type BattleCreateInput = {
  battle: BattleCreateInput;
};

export type GameCreateInput = {
  numberOfRounds?: InputMaybe<Scalars['Int']>;
  ownerUser: UserCreateInput;
};

export type GameJoinInput = {
  gameId: Scalars['ID'];
  user: UserCreateInput;
};

export type GameStartInput = {
  gameId: Scalars['ID'];
};

export type UserCreateInput = {
  user: UserCreateInput;
};

export type UserInfoFragment = { __typename?: 'User', id: string, name: string, owner: boolean, game: { __typename?: 'Game', id: string, gameCode: string } };

export type GameInfoFragment = { __typename?: 'Game', id: string, gameCode: string };

export type GameCreateMutationVariables = Exact<{
  input: GameCreateInput;
}>;


export type GameCreateMutation = { __typename?: 'Mutation', gameCreate?: { __typename?: 'GameCreatePayload', user: { __typename?: 'User', id: string, name: string, owner: boolean, game: { __typename?: 'Game', id: string, gameCode: string } } } | null };

export const GameInfoFragmentDoc = gql`
    fragment GameInfo on Game {
  id
  gameCode
}
    `;
export const UserInfoFragmentDoc = gql`
    fragment UserInfo on User {
  id
  name
  owner
  game {
    ...GameInfo
  }
}
    ${GameInfoFragmentDoc}`;
export const GameCreateDocument = gql`
    mutation gameCreate($input: gameCreateInput!) {
  gameCreate(input: $input) {
    user {
      ...UserInfo
    }
  }
}
    ${UserInfoFragmentDoc}`;

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