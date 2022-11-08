import React from 'react';
import './index.sass';

interface IProps {
  emoji: string,
  size?: 'small' | 'medium' | 'big'
}
interface IState { }

export default class EmojiIcon extends React.Component<IProps, IState> {
  render() {
    const { size, emoji } = this.props;
    const classes: string[] = ["emoji-icon", (size ? size : "")];

    return <span role='img' aria-label='emoji' className={classes.join(' ')}>
      {emoji}
    </span>

  }
}