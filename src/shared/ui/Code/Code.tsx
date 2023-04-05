import React, { memo, useCallback } from 'react';
import { classnames } from 'shared/lib/classnames/classnames';
import CopyIcon from 'shared/assets/icons/copy.svg';
import { Button, ButtonTheme } from '../Button/Button';
import classes from './Code.module.scss';

export interface CodeProps {
  className?: string;
  content: string;
}

export const Code = memo((props: CodeProps) => {
  const { className, content } = props;

  const onCopy = useCallback(async () => {
    await navigator.clipboard.writeText(content);
  }, [content]);

  return (
    <pre className={classnames(classes.Code, {}, [className])}>
      <Button
        onClick={onCopy}
        className={classes.copyButton}
        theme={ButtonTheme.CLEAR}
      >
        <CopyIcon className={classes.copyIcon} />
      </Button>
      <code>
        {content}
      </code>
    </pre>
  );
});
