import { Authenticator } from '@aws-amplify/ui-react'
import { Button } from 'antd'
import {Helmet} from 'react-helmet'
import React from 'react'

function Login() {
    return (
        <Authenticator
        // variation='modal'
        >
            {({ signOut, user }) => (
                <main>
                    <Helmet>
                        <title>Authenticate</title>
                    </Helmet>
                    <h1 className='text-lg'>Hello <span className='text-red-400'> {user.username}</span></h1>
                    <Button danger onClick={signOut}>Sign out</Button>
                </main>
            )
            }
        </Authenticator>
    )
}

export default Login