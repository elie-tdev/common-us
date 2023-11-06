/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '../button'
import { UserType } from '../../query'

export function DownloadJsonButton({ data }: { data: UserType[] }) {
  const removeUnnecessaryFields = (
    dataArray: UserType[],
  ): Omit<
    UserType,
    | 'followers_url'
    | 'updated_at'
    | 'node_id'
    | 'avatar_url'
    | 'url'
    | 'following_url'
    | 'gists_url'
    | 'starred_url'
    | 'subscriptions_url'
    | 'organizations_url'
    | 'repos_url'
    | 'events_url'
    | 'received_events_url'
    | 'type'
    | 'site_admin'
    | 'twitter_username'
    | 'public_gists'
    | 'gravatar_id'
  >[] => {
    return dataArray.map(
      ({
        url,
        node_id,
        avatar_url,
        followers_url,
        following_url,
        gists_url,
        updated_at,
        starred_url,
        subscriptions_url,
        organizations_url,
        repos_url,
        events_url,
        received_events_url,
        type,
        site_admin,
        twitter_username,
        public_gists,
        gravatar_id,
        ...rest
      }) => rest,
    )
  }
  const downloadJsonFile = () => {
    const modifiedData = removeUnnecessaryFields(data)
    const jsonData = JSON.stringify(modifiedData, null, 2) // Convert the array object to a JSON string with 2-space indentation

    const blob = new Blob([jsonData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const downloadLink = document.createElement('a')
    downloadLink.href = url
    const currentDate = new Date()

    // Get the individual date, month, and year values
    const day = currentDate.getDate()
    const month = currentDate.getMonth() + 1 // Months are zero-based, so add 1
    const year = currentDate.getFullYear()

    // Format the date as "M-D-YYYY"
    const formattedDate = `${month}-${day}-${year}`
    downloadLink.download = `unitedstates-users-${formattedDate}`
    document.body.appendChild(downloadLink)

    downloadLink.click()

    // Clean up resources
    URL.revokeObjectURL(url)
    document.body.removeChild(downloadLink)
  }

  const downloadCsvFile = () => {
    const modifiedData = removeUnnecessaryFields(data)

    // Define the column names manually, including first name and last name
    const columnNames = [
      'id',
      'login',
      'name',
      'first_name',
      'last_name',
      'email',
      'bio',
      'location',
      'company',
      'blog',
      'html_url',
      'hireable',
      'public_repos',
      'followers',
      'following',
      'created_at',
    ]

    // Convert the data to CSV format with proper escaping
    const csvContent =
      `${columnNames.join(',')}\n` + // Adding column names as the first row
      modifiedData
        .map((row) => {
          const nameParts = row.name ? row.name.split(' ') : ['', '']
          const firstName = nameParts[0]
          const lastName = nameParts[1] || ''

          return columnNames
            .map((key) => {
              const value =
                key === 'first_name'
                  ? firstName
                  : key === 'last_name'
                  ? lastName
                  : row[key as keyof typeof row]

              if (typeof value === 'string') {
                // Escape double quotes by doubling them
                return `"${value.replace(/"/g, '""')}"`
              }

              return value
            })
            .join(',')
        })
        .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    const downloadLink = document.createElement('a')
    downloadLink.href = url
    const currentDate = new Date()

    // Get the individual date, month, and year values
    const day = currentDate.getDate()
    const month = currentDate.getMonth() + 1 // Months are zero-based, so add 1
    const year = currentDate.getFullYear()

    // Format the date as "M-D-YYYY"
    const formattedDate = `${month}-${day}-${year}`
    downloadLink.download = `unitedstates-users-${formattedDate}.csv`
    document.body.appendChild(downloadLink)

    downloadLink.click()

    // Clean up resources
    URL.revokeObjectURL(url)
    document.body.removeChild(downloadLink)
  }

  return (
    <div className='flex justify-end gap-x-2'>
      <Button onClick={downloadCsvFile}>downloadCsvFile</Button>
      <Button onClick={downloadJsonFile}>downloadJsonFile</Button>
    </div>
  )
}

export default DownloadJsonButton
