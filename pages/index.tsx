import { GetStaticProps, NextPage } from 'next';
import * as fs from 'fs';
import * as path from 'path';
import ReactMarkdown from 'react-markdown';

interface HomeProps {
  markdown: string;
}

const Home: NextPage<HomeProps> = ({ markdown }) => {
  return (
    <ReactMarkdown>#hello world ##S1 ##S2</ReactMarkdown>
  )
};

export const getStaticProps: GetStaticProps<HomeProps> =
  async () => {
    const readmeFilePath = path.join(process.cwd(), "README.md")
    const markdown = fs.readFileSync(readmeFilePath, { encoding: 'utf-8' })
    return {
      props: {
        markdown,
      },
    };
  };

export default Home;