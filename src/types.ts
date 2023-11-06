export interface FollowerEntity {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string // https://api.github.com/users/nwjsmith,
  html_url: string // "https://github.com/nwjsmith",
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}
