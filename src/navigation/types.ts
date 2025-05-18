export type RootStackParamList = {
  HomeStack: undefined;
  Login: undefined;
  Onboarding: undefined;
  HomeTab: undefined;
  DashboardTab: undefined;
  ContactsTab: undefined;
  ProfileTab: undefined;
  EditProfile: undefined;
  Rewards: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}