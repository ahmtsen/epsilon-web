import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  getSymptomDataByUser: SymptomResponse;
  getAllSymptomDataByUser: SymptomResponse;
  getQuestionnaireDataByUser: QuestionnaireResponse;
};


export type QueryGetSymptomDataByUserArgs = {
  symptom: Scalars['String'];
  userId?: Maybe<Scalars['Int']>;
};


export type QueryGetAllSymptomDataByUserArgs = {
  userId?: Maybe<Scalars['Int']>;
};


export type QueryGetQuestionnaireDataByUserArgs = {
  userId: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  birthday: Scalars['String'];
  age: Scalars['Int'];
  isSmoker: Scalars['Boolean'];
  hasCoughSickness: Scalars['Boolean'];
  threshold: Threshold;
};

export type Threshold = {
  __typename?: 'Threshold';
  id: Scalars['Int'];
  temperature: Scalars['Float'];
  heartRateMin: Scalars['Int'];
  heartRateMax: Scalars['Int'];
  bloodOxygen: Scalars['Float'];
  respirationRateMin: Scalars['Int'];
  respirationRateMax: Scalars['Int'];
  cough: Scalars['Int'];
  calculateCoughTresholdStarted: Scalars['Boolean'];
};

export type SymptomResponse = {
  __typename?: 'SymptomResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
  symptoms?: Maybe<Array<Symptom>>;
  data?: Maybe<Array<SymptomData>>;
  symptom?: Maybe<Scalars['String']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Symptom = {
  __typename?: 'Symptom';
  id: Scalars['Int'];
  timestamp: Scalars['String'];
  temperature?: Maybe<Scalars['Float']>;
  heartRate?: Maybe<Scalars['Int']>;
  bloodOxygen?: Maybe<Scalars['Float']>;
  respirationRate?: Maybe<Scalars['Int']>;
  cough?: Maybe<Scalars['Boolean']>;
};

export type SymptomData = {
  __typename?: 'SymptomData';
  id: Scalars['Float'];
  timestamp: Scalars['DateTime'];
  value: Scalars['Float'];
};


export type QuestionnaireResponse = {
  __typename?: 'QuestionnaireResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
  questionnaires?: Maybe<Array<Questionnaire>>;
};

export type Questionnaire = {
  __typename?: 'Questionnaire';
  id: Scalars['Float'];
  timestamp: Scalars['String'];
  question1: Scalars['Boolean'];
  question2?: Maybe<Scalars['Float']>;
  question3?: Maybe<Scalars['Boolean']>;
  question4?: Maybe<Scalars['Boolean']>;
  question5?: Maybe<Scalars['String']>;
  question6?: Maybe<Scalars['Boolean']>;
  result: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  sendValidationEmail: Scalars['Boolean'];
  validateEmail: UserResponse;
  createSymptom: SymptomResponse;
  createQuestionnaire: QuestionnaireResponse;
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationSendValidationEmailArgs = {
  usernameOrEmail: Scalars['String'];
};


export type MutationValidateEmailArgs = {
  token: Scalars['String'];
};


export type MutationCreateSymptomArgs = {
  input: SymptomInput;
};


export type MutationCreateQuestionnaireArgs = {
  input: CreateQuestionnaireInput;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegisterInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  birthday: Scalars['DateTime'];
  isSmoker: Scalars['Boolean'];
  hasCoughSickness: Scalars['Boolean'];
};

export type SymptomInput = {
  timestamp: Scalars['DateTime'];
  temperature?: Maybe<Scalars['Float']>;
  heartRate?: Maybe<Scalars['Float']>;
  bloodOxygen?: Maybe<Scalars['Float']>;
  respirationRate?: Maybe<Scalars['Float']>;
  cough?: Maybe<Scalars['Boolean']>;
  userId: Scalars['Float'];
};

export type CreateQuestionnaireInput = {
  timestamp: Scalars['DateTime'];
  question1: Scalars['Boolean'];
  question2?: Maybe<Scalars['Float']>;
  question3?: Maybe<Scalars['Boolean']>;
  question4?: Maybe<Scalars['Boolean']>;
  question5?: Maybe<Scalars['String']>;
  question6?: Maybe<Scalars['Boolean']>;
  result: Scalars['Boolean'];
  userId?: Maybe<Scalars['Float']>;
};

export type ErrorFragmentFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type UserResponseFragmentFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & ErrorFragmentFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & UserResponseFragmentFragment
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & UserResponseFragmentFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & UserResponseFragmentFragment
  ) }
);

