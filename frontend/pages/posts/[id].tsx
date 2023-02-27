import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'

import { server } from '@/config/server'

type Post = {
  id: string
  attributes: {
    title: string
    content: string
    publishedAt: string
  }
}

type Props = {
  post: Post
}

// * Post
export default function Post({ post }: Props) {
  return (
    <>
      <Head>
        <title>{post.attributes.title}</title>
      </Head>

      <div className='post'>
        <h1>{post.attributes.title}</h1>

        <p>{post.attributes.content}</p>

        {/* display and format publishedAt Date */}
        <span className='date'>
          {new Date(post.attributes.publishedAt).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </span>
      </div>
    </>
  )
}

// * Fetch Data
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${server}/posts`)
  const { data } = await res.json()

  const paths = data.map((post: Post) => ({
    params: { id: post.id.toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`${server}/posts/${params?.id}`)
  const { data } = await res.json()

  return {
    props: {
      post: data,
    },
  }
}
