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

export type CreateQuestionnaireInput = {
  timestamp: Scalars['DateTime'];
  question1: Scalars['String'];
  question2?: Maybe<Scalars['String']>;
  question3?: Maybe<Scalars['Boolean']>;
  question4?: Maybe<Scalars['String']>;
  question5?: Maybe<Scalars['String']>;
  question6?: Maybe<Scalars['Boolean']>;
  result: Scalars['Boolean'];
  userId?: Maybe<Scalars['Float']>;
};


export type Exception = {
  __typename?: 'Exception';
  id: Scalars['Int'];
  timestamp: Scalars['DateTime'];
  cause: Scalars['String'];
  data_length: Scalars['Float'];
  anomaly_length: Scalars['Float'];
  chart: Scalars['String'];
  threshold: Scalars['Float'];
  readStatus?: Maybe<Scalars['Boolean']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createQuestionnaire: QuestionnaireResponse;
  createSymptom: SymptomResponse;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  sendValidationEmail: Scalars['Boolean'];
  validateEmail: UserResponse;
  readException: Scalars['Boolean'];
  changePasswordSync: UserResponse;
  changeEmailSync: UserResponse;
};


export type MutationCreateQuestionnaireArgs = {
  input: CreateQuestionnaireInput;
};


export type MutationCreateSymptomArgs = {
  input: SymptomInput;
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


export type MutationReadExceptionArgs = {
  id: Scalars['Int'];
};


export type MutationChangePasswordSyncArgs = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationChangeEmailSyncArgs = {
  email: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getQuestionnaireDataByUser: QuestionnaireResponse;
  getSymptomDataByUser: SymptomResponse;
  getAllSymptomDataByUser: SymptomResponse;
  me?: Maybe<User>;
  getUserThreshold: Threshold;
  getExceptions: Array<Exception>;
};


export type QueryGetQuestionnaireDataByUserArgs = {
  userId?: Maybe<Scalars['Float']>;
};


export type QueryGetSymptomDataByUserArgs = {
  symptom: Scalars['String'];
  userId?: Maybe<Scalars['Int']>;
};


export type QueryGetAllSymptomDataByUserArgs = {
  userId?: Maybe<Scalars['Int']>;
};


export type QueryGetUserThresholdArgs = {
  userId?: Maybe<Scalars['Float']>;
};


export type QueryGetExceptionsArgs = {
  userId?: Maybe<Scalars['Float']>;
};

export type Questionnaire = {
  __typename?: 'Questionnaire';
  id: Scalars['Float'];
  timestamp: Scalars['String'];
  question1: Scalars['String'];
  question2?: Maybe<Scalars['String']>;
  question3?: Maybe<Scalars['Boolean']>;
  question4?: Maybe<Scalars['String']>;
  question5?: Maybe<Scalars['String']>;
  question6?: Maybe<Scalars['Boolean']>;
  result: Scalars['Boolean'];
};

export type QuestionnaireResponse = {
  __typename?: 'QuestionnaireResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
  questionnaires?: Maybe<Array<Questionnaire>>;
};

export type RegisterInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  birthday: Scalars['DateTime'];
  isSmoker: Scalars['Boolean'];
  hasCoughSickness: Scalars['Boolean'];
};

export type Symptom = {
  __typename?: 'Symptom';
  id: Scalars['Int'];
  timestamp: Scalars['String'];
  temperature?: Maybe<Scalars['Float']>;
  heartRate?: Maybe<Scalars['Int']>;
  bloodOxygen?: Maybe<Scalars['Float']>;
  cough?: Maybe<Scalars['Boolean']>;
};

export type SymptomData = {
  __typename?: 'SymptomData';
  id: Scalars['Float'];
  timestamp: Scalars['DateTime'];
  value: Scalars['Float'];
};

export type SymptomInput = {
  timestamp?: Maybe<Scalars['DateTime']>;
  temperature?: Maybe<Scalars['Float']>;
  heartRate?: Maybe<Scalars['Float']>;
  bloodOxygen?: Maybe<Scalars['Float']>;
  cough?: Maybe<Scalars['Boolean']>;
  userId: Scalars['Float'];
};

export type SymptomResponse = {
  __typename?: 'SymptomResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
  symptoms?: Maybe<Array<Symptom>>;
  data?: Maybe<Array<SymptomData>>;
  symptom?: Maybe<Scalars['String']>;
};

