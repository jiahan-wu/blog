import { Node, NodeWalkingStep, Parser } from 'commonmark';
import * as fs from 'fs';
import { GetStaticProps, NextPage } from 'next';
import * as path from 'path';
import ReactMarkdown from 'react-markdown';
import styles from '../styles/Home.module.css';

interface Section {
  level: number
  text: string
}

interface HomeProps {
  sections: Section[]
  markdown: string
}

const Home: NextPage<HomeProps> = ({ sections, markdown }) => {
  const sectionRows = sections.map((section) => {
    return <li key={section.text}>{section.text}(Level: {section.level})</li>
  })
  return <>
    <header className={styles["header"]}>
      <div>Blog</div>
      <div>
        <ul>
          <li>Home</li>
          <li>About</li>
        </ul>
      </div>
    </header>
    <main className={styles["main"]}>
      <div className={styles["table-of-contents"]}>
        Table of Contents
        <ul>
          {sectionRows}
        </ul>
      </div>
      <div>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </main>
    <footer className={styles["footer"]}>© 2022 Jia-Han Wu</footer>
  </>
};

export const getStaticProps: GetStaticProps<HomeProps> =
  async () => {
    const readmeFilePath = path.join(process.cwd(), "README.md")

    const markdown = fs.readFileSync(readmeFilePath, { encoding: 'utf-8' })

    const sections: Section[] = []
    const parser = new Parser()
    const rootNode = parser.parse(markdown)
    const walker = rootNode.walker()
    let event: NodeWalkingStep | null = null
    let headingNode: Node | null = null
    while (event = walker.next()) {
      if (event.node.type === "heading" && headingNode !== null) {
        headingNode = null
      } else if (event.node.type === "text" && headingNode !== null) {
        const level = headingNode.level
        const text = event.node.literal ?? ""
        const section = {
          level,
          text
        }
        sections.push(section)
      } else if (event.node.type === "heading") {
        headingNode = event.node
      }
    }

    return {
      props: {
        sections,
        markdown,
      },
    };
  };

export default Home;