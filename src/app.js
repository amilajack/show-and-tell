import React, { Component } from 'react';
import {
  Box,
  Button,
  Grommet,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
  Anchor,
  grommet
} from 'grommet';

export default class App extends Component {
  constructor() {
    super();
    this.ENDPOINT =
      process.env.NODE_ENV === 'production'
        ? 'https://show-and-tell.amilajack.now.sh'
        : 'http://localhost';
    this.state = {
      articles: [],
      columns: [
        {
          label: 'Article'
        }
      ]
    };
  }

  componentDidMount() {
    this.fetchRandomArticle();
  }

  async fetchRandomArticle() {
    const articles = await fetch(this.ENDPOINT).then(res => res.json());
    this.setState({
      articles
    });
  }

  render() {
    const { columns, articles } = this.state;
    return (
      <Grommet theme={grommet}>
        <Box align="center" pad="large">
          <Button
            margin={{ vertical: 'large' }}
            primary
            label="Get Random Articles"
            onClick={() => this.fetchRandomArticle()}
          />
          <Table pad="large">
            <TableHeader>
              <TableRow>
                {columns.map(c => (
                  <TableCell key={c.property} scope="col" align={c.align}>
                    <Text>{c.label}</Text>
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map(article => (
                <TableRow key={article.title}>
                  {columns.map(() => (
                    <TableCell>
                      <Anchor
                        href={`https://en.wikipedia.org/?curid=${article.pageid}`}
                      >
                        {article.title}
                      </Anchor>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Grommet>
    );
  }
}
