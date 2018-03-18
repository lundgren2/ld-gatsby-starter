import React from 'react'
import Link from 'gatsby-link'
import { injectGlobal } from 'emotion'
import styled, { css } from 'react-emotion'

import Card from '../components/Card'
import bg from '../images/bg.jpg'
// import Slider from '../components/Slider'
injectGlobal`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

const Wrapper = styled.section`
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
`

const Title = styled.h1`
  font-size: 3em;
  text-align: center;
  word-wrap: break-word;
  color: #000;
  margin-bottom: 0.5em;
  padding: 0.5em 1em;
  & a {
    color: #8be9fd;
  }
  @media (min-width: 768px) {
    font-size: 4em;
  }
`

const CardWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  /* grid-template-rows: auto-fit; */
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 0.25em;
  }
`

const BlogPost = ({ post }) => {
  return (
    <article css={`margin: 1.5em auto; padding: 1em;`}>
      <h1>{post.title}</h1>
      <p>{post.createdAt}</p>
      <div css={`
        p:first-of-type:first-letter {
          color: rgb(48, 4, 125);
          float: left;
          font-family: 'Playfair Display', serif;
          text-transform: uppercase;
          font-size: 75px;
          line-height: 60px;
          padding-top: 4px;
          padding-right: 8px;
          padding-left: 3px;
        }
        `}
      dangerouslySetInnerHTML={{
        __html: post.body.childMarkdownRemark.html
      }}
      />
    </article>
  )
}

const BlogPosts = ({posts}) => (
  <section>
    {posts.map(edge => <BlogPost key={edge.node.id} post={edge.node} />)}
  </section>
)

const IndexPage = ({data}) => {
  const posts = data.allContentfulPost.edges
  return (
    <Wrapper>
      <Title>Lundgren Design</Title>
      <BlogPosts posts={posts} />

      <CardWrapper>
        <Card text="Test" img="https://source.unsplash.com/random/800x600" />
        <Card text="Test" img="https://source.unsplash.com/random/800x601" />
        <Card text="Test" img="https://source.unsplash.com/random/800x602" />
      </CardWrapper>

      <img src={bg} alt="large-img" />
    </Wrapper>
  )
}

export default IndexPage

export const query = graphql`
  query SiteMeta {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPost {
      edges {
        node {
          title
          body {
            childMarkdownRemark {
              html
              excerpt
            }
          }
          createdAt(formatString: "DD MMMM, YYYY")
          slug
          id
        }
      }
    }
  }
`
