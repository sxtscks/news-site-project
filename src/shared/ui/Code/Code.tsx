import React, { memo, ReactNode, useCallback } from 'react';
import { classnames } from 'shared/lib/classnames/classnames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import CopyIcon from 'shared/assets/icons/copy.svg';
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
