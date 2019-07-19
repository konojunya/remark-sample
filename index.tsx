import * as React from "react";
import { render } from "react-dom";
import remark from "remark";
import recommended from "remark-preset-lint-recommended";
import html from "remark-html";

const Viewer: React.FC<{ markup: string }> = ({ markup }) => (
  <div dangerouslySetInnerHTML={{ __html: markup }} />
);

const Editor: React.FC<{ onChange: (...args: any[]) => Promise<void> }> = ({
  onChange
}) => {
  return <textarea rows="10" cols="50" onChange={onChange} autoFocus />;
};

interface State {
  markup: string;
}

class App extends React.Component<{}, State> {
  public state: State = {
    markup: ""
  };

  public render() {
    return (
      <>
        <Editor onChange={this.onChange} />
        <Viewer markup={this.state.markup} />
      </>
    );
  }

  private onChange = async e => {
    const markdown = e.target.value;
    const { contents } = await remark()
      .use(recommended)
      .use(html)
      .process(markdown);
    (this as any).setState({
      markup: contents
    });
  };
}

// # asdfa
// [link1](/)
// [link2](https://google.com)
// |a|b|
// |:--|:--|
// |a|b|

render(<App />, document.getElementById("app"));