export type SendValidationEmailMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
}>;


export type SendValidationEmailMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendValidationEmail'>
);

export type ValidateEmailMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ValidateEmailMutation = (
  { __typename?: 'Mutation' }
  & { validateEmail: (
    { __typename?: 'UserResponse' }
    & UserResponseFragmentFragment
  ) }
);

export type GetAllSymptomDataByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSymptomDataByUserQuery = (
  { __typename?: 'Query' }
  & { getAllSymptomDataByUser: (
    { __typename?: 'SymptomResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>>, symptoms?: Maybe<Array<(
      { __typename?: 'Symptom' }
      & Pick<Symptom, 'id' | 'timestamp' | 'temperature' | 'heartRate' | 'bloodOxygen' | 'respirationRate'>
    )>> }
  ) }
);

export type GetSymptomDataByUserQueryVariables = Exact<{
  symptom: Scalars['String'];
}>;


export type GetSymptomDataByUserQuery = (
  { __typename?: 'Query' }
  & { getSymptomDataByUser: (
    { __typename?: 'SymptomResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>>, data?: Maybe<Array<(
      { __typename?: 'SymptomData' }
      & Pick<SymptomData, 'id' | 'timestamp' | 'value'>
    )>> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )> }
);

export const ErrorFragmentFragmentDoc = gql`
    fragment ErrorFragment on FieldError {
  field
  message
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  username
}
    `;
export const UserResponseFragmentFragmentDoc = gql`
    fragment UserResponseFragment on UserResponse {
  errors {
    ...ErrorFragment
  }
  user {
    ...UserFragment
  }
}
    ${ErrorFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...UserResponseFragment
  }
}
    ${UserResponseFragmentFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...UserResponseFragment
  }
}
    ${UserResponseFragmentFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: RegisterInput!) {
  register(options: $options) {
    ...UserResponseFragment
  }
}
    ${UserResponseFragmentFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const SendValidationEmailDocument = gql`
    mutation SendValidationEmail($usernameOrEmail: String!) {
  sendValidationEmail(usernameOrEmail: $usernameOrEmail)
}
    `;

export function useSendValidationEmailMutation() {
  return Urql.useMutation<SendValidationEmailMutation, SendValidationEmailMutationVariables>(SendValidationEmailDocument);
};
export const ValidateEmailDocument = gql`
    mutation ValidateEmail($token: String!) {
  validateEmail(token: $token) {
    ...UserResponseFragment
  }
}
    ${UserResponseFragmentFragmentDoc}`;

export function useValidateEmailMutation() {
  return Urql.useMutation<ValidateEmailMutation, ValidateEmailMutationVariables>(ValidateEmailDocument);
};
export const GetAllSymptomDataByUserDocument = gql`
    query GetAllSymptomDataByUser {
  getAllSymptomDataByUser {
    errors {
      ...ErrorFragment
    }
    symptoms {
      id
      timestamp
      temperature
      heartRate
      bloodOxygen
      respirationRate
    }
  }
}
    ${ErrorFragmentFragmentDoc}`;

export function useGetAllSymptomDataByUserQuery(options: Omit<Urql.UseQueryArgs<GetAllSymptomDataByUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllSymptomDataByUserQuery>({ query: GetAllSymptomDataByUserDocument, ...options });
};
export const GetSymptomDataByUserDocument = gql`
    query GetSymptomDataByUser($symptom: String!) {
  getSymptomDataByUser(symptom: $symptom) {
    errors {
      ...ErrorFragment
    }
    data {
      id
      timestamp
      value
    }
  }
}
    ${ErrorFragmentFragmentDoc}`;

export function useGetSymptomDataByUserQuery(options: Omit<Urql.UseQueryArgs<GetSymptomDataByUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetSymptomDataByUserQuery>({ query: GetSymptomDataByUserDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};