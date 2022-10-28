import dynamic from 'next/dynamic'
import React from 'react'

type NoSSRProps = {
    children: React.ReactNode
}

const NoSsr = (props: NoSSRProps) => (
  <React.Fragment>{props.children}</React.Fragment>
)

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false
})