export interface Navigation {
  replace: Function;
  navigate: Function;
  setOptions: Function;
}

export interface Route {
  params: Object;
}

export interface Arguments {
  userList: Details[];
  page: number;
  isLoading: boolean;
  searchInput: string;
  url: string;
  isRefreshing: boolean;
  isFocused: boolean;
}

export interface Details {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string | null;
  hireable: string | null;
  bio: string | null;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
}
