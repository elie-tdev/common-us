import { Hero } from '../components/Hero'
import { Layout } from '../components/layout'
import { FollowersTable } from '../components/FollowersTable'
import { useUsersQuery } from '../query'
import DownloadJsonButton from '../components/DownloadJsonButton'
import UsersForm from '../components/UsersForm'

function FollowersScreen() {
  const [value, fetchUSUsers] = useUsersQuery()

  return (
    <Layout>
      <div className='flex flex-col gap-6'>
        <Hero title='Github United States Users' />
        <UsersForm fetchData={fetchUSUsers} />
        {value.data && <DownloadJsonButton data={value.data} />}
        <FollowersTable data={value} />
      </div>
    </Layout>
  )
}

export default FollowersScreen
