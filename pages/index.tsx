import { NodeWalkingStep, Parser } from 'commonmark';
import * as fs from 'fs';
import { GetStaticProps, NextPage } from 'next';
import * as path from 'path';
import ReactMarkdown from 'react-markdown';
import styles from '../styles/Home.module.css';

interface HomeProps {
  markdown: string;
}

const Home: NextPage<HomeProps> = ({ markdown }) => {
  return <>
    <header className={styles["header"]}>
      <div>Blog</div>
      <div>
        <ul>
          <li>Item1</li>
          <li>Item2</li>
          <li>Item3</li>
        </ul>
      </div>
    </header>
    <main className={styles["main"]}>
      <div className={styles["table-of-contents"]}>
        Table of Contents
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

    // TODO: - Task 1
    const parser = new Parser()
    const rootNode = parser.parse(markdown)
    const walker = rootNode.walker()
    let event: NodeWalkingStep
    while (event = walker.next()) {
      console.log("---------------")
      console.log(event.node.type)
      console.log(event.node.literal)
      console.log("---------------")
    }

    return {
      props: {
        markdown,
      },
    };
  };

export default Home;