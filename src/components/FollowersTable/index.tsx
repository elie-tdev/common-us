import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { UsersState } from '../../query'
import { Button } from '../button'
import { Dropdown } from '../dropdown'

export function FollowersTable({ data }: { data: UsersState }) {
  const { loading, error, data: followers } = data
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)

  const totalCount = useMemo(
    () => (followers ? followers.length : 0),
    [followers],
  )

  const paginationText = useMemo(() => {
    const startIndex = page * rowsPerPage + 1
    return `Showing ${totalCount === 0 ? 0 : startIndex}-${
      startIndex + rowsPerPage - 1 < totalCount
        ? startIndex + rowsPerPage - 1
        : totalCount
    } of ${totalCount}`
  }, [page, rowsPerPage, totalCount])

  const items = useMemo(() => {
    if (totalCount <= page * rowsPerPage) {
      const lastShowItems = totalCount % rowsPerPage
      setPage(Math.floor(totalCount / rowsPerPage))
      return followers && followers.slice(-lastShowItems)
    }
    return (
      followers &&
      followers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    )
  }, [rowsPerPage, page, followers])

  const onChangeSize = useCallback((evt: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(+evt.target.value)
  }, [])

  const totalPage = useMemo(
    () => (totalCount ? Math.ceil(totalCount / rowsPerPage) - 1 : 0),
    [totalCount, rowsPerPage],
  )

  const isLastPage = useMemo(() => page === totalPage, [page, totalPage])
  const isFirstPage = useMemo(() => page === 0, [page])

  const onClickFirst = useCallback(() => {
    setPage(0)
  }, [])

  const onClickPrev = useCallback(() => {
    const prev = page - 1
    if (prev >= 0) {
      setPage(prev)
    }
  }, [page, rowsPerPage])

  const onClickNext = useCallback(() => {
    const next = page + 1
    if (next * rowsPerPage <= totalCount) {
      setPage(next)
    }
  }, [page, rowsPerPage, totalCount])

  const onClickLast = useCallback(() => {
    setPage(totalPage)
  }, [totalPage])

  if (loading) {
    return <p className='text-gray-800'>Fetching Unnited States Users...</p>
  }

  if (error) {
    return (
      <div className='text-gray-800'>
        <h2>Oops! looks like something went wrong!</h2>
        <h3>Please check the Github User Names again...</h3>
      </div>
    )
  }

  if (followers && followers.length < 1) {
    return <h2 className='text-gray-800'>No common followers available.</h2>
  }

  return (
    <div className='mt-2 w-full'>
      <table className='border-collapse w-full'>
        <thead>
          <tr className='border-b border-gray-300'>
            <th className='text-left py-2'>User ID</th>
            <th className='text-left py-2'>User Name</th>
            <th className='text-left py-2'>Email</th>
            <th className='text-left py-2'>Location</th>
            <th className='text-left py-2'>Avatar</th>
            <th className='text-right py-2'>Show</th>
          </tr>
        </thead>

        <tbody>
          {items ? (
            items.map(
              ({
                login: userName,
                email,
                location,
                avatar_url: avatarUrl,
                html_url: htmlUrl,
                id,
              }) => (
                <tr key={id} className='border-b border-gray-200'>
                  <td data-label='userId' className='text-left py-2'>
                    {id}
                  </td>
                  <td data-label='userName' className='text-left py-2'>
                    {userName}
                  </td>
                  <td data-label='email' className='text-left py-2'>
                    {email}
                  </td>
                  <td data-label='location' className='text-left py-2'>
                    {location}
                  </td>
                  <td data-label='avatar_url' className='text-left py-2'>
                    <img
                      src={avatarUrl}
                      alt={userName}
                      className='w-10 h-10 rounded-full'
                    />
                  </td>
                  <td data-label='avatar_url' className='text-right py-2'>
                    <a
                      href={htmlUrl}
                      rel='noreferrer'
                      target='_blank'
                      className='min-w-fit border border-gray-300 text-sm rounded py-1 px-2'
                    >
                      Show
                    </a>
                  </td>
                </tr>
              ),
            )
          ) : (
            <tr className='border-b border-gray-200'>
              <td>
                <p className='text-left py-8 text-gray-800'>No Data</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className='flex justify-between mt-2 sm:flex-row sm:items-center items-end flex-col'>
        <span className='text-xs'>{paginationText}</span>
        <div className='flex gap-2 text-sm text-gray-800'>
          <Button onClick={onClickFirst} disabled={isFirstPage}>
            First
          </Button>
          <Button onClick={onClickPrev} disabled={isFirstPage}>
            Previous
          </Button>
          <Dropdown
            onChange={onChangeSize}
            value={rowsPerPage}
            options={[5, 10, 15, 20]}
          />
          <Button onClick={onClickNext} disabled={isLastPage} id='next'>
            Next
          </Button>
          <Button onClick={onClickLast} disabled={isLastPage} id='last'>
            Last
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FollowersTable
