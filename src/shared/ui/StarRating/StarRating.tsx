import React, { memo, useState } from 'react';
import { classnames } from '@/shared/lib/classnames/classnames';
import classes from './StarRating.module.scss';
import { Icon } from '@/shared/ui/Icon/Icon';
import StarIcon from '@/shared/assets/icons/star.svg';

export interface StarRatingProps {
  className?: string;
  onSelect?: (starsCount: number) => void;
  size?: number;
  selectedStars?: number
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
  const {
    className, onSelect, size = 30, selectedStars = 0,
  } = props;

  const [currentStarCount, setCurrentStarCount] = useState(selectedStars);
  const [isSelected, setSelected] = useState(!!selectedStars);

  const onHover = (starCount: number) => () => {
    if (!isSelected) {
      setCurrentStarCount(starCount);
    }
  };

  const onLeave = () => {
    if (!isSelected) {
      setCurrentStarCount(0);
    }
  };

  const onClick = (starsCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starsCount);
      setCurrentStarCount(starsCount);
      setSelected(true);
    }
  };

  return (
    <div className={classnames(classes.StarRating, {}, [className])}>
      {stars.map((star) => (
        <Icon
          className={
            classnames(
              classes.starIcon,
              { [classes.selected]: isSelected },
              [currentStarCount >= star ? classes.hovered : classes.normal],
            )
          }
          key={star}
          Svg={StarIcon}
          width={size}
          height={size}
          onMouseLeave={onLeave}
          onMouseEnter={onHover(star)}
          onClick={onClick(star)}
        />
      ))}
    </div>
  );
});
