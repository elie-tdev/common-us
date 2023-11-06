import { useMemo, useState } from 'react'
import { AxiosError } from 'axios'
import { useAxios } from '../context'

import { isLocationInUSA } from '../utils'

export interface UserType {
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
  company: string | null;
  blog: string;
  location: string;
  email: string | null;
  hireable: boolean | null;
  bio: string;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface UserRange {
  fromId: number
  toId: number
}

export interface UsersState {
  loading: boolean
  data?: UserType[] | undefined
  error?: AxiosError
}

type UsersQueryHookReturnValues = [UsersState, (params: UserRange) => void]

export const useUsersQuery = (): UsersQueryHookReturnValues => {
  const axios = useAxios()
  const [state, setState] = useState<UsersState>({ loading: false })

  const getUsers = async (params: UserRange) => {
    let since = params.fromId
    let users: UserType[] = []
    do {
      try {
        const { data } = await axios.get<UserType[]>(
          `/users?per_page=100&since=${since + 1}`,
        )
        users = [...users, ...data]
        since = data[99].id
      } catch (error) {
        // Handle other errors if needed
        console.log('Error fetching user:', error)
      }
    } while (since < params.toId)

    return users
  }

  const fetchUSUsers = async (params: UserRange) => {
    setState({ ...state, loading: true })
    const users: UserType[] = await getUsers(params)
    const allUSUsers: UserType[] = []
    let i = 0
    do {
      try {
        const { data: userData } = await axios.get<UserType>(
          `/users/${users[i].login}`,
        )
        if (userData && userData.email && isLocationInUSA(userData.location)) {
          allUSUsers.push(userData)
        }
      } catch (error) {
        // Handle other errors if needed
        console.log('Error fetching user:', error)
      }
      i++
    } while (users.length > i)
    setState({ data: allUSUsers, loading: false, error: undefined })
  }

  const value = useMemo(() => state, [state])

  return [value, fetchUSUsers]
}
