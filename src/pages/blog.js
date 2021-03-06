import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import Head from "../components/head"
import blogStyles from "./blog.module.scss"

// const data = useStaticQuery(graphql`
//   query {
//     allMarkdownRemark {
//       edges {
//         node {
//           frontmatter {
//             title
//             date
//           }
//           fields {
//             slug
//           }
//         }
//       }
//     }
//   }
// `)

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(sort: { fields: publishedDate, order: DESC }) {
        edges {
          node {
            title
            slug
            publishedDate(formatString: "MMMM Do, YYYY")
          }
        }
      }
    }
  `)

  const renderPosts = () => {
    return data.allContentfulBlogPost.edges.map((edge, index) => {
      return (
        <li key={index} className={blogStyles.post}>
          <Link to={`/blog/${edge.node.slug}`}>
            <h2>{edge.node.title}</h2>
            <p>{edge.node.publishedDate}</p>
          </Link>
        </li>
      )
    })
  }

  return (
    <Layout>
      <Head title="Blog" />
      <h1>Blog</h1>
      <ol className={blogStyles.posts}>{renderPosts()}</ol>
    </Layout>
  )
}

export default BlogPage
