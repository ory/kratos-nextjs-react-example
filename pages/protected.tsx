import { Configuration, Session, V0alpha2Api } from '@ory/kratos-client'
import { AxiosError } from 'axios'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

const kratos = new V0alpha2Api(
  new Configuration({
    // We use Ory Kratos' Public API
    basePath: '/api/.ory/api/kratos/public'
  })
)

const Protected: NextPage = () => {
  const [session, setSession] = useState<Session>()
  const [error, setError] = useState<any>()

  useEffect(() => {
    if (session || error) {
      return
    }

    kratos
      .toSession()
      .then(({ data: session }) => {
        setSession(session)
      })
      .catch((err: AxiosError) => {
        setError({
          error: err.toString(),
          data: err.response?.data
        })
      })
  }, [session, error])

  if (!error && !session) {
    return null
  }

  if (error) {
    return (
      <div>
        You are apparently not signed in!{' '}
        <a href={'/api/.ory/ui/login'}>Sign in</a> or{' '}
        <a href={'/api/.ory/ui/registration'}>Sign up</a> now!
        <pre>
          <code>{JSON.stringify(error, null, 2)}</code>
        </pre>
      </div>
    )
  }

  return (
    <div>
      You are signed in!
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
    </div>
  )
}

export default Protected
