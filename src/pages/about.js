import React from "react"

import {
  AboutBody,
  BodySection,
  Container,
  Gap,
  Header,
  Layout,
  SEO,
} from "../components"
import { Image } from "../components/images/image-trista-big"
import { useSiteMetadata } from "../hooks"
import "../styles/animate.min.css"

const AboutPage = () => {
  const { menuLinks, title } = useSiteMetadata()

  return (
    <Layout center={true}>
      <Container>
        <Header menuLinks={menuLinks} siteTitle={title} />
        <SEO title="Trista" />
        <Gap gapSize={40} />
        <Image />
      </Container>
      <Gap gapSize={100} />
      <AboutBody isFullWidth>
        <BodySection isAlt>
          <h2>关于我</h2>
          <p>
            我是Trista，目前工作在中国成都的一名UI设计师，一个热爱美并努力发现美的积极乐观的人。
          </p>
          <p>
            我的工作远不止视觉，我热衷于把客户复杂多样的需求通过友好的用户体验将其简单化，视觉化。站在用户的角度来设计。
          </p>
          <p>
            我喜欢团队的力量，相信一个好的产品是一个好的团队共同创造出来的。曾有幸能与微软合作，更加深刻了解到一个好的产品所服务的群体远远超出自己的想象。
          </p>
        </BodySection>
        <BodySection>
          <h2>我想成为？</h2>
          <p>
            我希望自己在能成为一个优秀的设计师，将交互，用户体验融入我的每一个设计中。我会在设计这条路上始终保持饥渴。
          </p>
        </BodySection>
        <BodySection isAlt>
          <h2>什么让我成为一个好的设计？</h2>
          <p>
            设计对于我而言，除了赏心悦目的直观感受外更重要的是解决社会上大多数人共同面临的问题，源于生活而又融入生活。好的设计是会说话的，会让大多数人受用且信服。
          </p>
          <p>
            创意灵感决定一个设计的独特性，而细节决定了一个设计好与坏，我始终坚持着做好每一个细节，像素化的设计，合理的布局，色彩分析。
          </p>
        </BodySection>
        <BodySection>
          <h2>我热爱的事</h2>
          <p>
            旅行、摄影总能让我拥有一颗无限探索的心和对未知的渴望，我喜欢走进大自然，我感叹大自然的神奇魔力，大自然就是最好的艺术家。我也喜欢走街串巷，融入当地人的生活，我知道大多数人的喜怒哀乐就像设计的血液。我会坚持做喜欢的事并努力让其发挥作用，让好的产品服务于大家。探寻无止境。
          </p>
        </BodySection>
      </AboutBody>
    </Layout>
  )
}

export default AboutPage
