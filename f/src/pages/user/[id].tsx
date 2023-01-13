import React from "react"
import { useRouter } from "next/router"

const Id = () => {
  const { query } = useRouter()
  return <div>{JSON.stringify(query)}</div>
}

export default Id
