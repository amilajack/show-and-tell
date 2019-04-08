import React, { Component } from 'react';
import { render } from 'react-dom';
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

class App extends Component {
  constructor() {
    super();
    // this.ENDPOINT = 'https://show-and-tell.now.sh';
    this.ENDPOINT = 'http://localhost';
    this.state = {
      articles: [],
      columns: [
        {
          label: 'Name'
        }
      ]
    };
  }

  componentDidMount() {
    this.fetchRandomArticle();
  }

  async fetchRandomArticle() {
    const {
      query: { pages: articles }
    } = await fetch(this.ENDPOINT).then(res => res.json());
    console.log(articles);
    this.setState({
      articles: Object.values(articles)
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
                        href={`https://en.wikipedia.org/?curid=${
                          article.pageid
                        }`}
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

render(<App />, document.getElementById('app'));