export type Threshold = {
  __typename?: 'Threshold';
  id: Scalars['Int'];
  temperature: Scalars['Float'];
  heartRateMin: Scalars['Int'];
  heartRateMax: Scalars['Int'];
  bloodOxygen: Scalars['Float'];
  cough: Scalars['Int'];
  calculateCoughTresholdStarted: Scalars['Boolean'];
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
  lastQuestionnaireTime: Scalars['String'];
  questionnaireNeeded: Scalars['Boolean'];
  threshold: Threshold;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type ErrorFragmentFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'questionnaireNeeded' | 'lastQuestionnaireTime'>
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

export type CreateQuestionnaireMutationVariables = Exact<{
  input: CreateQuestionnaireInput;
}>;


export type CreateQuestionnaireMutation = (
  { __typename?: 'Mutation' }
  & { createQuestionnaire: (
    { __typename?: 'QuestionnaireResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & UserFragmentFragment
    )> }
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

export type ReadExceptionMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ReadExceptionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'readException'>
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
      & Pick<Symptom, 'id' | 'timestamp' | 'temperature' | 'heartRate' | 'bloodOxygen'>
    )>> }
  ) }
);

export type GetExceptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetExceptionsQuery = (
  { __typename?: 'Query' }
  & { getExceptions: Array<(
    { __typename?: 'Exception' }
    & Pick<Exception, 'id' | 'timestamp' | 'cause' | 'data_length' | 'anomaly_length' | 'chart' | 'threshold' | 'readStatus'>
  )> }
);

export type GetQuestionnaireDataByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetQuestionnaireDataByUserQuery = (
  { __typename?: 'Query' }
  & { getQuestionnaireDataByUser: (
    { __typename?: 'QuestionnaireResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>>, questionnaires?: Maybe<Array<(
      { __typename?: 'Questionnaire' }
      & Pick<Questionnaire, 'id' | 'timestamp' | 'question1' | 'question2' | 'question3' | 'question4' | 'question5' | 'question6' | 'result'>
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

export type GetUserThresholdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserThresholdQuery = (
  { __typename?: 'Query' }
  & { getUserThreshold: (
    { __typename?: 'Threshold' }
    & Pick<Threshold, 'id' | 'temperature' | 'bloodOxygen' | 'cough' | 'heartRateMin' | 'heartRateMax' | 'calculateCoughTresholdStarted'>
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
  questionnaireNeeded
  lastQuestionnaireTime
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
export const CreateQuestionnaireDocument = gql`
    mutation CreateQuestionnaire($input: CreateQuestionnaireInput!) {
  createQuestionnaire(input: $input) {
    errors {
      ...ErrorFragment
    }
    user {
      ...UserFragment
    }
  }
}
    ${ErrorFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;

export function useCreateQuestionnaireMutation() {
  return Urql.useMutation<CreateQuestionnaireMutation, CreateQuestionnaireMutationVariables>(CreateQuestionnaireDocument);
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
export const ReadExceptionDocument = gql`
    mutation ReadException($id: Int!) {
  readException(id: $id)
}
    `;

export function useReadExceptionMutation() {
  return Urql.useMutation<ReadExceptionMutation, ReadExceptionMutationVariables>(ReadExceptionDocument);
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
    }
  }
}
    ${ErrorFragmentFragmentDoc}`;

export function useGetAllSymptomDataByUserQuery(options: Omit<Urql.UseQueryArgs<GetAllSymptomDataByUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllSymptomDataByUserQuery>({ query: GetAllSymptomDataByUserDocument, ...options });
};
export const GetExceptionsDocument = gql`
    query GetExceptions {
  getExceptions {
    id
    timestamp
    cause
    data_length
    anomaly_length
    chart
    threshold
    readStatus
  }
}
    `;

export function useGetExceptionsQuery(options: Omit<Urql.UseQueryArgs<GetExceptionsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetExceptionsQuery>({ query: GetExceptionsDocument, ...options });
};
export const GetQuestionnaireDataByUserDocument = gql`
    query GetQuestionnaireDataByUser {
  getQuestionnaireDataByUser {
    errors {
      ...ErrorFragment
    }
    questionnaires {
      id
      timestamp
      question1
      question2
      question3
      question4
      question5
      question6
      result
    }
  }
}
    ${ErrorFragmentFragmentDoc}`;

export function useGetQuestionnaireDataByUserQuery(options: Omit<Urql.UseQueryArgs<GetQuestionnaireDataByUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetQuestionnaireDataByUserQuery>({ query: GetQuestionnaireDataByUserDocument, ...options });
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
export const GetUserThresholdDocument = gql`
    query GetUserThreshold {
  getUserThreshold {
    id
    temperature
    bloodOxygen
    cough
    heartRateMin
    heartRateMax
    calculateCoughTresholdStarted
  }
}
    `;

export function useGetUserThresholdQuery(options: Omit<Urql.UseQueryArgs<GetUserThresholdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserThresholdQuery>({ query: GetUserThresholdDocument, ...options });
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