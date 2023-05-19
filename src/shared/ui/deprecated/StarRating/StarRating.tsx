import React, { memo, useState } from 'react';
import { classnames } from '@/shared/lib/classnames/classnames';
import classes from './StarRating.module.scss';
import { Icon as IconDeprecated } from '../Icon/Icon';
import StarIcon from '@/shared/assets/icons/star.svg';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '../../redesigned/Icon';

export interface StarRatingProps {
  className?: string;
  onSelect?: (starsCount: number) => void;
  size?: number;
  selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

/**
 * Устарел, используем новые компоненты из папки redesign
 * @deprecated
 */
export const StarRating = memo((props: StarRatingProps) => {
  const { className, onSelect, size = 30, selectedStars = 0 } = props;

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
    <div
      className={classnames(
        toggleFeatures({
          name: 'isAppRedesigned',
          on: () => classes.StarRatingRedesigned,
          off: () => classes.StarRating,
        }),
        {},
        [className]
      )}
    >
      {stars.map((star) => {
        const commonProps = {
          className: classnames(
            classes.starIcon,
            { [classes.selected]: isSelected },
            [currentStarCount >= star ? classes.hovered : classes.normal]
          ),
          key: star,
          Svg: StarIcon,
          width: size,
          height: size,
          onMouseLeave: onLeave,
          onMouseEnter: onHover(star),
          onClick: onClick(star),
        };
        return (
          <ToggleFeatures
            feature="isAppRedesigned"
            on={<Icon clickable={!isSelected} {...commonProps} />}
            off={<IconDeprecated {...commonProps} />}
          />
        );
      })}
    </div>
  );
});
