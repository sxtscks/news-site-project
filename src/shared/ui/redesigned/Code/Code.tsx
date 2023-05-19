import React, { memo, useCallback } from 'react';
import { classnames } from '@/shared/lib/classnames/classnames';
import CopyIcon from '@/shared/assets/icons/copyNew.svg';
import { Button, ButtonTheme } from '../../deprecated/Button/Button';
import classes from './Code.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '../Icon';

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
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <pre className={classnames(classes.CodeRedesigned, {}, [className])}>
          <Icon
            clickable
            onClick={onCopy}
            className={classes.copyButton}
            Svg={CopyIcon}
          />
          <code>{content}</code>
        </pre>
      }
      off={
        <pre className={classnames(classes.Code, {}, [className])}>
          <Button
            onClick={onCopy}
            className={classes.copyButton}
            theme={ButtonTheme.CLEAR}
          >
            <CopyIcon className={classes.copyIcon} />
          </Button>
          <code>{content}</code>
        </pre>
      }
    />
  );
});
