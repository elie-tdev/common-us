import { useForm } from 'react-hook-form'
import { UserRange } from '../../query'


interface fetchDataType {
  fetchData: (params: UserRange) => void
}

export function UsersForm({fetchData}: fetchDataType) {
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<UserRange>()

  const onSubmit = (params: UserRange) => {
    fetchData(params)
    // reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex gap-3 sm:flex-row flex-col max-w-3xl mx-auto mb-8'>
        <div className='flex-1'>
          <input
            className='h-10 rounded border border-gray-200 w-full outline-none px-3'
            aria-label='fromId'
            placeholder='From User Id'
            {...register('fromId', {
              required: 'Please enter a Github User Id.',
            })}
          />
          {errors?.fromId && (
            <div className='text-xs	text-red-600'>
              {errors?.fromId?.message}
            </div>
          )}
        </div>
        <div className='flex-1'>
          <input
            className='h-10 rounded border border-gray-200 w-full outline-none px-3'
            aria-label='toId'
            placeholder='To User Id'
            {...register('toId', {
              required: 'Please enter a Github User Id.',
            })}
          />
          {errors?.toId && (
            <div className='text-xs	text-red-600'>
              {errors?.toId?.message}
            </div>
          )}
        </div>
        <div className='flex-3'>
          <input
            type='submit'
            className='cursor-pointer px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded w-full'
            aria-label='Get Users'
            value="Get Users"
          />
        </div>
      </div>
    </form>
  )
}

export default UsersForm
